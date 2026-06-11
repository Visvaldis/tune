// =============================================================================
// ChordExplorer — interactive chord diagram viewer with audio playback
// For article: basic-chords (harmony)
// =============================================================================
import { useState, useEffect } from 'react';
import type { Lang } from '../../i18n/utils';
import { ui } from '../../i18n/ui';
import { useReducedMotion } from './useReducedMotion';
import { playChord, playNote } from './audio.utils';
import { CHORDS, STRING_NAMES, type ChordData } from './chordExplorer.data';

export default function ChordExplorer({ lang }: { lang: Lang }) {
  const t = (k: keyof (typeof ui)['en']) => ui[lang][k] ?? ui.en[k];
  const [selectedChord, setSelectedChord] = useState<string>('Em');
  const [stringByString, setStringByString] = useState(false);
  const reducedMotion = useReducedMotion();

  const chord = CHORDS.find((c) => c.id === selectedChord) || CHORDS[0];

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Number keys 1-7 select chords
      if (e.key >= '1' && e.key <= '7') {
        const index = parseInt(e.key, 10) - 1;
        if (CHORDS[index]) {
          setSelectedChord(CHORDS[index].id);
        }
        return;
      }
      // Space or Enter: strum chord
      if (e.key === ' ' || e.key === 'Enter') {
        if (e.target instanceof HTMLElement && e.target.tagName !== 'BUTTON') {
          e.preventDefault();
          handleStrum();
        }
        return;
      }
      // S: toggle string-by-string mode
      if (e.key === 's' || e.key === 'S') {
        if (e.target instanceof HTMLElement && e.target.tagName !== 'BUTTON') {
          setStringByString((prev) => !prev);
        }
        return;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleStrum = () => {
    const notesToPlay = chord.notes.filter((n): n is string => n !== null);
    playChord(notesToPlay, { duration: 1.2, volume: 0.25 });
  };

  const handleStringClick = (index: number) => {
    if (!stringByString) return;
    const note = chord.notes[index];
    if (note) {
      playNote(note, { duration: 1.0, volume: 0.3 });
    }
  };

  return (
    <div className="chord-explorer-root">
      <div className="chord-explorer-header">
        <h3>{t('chordExplorer.title')}</h3>
      </div>

      {/* Chord selector buttons */}
      <div className="chord-selector" role="group" aria-label={t('chordExplorer.selectChord')}>
        <span className="chord-selector-label">{t('chordExplorer.selectChord')}</span>
        <div className="chord-buttons">
          {CHORDS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setSelectedChord(c.id)}
              className={selectedChord === c.id ? 'active' : ''}
              aria-pressed={selectedChord === c.id}
              aria-label={`${c.name[lang]} (${i + 1})`}
            >
              {c.name[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Chord diagram */}
      <div className="chord-diagram-container">
        <div className="chord-name">{chord.fullName[lang]}</div>
        <svg
          viewBox="0 0 200 260"
          className="chord-diagram"
          role="img"
          aria-label={`${t('chordExplorer.title')}: ${chord.fullName[lang]}`}
        >
          {/* Fret markers (horizontal lines) */}
          {[0, 1, 2, 3, 4].map((fret) => (
            <line
              key={`fret-${fret}`}
              x1="40"
              y1={50 + fret * 45}
              x2="160"
              y2={50 + fret * 45}
              stroke="currentColor"
              strokeWidth={fret === 0 ? 3 : 1}
              opacity={fret === 0 ? 1 : 0.3}
            />
          ))}

          {/* String lines (vertical) */}
          {STRING_NAMES.map((stringName, i) => {
            const x = 40 + i * 24;
            const isMuted = chord.strings[i] === 'x';
            return (
              <g key={`string-${i}`}>
                <line
                  x1={x}
                  y1="50"
                  x2={x}
                  y2="230"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity={isMuted ? 0.2 : 1}
                  className={stringByString ? 'clickable-string' : ''}
                  onClick={() => handleStringClick(i)}
                  style={{ cursor: stringByString ? 'pointer' : 'default' }}
                />
                {/* String label at bottom */}
                <text
                  x={x}
                  y="248"
                  textAnchor="middle"
                  fontSize="11"
                  fill="currentColor"
                  opacity="0.6"
                >
                  {stringName}
                </text>
                {/* Open or muted marker at top */}
                {chord.strings[i] === 'x' ? (
                  <text
                    x={x}
                    y="38"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill="currentColor"
                    opacity="0.5"
                  >
                    ×
                  </text>
                ) : chord.strings[i] === 0 ? (
                  <circle cx={x} cy="32" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
                ) : null}
              </g>
            );
          })}

          {/* Finger positions */}
          {chord.strings.map((fret, i) => {
            if (fret === 'x' || fret === 0) return null;
            const x = 40 + i * 24;
            const y = 50 + (fret - 0.5) * 45;
            const finger = chord.fingers[i];
            return (
              <g key={`finger-${i}`}>
                <circle cx={x} cy={y} r="10" fill="var(--accent)" />
                {finger > 0 && (
                  <text
                    x={x}
                    y={y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="11"
                    fontWeight="bold"
                    fill="white"
                  >
                    {finger}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Chord info: notes being played */}
        <div className="chord-info">
          <span className="chord-info-label">{t('chordExplorer.notes')}</span>
          <span className="chord-notes">
            {chord.notes.map((note, i) => note || `(${t('chordExplorer.muted')})`).join(' - ')}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="chord-controls">
        <button
          className="strum-button"
          onClick={handleStrum}
          aria-label={t('chordExplorer.strum')}
        >
          {t('chordExplorer.strum')}
        </button>
        <label className="string-toggle">
          <input
            type="checkbox"
            checked={stringByString}
            onChange={(e) => setStringByString(e.target.checked)}
            aria-label={t('chordExplorer.stringByString')}
          />
          <span>{t('chordExplorer.stringByString')}</span>
        </label>
      </div>

      <style>{`
        .chord-explorer-root {
          padding: 1.5rem;
          background: var(--surface-1);
          border-radius: 12px;
          border: 1px solid var(--border);
          max-width: 600px;
          margin: 0 auto;
        }

        .chord-explorer-header h3 {
          margin: 0 0 1.5rem;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-1);
        }

        .chord-selector {
          margin-bottom: 2rem;
        }

        .chord-selector-label {
          display: block;
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-2);
        }

        .chord-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .chord-buttons button {
          padding: 0.625rem 1.25rem;
          border: 2px solid var(--border);
          background: var(--surface-2);
          color: var(--text-1);
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .chord-buttons button:hover {
          border-color: var(--accent);
          background: var(--surface-3);
        }

        .chord-buttons button:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .chord-buttons button.active {
          border-color: var(--accent);
          background: var(--accent);
          color: white;
        }

        .chord-diagram-container {
          margin-bottom: 1.5rem;
        }

        .chord-name {
          text-align: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 1rem;
        }

        .chord-diagram {
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
          display: block;
          color: var(--text-1);
        }

        .clickable-string {
          cursor: pointer;
          transition: opacity 0.15s ease;
        }

        .clickable-string:hover {
          opacity: 0.6 !important;
        }

        .chord-info {
          margin-top: 1.5rem;
          padding: 1rem;
          background: var(--surface-2);
          border-radius: 8px;
          text-align: center;
        }

        .chord-info-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-2);
          margin-bottom: 0.5rem;
        }

        .chord-notes {
          font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace;
          font-size: 0.9rem;
          color: var(--accent);
          font-weight: 500;
        }

        .chord-controls {
          display: flex;
          gap: 1rem;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }

        .strum-button {
          padding: 0.875rem 2rem;
          border: none;
          background: var(--accent);
          color: white;
          border-radius: 8px;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .strum-button:hover {
          background: var(--accent-2);
          transform: translateY(-1px);
        }

        .strum-button:active {
          transform: translateY(0);
        }

        .strum-button:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .string-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.9rem;
          color: var(--text-2);
        }

        .string-toggle input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: var(--accent);
        }

        .string-toggle:hover {
          color: var(--text-1);
        }

        /* Mobile adjustments */
        @media (max-width: 480px) {
          .chord-explorer-root {
            padding: 1rem;
          }

          .chord-buttons {
            justify-content: center;
          }

          .chord-buttons button {
            flex: 1 1 calc(33.333% - 0.5rem);
            min-width: 70px;
            padding: 0.5rem 0.75rem;
            font-size: 0.95rem;
          }

          .chord-diagram {
            max-width: 100%;
          }

          .chord-name {
            font-size: 1.25rem;
          }

          .strum-button {
            width: 100%;
            padding: 0.75rem 1.5rem;
          }

          .chord-controls {
            flex-direction: column;
            width: 100%;
          }

          .string-toggle {
            justify-content: center;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .chord-buttons button,
          .strum-button,
          .clickable-string {
            transition: none;
          }

          .strum-button:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
