// =============================================================================
// StaffExplorer — Interactive treble clef staff for exploring note positions.
// User drags/taps to place a note on different positions, sees the note name,
// and can play the sound. Teaches staff notation basics visually + aurally.
// =============================================================================
import { useState, useRef, useEffect } from 'react';
import type { Lang } from '../../i18n/utils';
import { ui } from '../../i18n/ui';
import { useReducedMotion } from './useReducedMotion';
import { playNote } from './audio.utils';
import { STAFF_POSITIONS, DEFAULT_POSITION } from './staffExplorer.data';

export default function StaffExplorer({ lang }: { lang: Lang }) {
  const t = (k: keyof (typeof ui)['en']) => ui[lang][k] ?? ui.en[k];
  const prefersReducedMotion = useReducedMotion();

  const [positionIndex, setPositionIndex] = useState(DEFAULT_POSITION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const currentPosition = STAFF_POSITIONS[positionIndex];

  // Play the current note
  const handlePlay = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    playNote(currentPosition.note, { duration: 0.8 });
    setTimeout(() => setIsPlaying(false), 800);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target !== document.body && !(e.target as HTMLElement).closest('.se-root')) return;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setPositionIndex((i) => Math.min(STAFF_POSITIONS.length - 1, i + 1));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setPositionIndex((i) => Math.max(0, i - 1));
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handlePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPosition, isPlaying]);

  // Drag handlers (desktop)
  const getPositionFromY = (clientY: number): number => {
    if (!svgRef.current) return positionIndex;
    const rect = svgRef.current.getBoundingClientRect();
    const svgY = clientY - rect.top;
    const step = 10;
    const staffY = svgY / rect.height * 140; // SVG viewBox height

    // Find closest position
    let closestIndex = 0;
    let closestDist = Infinity;
    STAFF_POSITIONS.forEach((pos, i) => {
      const dist = Math.abs(pos.y * step - staffY);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });
    return closestIndex;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setPositionIndex(getPositionFromY(e.clientY));
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setPositionIndex(getPositionFromY(e.clientY));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  // Touch handlers (mobile)
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setPositionIndex(getPositionFromY(e.touches[0].clientY));
    }
  };

  // Render the treble clef symbol (simplified G clef)
  const renderClef = () => (
    <g className="se-clef">
      {/* Simplified treble clef as a stylized G */}
      <path
        d="M 15 50 Q 10 45, 15 40 Q 20 35, 20 30 Q 20 20, 15 15 Q 10 10, 15 5 Q 25 0, 30 10 Q 35 20, 30 30 Q 28 35, 25 40 L 22 70 Q 20 85, 15 90 Q 10 95, 8 90 Q 6 85, 10 82 Q 15 79, 18 82 M 25 40 Q 35 45, 30 55 Q 25 65, 18 60"
        fill="var(--text)"
        stroke="var(--text)"
        strokeWidth="0.5"
      />
    </g>
  );

  // Render staff lines
  const renderStaff = () => {
    const lines = [3, 5, 7, 9, 11]; // Y positions for the 5 staff lines (in steps)
    return (
      <g className="se-staff">
        {lines.map((y) => (
          <line
            key={y}
            x1={0}
            y1={y * 10}
            x2={300}
            y2={y * 10}
            stroke="var(--line)"
            strokeWidth={1.5}
          />
        ))}
      </g>
    );
  };

  // Render ledger lines for notes outside the staff
  const renderLedgerLines = () => {
    const { y, type } = currentPosition;
    if (type !== 'ledger') return null;

    const ledgerY = y * 10;
    const isLine = y % 2 === 1; // Odd y values are on lines

    if (!isLine) return null; // Only show ledger for notes on ledger lines, not spaces

    return (
      <line
        x1={140}
        y1={ledgerY}
        x2={180}
        y2={ledgerY}
        stroke="var(--line)"
        strokeWidth={1.5}
        className="se-ledger"
      />
    );
  };

  // Render the note
  const noteY = currentPosition.y * 10;
  const noteClass = prefersReducedMotion ? 'se-note' : 'se-note se-note-animated';

  return (
    <div className="se-root">
      <div className="se-header">
        <h3 className="se-title">{t('staffExplorer.title')}</h3>
        <p className="se-instructions">
          <span className="se-desktop-hint">{t('staffExplorer.dragNote')}</span>
          <span className="se-mobile-hint">{t('staffExplorer.tapNote')}</span>
        </p>
      </div>

      <div className="se-display">
        <div className="se-current-note">
          <span className="se-label">{t('staffExplorer.currentNote')}</span>
          <span className="se-note-name">{currentPosition.note}</span>
          <span className="se-note-desc">{currentPosition.label[lang]}</span>
        </div>

        <svg
          ref={svgRef}
          viewBox="0 0 300 140"
          className="se-staff-svg"
          onMouseDown={handleMouseDown}
          onTouchMove={handleTouchMove}
          role="img"
          aria-label={`${t('staffExplorer.title')}: ${currentPosition.note}`}
        >
          {renderClef()}
          {renderStaff()}
          {renderLedgerLines()}

          {/* Note head */}
          <ellipse
            cx={160}
            cy={noteY}
            rx={6}
            ry={5}
            fill={isPlaying ? 'var(--accent)' : 'var(--text)'}
            className={noteClass}
            style={{ cursor: 'ns-resize' }}
          />

          {/* Note stem (if not middle C) */}
          {currentPosition.note !== 'C4' && (
            <line
              x1={166}
              y1={noteY}
              x2={166}
              y2={noteY - 28}
              stroke={isPlaying ? 'var(--accent)' : 'var(--text)'}
              strokeWidth={1.5}
              className={noteClass}
            />
          )}
        </svg>

        <button
          className="se-play-btn"
          onClick={handlePlay}
          disabled={isPlaying}
          aria-label={`${t('staffExplorer.playNote')} ${currentPosition.note}`}
        >
          {isPlaying ? '♪' : '▶'} {t('staffExplorer.playNote')}
        </button>
      </div>

      {/* Mobile note selector */}
      <div className="se-note-selector">
        {STAFF_POSITIONS.map((pos, i) => (
          <button
            key={pos.note}
            className={`se-note-btn ${i === positionIndex ? 'se-active' : ''}`}
            onClick={() => setPositionIndex(i)}
            aria-label={pos.label[lang]}
          >
            {pos.note}
          </button>
        ))}
      </div>

      <style>{`
        .se-root {
          --se-gap: 1.5rem;
          padding: var(--se-gap);
          background: var(--bg-elev);
          border-radius: var(--radius);
          border: 1px solid var(--line);
        }

        .se-header {
          margin-bottom: var(--se-gap);
        }

        .se-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 0.5rem;
        }

        .se-instructions {
          font-size: 0.95rem;
          color: var(--muted);
          margin: 0;
        }

        .se-mobile-hint {
          display: none;
        }

        @media (max-width: 768px) {
          .se-desktop-hint {
            display: none;
          }
          .se-mobile-hint {
            display: inline;
          }
        }

        .se-display {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .se-current-note {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: var(--bg);
          border-radius: var(--radius-sm);
          border: 1px solid var(--line);
        }

        .se-label {
          font-size: 0.9rem;
          color: var(--muted);
        }

        .se-note-name {
          font-size: 2rem;
          font-weight: 700;
          color: var(--accent);
          font-family: Georgia, serif;
        }

        .se-note-desc {
          font-size: 0.9rem;
          color: var(--muted);
          flex: 1;
        }

        .se-staff-svg {
          width: 100%;
          height: auto;
          max-width: 600px;
          margin: 0 auto;
          background: var(--bg);
          border-radius: var(--radius-sm);
          border: 1px solid var(--line);
          padding: 1rem;
          touch-action: none;
          user-select: none;
        }

        .se-clef {
          opacity: 0.7;
        }

        .se-note-animated {
          transition: all 0.15s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .se-note-animated {
            transition: none;
          }
        }

        .se-ledger {
          stroke-dasharray: none;
        }

        .se-play-btn {
          align-self: center;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          color: var(--on-accent);
          background: var(--accent);
          border: none;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .se-play-btn:hover:not(:disabled) {
          opacity: 0.9;
        }

        .se-play-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .se-note-selector {
          display: none;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--line);
        }

        @media (max-width: 768px) {
          .se-note-selector {
            display: flex;
          }
        }

        .se-note-btn {
          padding: 0.5rem 0.75rem;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: Georgia, serif;
          color: var(--text);
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s;
        }

        .se-note-btn:hover {
          background: var(--accent-soft);
          border-color: var(--accent);
        }

        .se-note-btn.se-active {
          background: var(--accent);
          color: var(--on-accent);
          border-color: var(--accent);
        }

        @media (max-width: 375px) {
          .se-root {
            padding: 1rem;
          }

          .se-title {
            font-size: 1.25rem;
          }

          .se-note-name {
            font-size: 1.5rem;
          }

          .se-current-note {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
}
