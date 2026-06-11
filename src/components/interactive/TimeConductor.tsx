// =============================================================================
// TimeConductor — visual metronome for different time signatures.
// Article: time-signatures (rhythm topic, order 7)
//
// User picks a time signature (2/4, 3/4, 4/4, 6/8), adjusts BPM, plays/stops.
// Shows beat circles with accents (strong/medium/weak), plays clicks, counts beats.
// =============================================================================
import { useState, useEffect, useRef } from 'react';
import type { Lang } from '../../i18n/utils';
import { ui } from '../../i18n/ui';
import { useReducedMotion } from './useReducedMotion';
import { playClick } from './audio.utils';
import { TIME_SIGNATURES, type TimeSignature } from './timeConductor.data';

export default function TimeConductor({ lang }: { lang: Lang }) {
  const t = (k: keyof (typeof ui)['en']) => ui[lang][k] ?? ui.en[k];
  const reducedMotion = useReducedMotion();

  const [signature, setSignature] = useState<TimeSignature>(TIME_SIGNATURES[0]);
  const [bpm, setBpm] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);

  const intervalRef = useRef<number | null>(null);

  // Metronome engine
  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Calculate interval per beat in ms
    const intervalMs = 60000 / bpm;

    // Play the first beat immediately when starting
    playClick(signature.accents[0] === 'strong' || signature.accents[0] === 'medium');
    setCurrentBeat(0);

    let beatIndex = 0;

    intervalRef.current = window.setInterval(() => {
      beatIndex = (beatIndex + 1) % signature.beats;
      setCurrentBeat(beatIndex);

      const accent = signature.accents[beatIndex];
      const isAccented = accent === 'strong' || accent === 'medium';
      playClick(isAccented);
    }, intervalMs);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, bpm, signature]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Avoid triggering when typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case '1':
          setSignature(TIME_SIGNATURES[0]);
          setIsPlaying(false);
          setCurrentBeat(0);
          break;
        case '2':
          setSignature(TIME_SIGNATURES[1]);
          setIsPlaying(false);
          setCurrentBeat(0);
          break;
        case '3':
          setSignature(TIME_SIGNATURES[2]);
          setIsPlaying(false);
          setCurrentBeat(0);
          break;
        case '4':
          setSignature(TIME_SIGNATURES[3]);
          setIsPlaying(false);
          setCurrentBeat(0);
          break;
        case ' ':
          e.preventDefault();
          setIsPlaying((p) => !p);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setBpm((b) => Math.min(180, b + 5));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setBpm((b) => Math.max(60, b - 5));
          break;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleSignatureChange = (sig: TimeSignature) => {
    setSignature(sig);
    setIsPlaying(false);
    setCurrentBeat(0);
  };

  const togglePlay = () => {
    setIsPlaying((p) => !p);
  };

  return (
    <div className="tc-root">
      <h3 className="tc-title">{t('timeConductor.title')}</h3>

      {/* Time signature selector */}
      <div className="tc-section">
        <label className="tc-label">{t('timeConductor.select')}</label>
        <div className="tc-sig-buttons">
          {TIME_SIGNATURES.map((sig) => (
            <button
              key={sig.id}
              className={`tc-sig-btn ${signature.id === sig.id ? 'active' : ''}`}
              onClick={() => handleSignatureChange(sig)}
              aria-label={`${sig.label} ${lang === 'en' ? 'time signature' : 'тактовий розмір'}`}
              aria-pressed={signature.id === sig.id}
            >
              {sig.label}
            </button>
          ))}
        </div>
      </div>

      {/* Beat display */}
      <div className="tc-section">
        <div className="tc-beats">
          {signature.accents.map((accent, i) => {
            const isActive = i === currentBeat && isPlaying;
            const sizeClass = accent === 'strong' ? 'strong' : accent === 'medium' ? 'medium' : 'weak';
            return (
              <div
                key={i}
                className={`tc-beat ${sizeClass} ${isActive ? 'active' : ''} ${reducedMotion ? 'no-motion' : ''}`}
                aria-label={`${lang === 'en' ? 'Beat' : 'Доля'} ${i + 1}`}
              />
            );
          })}
        </div>
        <p className="tc-beat-counter">
          {t('timeConductor.beat')} {currentBeat + 1}
        </p>
      </div>

      {/* Tempo slider */}
      <div className="tc-section">
        <label htmlFor="tc-bpm" className="tc-label">
          {t('timeConductor.tempo')} <span className="tc-bpm-value">{bpm}</span>
        </label>
        <input
          id="tc-bpm"
          type="range"
          min="60"
          max="180"
          step="5"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className="tc-slider"
          aria-label={t('timeConductor.tempo')}
        />
      </div>

      {/* Play/Stop button */}
      <div className="tc-section">
        <button
          className="tc-play-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? t('timeConductor.stop') : t('timeConductor.play')}
        >
          {isPlaying ? t('timeConductor.stop') : t('timeConductor.play')}
        </button>
      </div>

      {/* Feel description */}
      <div className="tc-section tc-feel">
        <p className="tc-label">{t('timeConductor.feel')}</p>
        <p className="tc-feel-text">{signature.feel[lang]}</p>
      </div>

      <style>{`
        .tc-root {
          --beat-size: 3rem;
          --beat-strong: 3.5rem;
          --beat-medium: 3rem;
          --beat-weak: 2.5rem;
          padding: 1.5rem;
          background: var(--surface);
          border-radius: 0.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .tc-title {
          margin: 0 0 1.5rem 0;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text);
        }

        .tc-section {
          margin-bottom: 1.5rem;
        }

        .tc-label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .tc-sig-buttons {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
        }

        .tc-sig-btn {
          padding: 1rem 0.5rem;
          font-size: 1.25rem;
          font-weight: 600;
          background: var(--surface-2);
          color: var(--text);
          border: 2px solid transparent;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tc-sig-btn:hover {
          background: var(--surface-3);
          transform: translateY(-2px);
        }

        .tc-sig-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .tc-sig-btn.active {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
        }

        .tc-beats {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .tc-beat {
          border-radius: 50%;
          background: var(--surface-2);
          border: 2px solid var(--surface-3);
          transition: all 0.15s ease-out;
        }

        .tc-beat.strong {
          width: var(--beat-strong);
          height: var(--beat-strong);
        }

        .tc-beat.medium {
          width: var(--beat-medium);
          height: var(--beat-medium);
        }

        .tc-beat.weak {
          width: var(--beat-weak);
          height: var(--beat-weak);
        }

        .tc-beat.active {
          background: var(--accent);
          border-color: var(--accent);
          box-shadow: 0 0 12px var(--accent-soft);
        }

        .tc-beat.active:not(.no-motion) {
          transform: scale(1.15);
        }

        .tc-beat-counter {
          text-align: center;
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text);
          margin: 0;
        }

        .tc-bpm-value {
          font-weight: 700;
          color: var(--accent);
        }

        .tc-slider {
          width: 100%;
          height: 0.5rem;
          border-radius: 0.25rem;
          background: var(--surface-2);
          outline: none;
          -webkit-appearance: none;
          appearance: none;
        }

        .tc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 50%;
          background: var(--accent);
          cursor: pointer;
          transition: transform 0.15s;
        }

        .tc-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }

        .tc-slider::-moz-range-thumb {
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 50%;
          background: var(--accent);
          cursor: pointer;
          border: none;
          transition: transform 0.15s;
        }

        .tc-slider::-moz-range-thumb:hover {
          transform: scale(1.15);
        }

        .tc-slider:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .tc-play-btn {
          width: 100%;
          padding: 1rem 2rem;
          font-size: 1.125rem;
          font-weight: 600;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tc-play-btn:hover {
          background: var(--accent-2);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px var(--accent-soft);
        }

        .tc-play-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .tc-feel {
          text-align: center;
          padding: 1rem;
          background: var(--surface-2);
          border-radius: 0.375rem;
          border-left: 4px solid var(--accent);
        }

        .tc-feel .tc-label {
          margin-bottom: 0.25rem;
        }

        .tc-feel-text {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 500;
          color: var(--text);
          font-style: italic;
        }

        /* Mobile layout (375px) */
        @media (max-width: 480px) {
          .tc-root {
            --beat-strong: 3rem;
            --beat-medium: 2.75rem;
            --beat-weak: 2.25rem;
            padding: 1rem;
          }

          .tc-title {
            font-size: 1.25rem;
          }

          .tc-sig-buttons {
            grid-template-columns: repeat(2, 1fr);
          }

          .tc-beats {
            gap: 0.5rem;
          }

          .tc-beat-counter {
            font-size: 1rem;
          }

          .tc-play-btn {
            padding: 0.875rem 1.5rem;
            font-size: 1rem;
          }

          .tc-feel-text {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
