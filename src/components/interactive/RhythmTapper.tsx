// =============================================================================
// RhythmTapper — for what-is-rhythm article.
// A visual metronome + tap recorder. User taps spacebar/clicks to record a
// rhythm over an 8-beat grid (2 bars of 4/4), sees their taps visualized,
// and can play them back. Includes BPM control and preset patterns.
// =============================================================================
import { useState, useEffect, useRef, useCallback } from 'react';
import type { Lang } from '../../i18n/utils';
import { ui } from '../../i18n/ui';
import { useReducedMotion } from './useReducedMotion';
import { playClick } from './audio.utils';
import { PRESETS } from './rhythmTapper.data';

const GRID_SIZE = 8; // 2 bars of 4/4

export default function RhythmTapper({ lang }: { lang: Lang }) {
  const t = (k: keyof (typeof ui)['en']) => ui[lang][k] ?? ui.en[k];
  const prefersReducedMotion = useReducedMotion();

  const [bpm, setBpm] = useState(100);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [taps, setTaps] = useState<boolean[]>(Array(GRID_SIZE).fill(false));
  const [currentBeat, setCurrentBeat] = useState(-1);

  const intervalRef = useRef<number | null>(null);
  const beatCountRef = useRef(0);

  // Calculate interval in ms from BPM
  const beatInterval = (60 / bpm) * 1000;

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Metronome tick handler
  const tick = useCallback(() => {
    const beat = beatCountRef.current % GRID_SIZE;
    setCurrentBeat(beat);

    // Play click sound (accent on beat 0 and 4)
    const isAccent = beat % 4 === 0;
    playClick(isAccent);

    beatCountRef.current++;

    // Stop recording after one full cycle (8 beats)
    if (isRecording && beatCountRef.current >= GRID_SIZE) {
      stopRecording();
    }

    // Stop playback after one full cycle
    if (isPlaying && beatCountRef.current >= GRID_SIZE) {
      stopPlayback();
    }
  }, [isRecording, isPlaying]);

  // Start recording
  const startRecording = () => {
    if (isPlaying) return;
    setTaps(Array(GRID_SIZE).fill(false));
    setCurrentBeat(-1);
    beatCountRef.current = 0;
    setIsRecording(true);

    // Start metronome
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(tick, beatInterval);
  };

  // Stop recording
  const stopRecording = () => {
    setIsRecording(false);
    setCurrentBeat(-1);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Start playback
  const startPlayback = () => {
    if (isRecording) return;
    setCurrentBeat(-1);
    beatCountRef.current = 0;
    setIsPlaying(true);

    // Start metronome
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      const beat = beatCountRef.current % GRID_SIZE;
      setCurrentBeat(beat);

      // Play click for metronome
      const isAccent = beat % 4 === 0;
      playClick(isAccent);

      // Play user's tap if present
      if (taps[beat]) {
        setTimeout(() => playClick(true), 10); // Slightly offset for distinction
      }

      beatCountRef.current++;

      // Stop after one full cycle
      if (beatCountRef.current >= GRID_SIZE) {
        stopPlayback();
      }
    }, beatInterval);
  };

  // Stop playback
  const stopPlayback = () => {
    setIsPlaying(false);
    setCurrentBeat(-1);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Handle tap input
  const handleTap = () => {
    if (!isRecording) return;
    if (currentBeat === -1) return;

    // Record tap at current beat
    setTaps(prev => {
      const next = [...prev];
      next[currentBeat] = true;
      return next;
    });
  };

  // Clear all taps
  const clearTaps = () => {
    setTaps(Array(GRID_SIZE).fill(false));
  };

  // Load preset pattern
  const loadPreset = (pattern: boolean[]) => {
    if (isRecording || isPlaying) return;
    setTaps(pattern);
  };

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default for space to avoid page scroll
      if (e.code === 'Space') {
        e.preventDefault();
        if (isRecording) {
          handleTap();
        } else if (!isPlaying) {
          startRecording();
        }
      } else if (e.code === 'KeyR' && !isPlaying && !isRecording) {
        startRecording();
      } else if (e.code === 'KeyP' && !isRecording && !isPlaying) {
        startPlayback();
      } else if (e.code === 'KeyC' && !isRecording && !isPlaying) {
        clearTaps();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRecording, isPlaying, currentBeat]);

  return (
    <div className="rt-root">
      <div className="rt-metronome">
        <div
          className={`rt-pulse ${currentBeat >= 0 ? 'rt-pulse-active' : ''}`}
          style={{
            opacity: prefersReducedMotion
              ? (currentBeat >= 0 ? 1 : 0.3)
              : undefined,
          }}
          aria-live="polite"
          aria-label={currentBeat >= 0 ? `${t('rhythmTapper.beat')} ${currentBeat + 1}` : ''}
        />
        <div className="rt-bpm">
          <label htmlFor="rt-bpm-slider">
            {t('rhythmTapper.tempo')}: <strong>{bpm}</strong>
          </label>
          <input
            id="rt-bpm-slider"
            type="range"
            min="60"
            max="180"
            step="1"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            disabled={isRecording || isPlaying}
            aria-label={t('rhythmTapper.tempo')}
          />
        </div>
      </div>

      <div
        className="rt-tap-area"
        onClick={handleTap}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault();
            handleTap();
          }
        }}
        aria-label={t('rhythmTapper.tapHere')}
      >
        <span className="rt-tap-label">{t('rhythmTapper.tapHere')}</span>
      </div>

      <div className="rt-grid" role="region" aria-label={t('rhythmTapper.title')}>
        {taps.map((hasTap, i) => (
          <div
            key={i}
            className={`rt-beat ${currentBeat === i ? 'rt-beat-current' : ''} ${i % 4 === 0 ? 'rt-beat-accent' : ''}`}
          >
            <div className="rt-beat-number">{i + 1}</div>
            <div className={`rt-tap-marker ${hasTap ? 'rt-tap-marker-filled' : ''}`} />
          </div>
        ))}
      </div>

      <div className="rt-controls">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isPlaying}
          aria-label={t('rhythmTapper.record')}
          className={isRecording ? 'rt-btn-active' : ''}
        >
          {isRecording ? t('rhythmTapper.stop') : t('rhythmTapper.record')}
        </button>
        <button
          onClick={isPlaying ? stopPlayback : startPlayback}
          disabled={isRecording}
          aria-label={t('rhythmTapper.playback')}
          className={isPlaying ? 'rt-btn-active' : ''}
        >
          {isPlaying ? t('rhythmTapper.stop') : t('rhythmTapper.playback')}
        </button>
        <button
          onClick={clearTaps}
          disabled={isRecording || isPlaying}
          aria-label={t('rhythmTapper.clear')}
        >
          {t('rhythmTapper.clear')}
        </button>
      </div>

      <div className="rt-presets">
        <div className="rt-presets-label">{t('rhythmTapper.presets')}</div>
        <div className="rt-presets-buttons">
          {PRESETS.map(preset => (
            <button
              key={preset.id}
              onClick={() => loadPreset(preset.pattern)}
              disabled={isRecording || isPlaying}
              aria-label={preset.label[lang]}
            >
              {preset.label[lang]}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .rt-root {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 1.5rem;
          border-radius: var(--radius);
          background: var(--bg-elev);
          border: 1px solid var(--line);
        }

        .rt-metronome {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .rt-pulse {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.3;
          transition: ${prefersReducedMotion ? 'none' : 'opacity 0.1s ease-out, transform 0.1s ease-out'};
        }

        .rt-pulse-active {
          opacity: 1 !important;
          ${prefersReducedMotion ? '' : 'transform: scale(1.1);'}
        }

        .rt-bpm {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          max-width: 300px;
        }

        .rt-bpm label {
          font-size: 0.9rem;
          color: var(--muted);
        }

        .rt-bpm strong {
          color: var(--text);
          font-weight: 600;
        }

        .rt-bpm input[type="range"] {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: var(--line);
          outline: none;
          -webkit-appearance: none;
        }

        .rt-bpm input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--accent);
          cursor: pointer;
          border: 2px solid var(--bg);
        }

        .rt-bpm input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--accent);
          cursor: pointer;
          border: 2px solid var(--bg);
        }

        .rt-bpm input[type="range"]:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .rt-tap-area {
          min-height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px dashed var(--accent);
          border-radius: var(--radius);
          background: var(--accent-soft);
          cursor: pointer;
          transition: background 0.2s;
          user-select: none;
        }

        .rt-tap-area:hover {
          background: var(--accent);
        }

        .rt-tap-area:active {
          transform: scale(0.98);
        }

        .rt-tap-label {
          font-size: 0.9rem;
          color: var(--text);
          font-weight: 500;
        }

        .rt-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 0.5rem;
        }

        @media (max-width: 500px) {
          .rt-grid {
            gap: 0.25rem;
          }
        }

        .rt-beat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 0.5rem;
          border-radius: var(--radius-sm);
          background: var(--bg);
          border: 1px solid var(--line);
          transition: ${prefersReducedMotion ? 'none' : 'background 0.1s, border-color 0.1s'};
        }

        .rt-beat-accent {
          border-color: var(--accent);
        }

        .rt-beat-current {
          background: var(--accent-soft);
          border-color: var(--accent);
        }

        .rt-beat-number {
          font-size: 0.75rem;
          color: var(--muted);
          font-weight: 500;
        }

        .rt-tap-marker {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid var(--line);
          background: transparent;
          transition: ${prefersReducedMotion ? 'none' : 'all 0.2s'};
        }

        .rt-tap-marker-filled {
          background: var(--accent);
          border-color: var(--accent);
          transform: scale(1.2);
        }

        .rt-controls {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .rt-controls button {
          padding: 0.75rem 1.5rem;
          border: 2px solid var(--accent);
          background: var(--bg);
          color: var(--text);
          border-radius: var(--radius-sm);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .rt-controls button:hover:not(:disabled) {
          background: var(--accent);
          color: var(--on-accent);
        }

        .rt-controls button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .rt-btn-active {
          background: var(--accent) !important;
          color: var(--on-accent) !important;
        }

        .rt-presets {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .rt-presets-label {
          font-size: 0.9rem;
          color: var(--muted);
          font-weight: 500;
        }

        .rt-presets-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .rt-presets-buttons button {
          padding: 0.5rem 1rem;
          border: 1px solid var(--line);
          background: var(--bg);
          color: var(--text);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .rt-presets-buttons button:hover:not(:disabled) {
          background: var(--accent-soft);
          border-color: var(--accent);
        }

        .rt-presets-buttons button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        @media (max-width: 375px) {
          .rt-root {
            padding: 1rem;
            gap: 1rem;
          }

          .rt-pulse {
            width: 60px;
            height: 60px;
          }

          .rt-tap-area {
            min-height: 60px;
          }

          .rt-controls {
            flex-direction: column;
          }

          .rt-controls button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
