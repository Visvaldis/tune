// =============================================================================
// ScaleBuilder — interactive piano keyboard for building major scales
// Used in: major-scale article
// =============================================================================
import { useState, useEffect, useRef } from 'react';
import type { Lang } from '../../i18n/utils';
import { ui } from '../../i18n/ui';
import { useReducedMotion } from './useReducedMotion';
import { playNote, playSequence } from './audio.utils';
import {
  CHROMATIC,
  NATURAL_NOTES,
  getMajorScale,
  getMajorScaleNotes,
  getPianoKeys,
  PATTERN_LABELS,
  type PianoKey,
} from './scaleBuilder.data';

export default function ScaleBuilder({ lang }: { lang: Lang }) {
  const t = (k: keyof (typeof ui)['en']) => ui[lang][k] ?? ui.en[k];
  const prefersReducedMotion = useReducedMotion();

  const [root, setRoot] = useState('C');
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [focusedKeyIndex, setFocusedKeyIndex] = useState(0);

  const cancelPlayback = useRef<(() => void) | null>(null);
  const pianoKeys = getPianoKeys(root);
  const correctScale = getMajorScaleNotes(root);

  // Reset state when root changes
  useEffect(() => {
    setSelectedKeys(new Set());
    setChecked(false);
    setIsCorrect(null);
    setFocusedKeyIndex(0);
  }, [root]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          setFocusedKeyIndex((i) => Math.max(0, i - 1));
          break;
        case 'ArrowRight':
          e.preventDefault();
          setFocusedKeyIndex((i) => Math.min(pianoKeys.length - 1, i + 1));
          break;
        case ' ':
        case 'Enter':
          e.preventDefault();
          if (focusedKeyIndex >= 0 && focusedKeyIndex < pianoKeys.length) {
            toggleKey(pianoKeys[focusedKeyIndex].note);
          }
          break;
        case 'g':
        case 'G':
          e.preventDefault();
          setShowGuide((g) => !g);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedKeyIndex, pianoKeys]);

  const toggleKey = (note: string) => {
    if (checked) return; // Can't modify after checking

    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(note)) {
        next.delete(note);
      } else {
        next.add(note);
      }
      return next;
    });

    // Play note when selected
    if (!prefersReducedMotion) {
      playNote(`${note}4`, { duration: 0.3 });
    }
  };

  const handleCheck = () => {
    if (selectedKeys.size === 0) return;

    const selectedArray = Array.from(selectedKeys).sort(
      (a, b) => CHROMATIC.indexOf(a) - CHROMATIC.indexOf(b)
    );

    // Check if selection matches the correct scale
    const correct =
      selectedArray.length === correctScale.length &&
      selectedArray.every((note, i) => note === correctScale[i]);

    setIsCorrect(correct);
    setChecked(true);
  };

  const handlePlayScale = () => {
    if (!isCorrect) return;

    // Cancel any ongoing playback
    if (cancelPlayback.current) {
      cancelPlayback.current();
      cancelPlayback.current = null;
      setIsPlaying(false);
      return;
    }

    const scaleWithOctaves = getMajorScale(root, 4);
    setIsPlaying(true);

    const cancel = playSequence(scaleWithOctaves, {
      duration: 0.5,
      gap: 0.4,
    });

    cancelPlayback.current = cancel;

    // Auto-reset playing state after the sequence
    setTimeout(() => {
      setIsPlaying(false);
      cancelPlayback.current = null;
    }, scaleWithOctaves.length * 400 + 500);
  };

  const handleReset = () => {
    setSelectedKeys(new Set());
    setChecked(false);
    setIsCorrect(null);
    if (cancelPlayback.current) {
      cancelPlayback.current();
      cancelPlayback.current = null;
      setIsPlaying(false);
    }
  };

  const getKeyState = (note: string): 'selected' | 'correct' | 'incorrect' | 'hint' | 'none' => {
    if (showGuide && !checked) {
      const nextExpectedIndex = Array.from(selectedKeys).length;
      if (nextExpectedIndex < correctScale.length && note === correctScale[nextExpectedIndex]) {
        return 'hint';
      }
    }

    if (!checked) {
      return selectedKeys.has(note) ? 'selected' : 'none';
    }

    if (selectedKeys.has(note)) {
      return correctScale.includes(note) ? 'correct' : 'incorrect';
    }

    return 'none';
  };

  return (
    <div className="sb-root">
      <div className="sb-controls">
        <div className="sb-control-group">
          <label htmlFor="root-select" className="sb-label">
            {t('scaleBuilder.rootNote')}
          </label>
          <select
            id="root-select"
            value={root}
            onChange={(e) => setRoot(e.target.value)}
            className="sb-select"
            disabled={checked}
          >
            {NATURAL_NOTES.map((note) => (
              <option key={note} value={note}>
                {note}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setShowGuide((g) => !g)}
          className={`sb-btn sb-btn-secondary ${showGuide ? 'active' : ''}`}
          aria-pressed={showGuide}
          disabled={checked}
        >
          {t('scaleBuilder.showGuide')}
        </button>
      </div>

      {showGuide && !checked && (
        <div className="sb-pattern-guide" aria-live="polite">
          {PATTERN_LABELS[lang].map((label, i) => (
            <span key={i} className="sb-pattern-label">
              {label}
            </span>
          ))}
        </div>
      )}

      <div className="sb-keyboard" role="group" aria-label={t('scaleBuilder.title')}>
        <svg
          viewBox="0 0 560 180"
          className="sb-piano"
          role="img"
          aria-label={`${t('scaleBuilder.title')} - ${root}`}
        >
          <title>{t('scaleBuilder.title')}</title>

          {/* White keys */}
          {pianoKeys
            .filter((k) => k.color === 'white')
            .map((key, idx) => {
              const state = getKeyState(key.note);
              const x = key.whiteKeyIndex * 70;
              const isFocused = pianoKeys.indexOf(key) === focusedKeyIndex;

              return (
                <g key={`${key.note}-${idx}`}>
                  <rect
                    x={x}
                    y={0}
                    width={68}
                    height={180}
                    className={`sb-key sb-key-white ${state} ${isFocused ? 'focused' : ''}`}
                    onClick={() => toggleKey(key.note)}
                    role="button"
                    tabIndex={isFocused ? 0 : -1}
                    aria-label={`${key.note} ${
                      state === 'selected' || state === 'correct'
                        ? lang === 'en'
                          ? 'selected'
                          : 'обрано'
                        : ''
                    }`}
                    aria-pressed={selectedKeys.has(key.note)}
                  />
                  <text
                    x={x + 34}
                    y={165}
                    className="sb-key-label"
                    textAnchor="middle"
                    pointerEvents="none"
                  >
                    {key.note}
                  </text>
                </g>
              );
            })}

          {/* Black keys */}
          {pianoKeys
            .filter((k) => k.color === 'black')
            .map((key, idx) => {
              const state = getKeyState(key.note);
              const x = key.whiteKeyIndex * 70 + 50;
              const isFocused = pianoKeys.indexOf(key) === focusedKeyIndex;

              return (
                <g key={`${key.note}-${idx}`}>
                  <rect
                    x={x}
                    y={0}
                    width={38}
                    height={110}
                    className={`sb-key sb-key-black ${state} ${isFocused ? 'focused' : ''}`}
                    onClick={() => toggleKey(key.note)}
                    role="button"
                    tabIndex={isFocused ? 0 : -1}
                    aria-label={`${key.note} ${
                      state === 'selected' || state === 'correct'
                        ? lang === 'en'
                          ? 'selected'
                          : 'обрано'
                        : ''
                    }`}
                    aria-pressed={selectedKeys.has(key.note)}
                  />
                  <text
                    x={x + 19}
                    y={95}
                    className="sb-key-label sb-key-label-black"
                    textAnchor="middle"
                    pointerEvents="none"
                  >
                    {key.note}
                  </text>
                </g>
              );
            })}
        </svg>
      </div>

      <div className="sb-actions">
        {!checked ? (
          <button
            onClick={handleCheck}
            className="sb-btn sb-btn-primary"
            disabled={selectedKeys.size === 0}
          >
            {t('scaleBuilder.check')}
          </button>
        ) : (
          <>
            <button onClick={handleReset} className="sb-btn sb-btn-secondary">
              {t('scaleBuilder.reset')}
            </button>
            {isCorrect && (
              <button
                onClick={handlePlayScale}
                className={`sb-btn sb-btn-primary ${isPlaying ? 'playing' : ''}`}
                disabled={prefersReducedMotion}
              >
                {isPlaying
                  ? lang === 'en'
                    ? 'Playing...'
                    : 'Відтворення...'
                  : t('scaleBuilder.playScale')}
              </button>
            )}
          </>
        )}
      </div>

      {checked && (
        <div className={`sb-feedback ${isCorrect ? 'correct' : 'incorrect'}`} role="status" aria-live="polite">
          {isCorrect ? t('scaleBuilder.correct') : t('scaleBuilder.incorrect')}
        </div>
      )}

      <style>{`
        .sb-root {
          --key-white: #ffffff;
          --key-black: #1a1a1a;
          --key-border: #888;
          --key-selected: var(--accent);
          --key-correct: #22c55e;
          --key-incorrect: #ef4444;
          --key-hint: var(--accent-soft);
          --spacing: 1rem;
        }

        .sb-controls {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing);
          margin-bottom: var(--spacing);
          align-items: center;
        }

        .sb-control-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sb-label {
          font-weight: 600;
          font-size: 0.95rem;
        }

        .sb-select {
          padding: 0.5rem 0.75rem;
          border: 2px solid var(--key-border);
          border-radius: 0.375rem;
          font-size: 1rem;
          font-weight: 600;
          background: var(--key-white);
          color: var(--key-black);
          cursor: pointer;
        }

        .sb-select:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .sb-pattern-guide {
          display: flex;
          gap: 0.5rem;
          margin-bottom: var(--spacing);
          padding: 0.75rem;
          background: var(--key-hint);
          border-radius: 0.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .sb-pattern-label {
          font-weight: 700;
          font-size: 0.9rem;
          padding: 0.25rem 0.5rem;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 0.25rem;
        }

        .sb-keyboard {
          margin-bottom: var(--spacing);
          overflow-x: auto;
          overflow-y: hidden;
        }

        .sb-piano {
          max-width: 100%;
          height: auto;
          min-width: 375px;
        }

        .sb-key {
          cursor: pointer;
          transition: fill 0.15s ease, stroke 0.15s ease, filter 0.15s ease;
          stroke-width: 2;
        }

        .sb-key:focus {
          outline: none;
        }

        .sb-key.focused {
          stroke-width: 4;
          stroke: var(--accent);
        }

        .sb-key-white {
          fill: var(--key-white);
          stroke: var(--key-border);
        }

        .sb-key-white:hover {
          filter: brightness(0.95);
        }

        .sb-key-white.selected {
          fill: var(--key-selected);
        }

        .sb-key-white.correct {
          fill: var(--key-correct);
        }

        .sb-key-white.incorrect {
          fill: var(--key-incorrect);
        }

        .sb-key-white.hint {
          fill: var(--key-hint);
          animation: pulse 1.5s ease-in-out infinite;
        }

        .sb-key-black {
          fill: var(--key-black);
          stroke: var(--key-border);
        }

        .sb-key-black:hover {
          filter: brightness(1.3);
        }

        .sb-key-black.selected {
          fill: var(--key-selected);
        }

        .sb-key-black.correct {
          fill: var(--key-correct);
        }

        .sb-key-black.incorrect {
          fill: var(--key-incorrect);
        }

        .sb-key-black.hint {
          fill: var(--accent);
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sb-key-white.hint,
          .sb-key-black.hint {
            animation: none;
          }
        }

        .sb-key-label {
          font-size: 0.875rem;
          font-weight: 600;
          fill: var(--key-black);
          user-select: none;
        }

        .sb-key-label-black {
          fill: var(--key-white);
          font-size: 0.75rem;
        }

        .sb-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: var(--spacing);
        }

        .sb-btn {
          padding: 0.625rem 1.25rem;
          border: none;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sb-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .sb-btn-primary {
          background: var(--accent);
          color: white;
        }

        .sb-btn-primary:not(:disabled):hover {
          filter: brightness(1.1);
        }

        .sb-btn-primary.playing {
          background: var(--accent-2);
        }

        .sb-btn-secondary {
          background: var(--accent-soft);
          color: var(--key-black);
        }

        .sb-btn-secondary:not(:disabled):hover {
          filter: brightness(0.95);
        }

        .sb-btn-secondary.active {
          background: var(--accent);
          color: white;
        }

        .sb-feedback {
          padding: 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
          text-align: center;
        }

        .sb-feedback.correct {
          background: #dcfce7;
          color: #166534;
        }

        .sb-feedback.incorrect {
          background: #fee2e2;
          color: #991b1b;
        }

        @media (prefers-color-scheme: dark) {
          .sb-root {
            --key-white: #2a2a2a;
            --key-black: #0a0a0a;
            --key-border: #555;
          }

          .sb-select {
            background: var(--key-white);
            color: #ffffff;
          }

          .sb-key-label {
            fill: #ffffff;
          }

          .sb-key-label-black {
            fill: #888;
          }

          .sb-btn-secondary {
            color: #ffffff;
          }

          .sb-feedback.correct {
            background: #14532d;
            color: #86efac;
          }

          .sb-feedback.incorrect {
            background: #7f1d1d;
            color: #fca5a5;
          }
        }

        @media (max-width: 640px) {
          .sb-piano {
            min-width: 300px;
          }

          .sb-btn {
            flex: 1;
            min-width: 140px;
          }
        }
      `}</style>
    </div>
  );
}
