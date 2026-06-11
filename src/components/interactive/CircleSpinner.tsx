// =============================================================================
// CircleSpinner — Circle of Fifths interactive for circle-of-fifths article
// =============================================================================
import { useState, useEffect, useCallback } from 'react';
import type { Lang } from '../../i18n/utils';
import { ui } from '../../i18n/ui';
import { useReducedMotion } from './useReducedMotion';
import { playChord } from './audio.utils';
import { CIRCLE_KEYS } from './circleSpinner.data';

export default function CircleSpinner({ lang }: { lang: Lang }) {
  const t = (k: keyof (typeof ui)['en']) => ui[lang][k] ?? ui.en[k];
  const reducedMotion = useReducedMotion();

  const [selectedKey, setSelectedKey] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedKey === null) {
        if (e.key === 'Enter' || e.key === ' ') {
          setSelectedKey(0); // Start at C
          e.preventDefault();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
          setSelectedKey((selectedKey + 1) % 12);
          e.preventDefault();
          break;
        case 'ArrowLeft':
          setSelectedKey((selectedKey + 11) % 12);
          e.preventDefault();
          break;
        case 'Enter':
        case ' ':
          handlePlayChord(selectedKey);
          e.preventDefault();
          break;
        case 'p':
        case 'P':
          if (selectedKey !== null) {
            handlePlayChord(selectedKey);
            e.preventDefault();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedKey]);

  const handlePlayChord = useCallback((keyIndex: number) => {
    if (isPlaying) return;
    setIsPlaying(true);
    const key = CIRCLE_KEYS[keyIndex];
    playChord(key.triad, { duration: 1.5 });
    setTimeout(() => setIsPlaying(false), 1500);
  }, [isPlaying]);

  const handleKeyClick = (index: number) => {
    setSelectedKey(index);
  };

  // Calculate SVG circle positions
  const centerX = 200;
  const centerY = 200;
  const outerRadius = 160;
  const innerRadius = 100;
  const labelRadius = 130;
  const minorLabelRadius = 70;

  const getPosition = (index: number, radius: number) => {
    // Start at top (12 o'clock) and go clockwise
    const angle = (index * 30 - 90) * (Math.PI / 180); // 30° per step, -90 to start at top
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  const getSegmentPath = (index: number) => {
    const startAngle = (index * 30 - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * 30 - 90) * (Math.PI / 180);

    const outerStart = {
      x: centerX + outerRadius * Math.cos(startAngle),
      y: centerY + outerRadius * Math.sin(startAngle),
    };
    const outerEnd = {
      x: centerX + outerRadius * Math.cos(endAngle),
      y: centerY + outerRadius * Math.sin(endAngle),
    };
    const innerStart = {
      x: centerX + innerRadius * Math.cos(startAngle),
      y: centerY + innerRadius * Math.sin(startAngle),
    };
    const innerEnd = {
      x: centerX + innerRadius * Math.cos(endAngle),
      y: centerY + innerRadius * Math.sin(endAngle),
    };

    return `
      M ${outerStart.x} ${outerStart.y}
      A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}
      L ${innerEnd.x} ${innerEnd.y}
      A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}
      Z
    `;
  };

  const isNeighbor = (index: number): boolean => {
    if (selectedKey === null) return false;
    const prev = (selectedKey + 11) % 12;
    const next = (selectedKey + 1) % 12;
    return index === prev || index === next || index === selectedKey;
  };

  const getNeighborNames = (keyIndex: number): { prev: string; next: string } => {
    const prevIndex = (keyIndex + 11) % 12;
    const nextIndex = (keyIndex + 1) % 12;
    return {
      prev: CIRCLE_KEYS[prevIndex].major,
      next: CIRCLE_KEYS[nextIndex].major,
    };
  };

  const selectedKeyData = selectedKey !== null ? CIRCLE_KEYS[selectedKey] : null;
  const neighbors = selectedKey !== null ? getNeighborNames(selectedKey) : null;

  return (
    <div className="cs-root">
      <h3 className="cs-title">{t('circleSpinner.title')}</h3>
      <p className="cs-instruction">{t('circleSpinner.instruction')}</p>

      <svg
        viewBox="0 0 400 400"
        className="cs-circle"
        role="img"
        aria-label={t('circleSpinner.title')}
      >
        {/* Background circle */}
        <circle cx={centerX} cy={centerY} r={outerRadius} fill="var(--accent-soft)" opacity="0.2" />

        {/* Draw segments */}
        {CIRCLE_KEYS.map((key, index) => {
          const isSelected = selectedKey === index;
          const isAdjacentNeighbor = isNeighbor(index);

          return (
            <g key={index}>
              <path
                d={getSegmentPath(index)}
                fill={
                  isSelected
                    ? 'var(--accent)'
                    : isAdjacentNeighbor
                    ? 'var(--accent-soft)'
                    : 'transparent'
                }
                stroke="var(--accent)"
                strokeWidth="1.5"
                className={reducedMotion ? '' : 'cs-segment'}
                style={{ cursor: 'pointer' }}
                onClick={() => handleKeyClick(index)}
                role="button"
                tabIndex={0}
                aria-label={`${key.major} major, ${key.accidentals} ${
                  key.accidentalType === '♯'
                    ? t('circleSpinner.sharps')
                    : key.accidentalType === '♭'
                    ? t('circleSpinner.flats')
                    : t('circleSpinner.none')
                }`}
              />
            </g>
          );
        })}

        {/* Major key labels (outer ring) */}
        {CIRCLE_KEYS.map((key, index) => {
          const pos = getPosition(index, labelRadius);
          return (
            <text
              key={`major-${index}`}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="cs-label cs-label-major"
              fill={selectedKey === index ? 'var(--bg)' : 'var(--text)'}
              style={{ pointerEvents: 'none', fontWeight: selectedKey === index ? 'bold' : 'normal' }}
            >
              {key.major}
            </text>
          );
        })}

        {/* Minor key labels (inner ring) */}
        {CIRCLE_KEYS.map((key, index) => {
          const pos = getPosition(index, minorLabelRadius);
          return (
            <text
              key={`minor-${index}`}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="cs-label cs-label-minor"
              fill="var(--text-muted)"
              style={{ pointerEvents: 'none', fontSize: '0.75rem' }}
            >
              {key.minor}
            </text>
          );
        })}

        {/* Center decoration */}
        <circle cx={centerX} cy={centerY} r={40} fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
        <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="middle"
          className="cs-center-text"
          fill="var(--text-muted)"
        >
          5ths
        </text>
      </svg>

      {/* Info panel */}
      {selectedKeyData && (
        <div className="cs-info" role="region" aria-live="polite">
          <h4 className="cs-info-title">
            {selectedKeyData.major}{' '}
            {lang === 'en' ? 'Major' : 'мажор'}
          </h4>

          <div className="cs-info-row">
            <span className="cs-info-label">{t('circleSpinner.accidentals')}</span>
            <span className="cs-info-value">
              {selectedKeyData.accidentals === 0 ? (
                t('circleSpinner.none')
              ) : (
                <>
                  {selectedKeyData.accidentals}
                  {selectedKeyData.accidentalType}{' '}
                  ({selectedKeyData.accidentalNotes})
                </>
              )}
            </span>
          </div>

          <div className="cs-info-row">
            <span className="cs-info-label">{t('circleSpinner.relative')}</span>
            <span className="cs-info-value">{selectedKeyData.minor}</span>
          </div>

          {neighbors && (
            <div className="cs-info-row">
              <span className="cs-info-label">{t('circleSpinner.neighbors')}</span>
              <span className="cs-info-value">
                {neighbors.prev} {lang === 'en' ? '(← fifth below)' : '(← квінта вниз)'} —{' '}
                {neighbors.next} {lang === 'en' ? '(→ fifth above)' : '(→ квінта вгору)'}
              </span>
            </div>
          )}

          <button
            className="cs-play-btn"
            onClick={() => handlePlayChord(selectedKey!)}
            disabled={isPlaying}
            aria-label={t('circleSpinner.playChord')}
          >
            {isPlaying ? (lang === 'en' ? 'Playing...' : 'Відтворюється...') : t('circleSpinner.playChord')}
          </button>
        </div>
      )}

      <style>{`
        .cs-root {
          max-width: 600px;
          margin: 0 auto;
          padding: 1.5rem;
        }

        .cs-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text);
        }

        .cs-instruction {
          color: var(--text-muted);
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }

        .cs-circle {
          width: 100%;
          height: auto;
          margin-bottom: 2rem;
        }

        .cs-segment {
          transition: fill 0.2s ease, opacity 0.2s ease;
        }

        .cs-segment:hover {
          opacity: 0.8;
        }

        .cs-segment:focus {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .cs-label {
          user-select: none;
        }

        .cs-label-major {
          font-size: 1rem;
          font-weight: 600;
        }

        .cs-label-minor {
          font-size: 0.75rem;
        }

        .cs-center-text {
          font-size: 0.875rem;
          font-weight: 600;
        }

        .cs-info {
          background: var(--accent-soft);
          border-radius: 8px;
          padding: 1.5rem;
          border-left: 4px solid var(--accent);
        }

        .cs-info-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text);
        }

        .cs-info-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cs-info-label {
          font-weight: 600;
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .cs-info-value {
          color: var(--text);
          text-align: right;
          flex: 1;
        }

        .cs-play-btn {
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          background: var(--accent);
          color: var(--bg);
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          font-size: 1rem;
          transition: opacity 0.2s ease;
        }

        .cs-play-btn:hover:not(:disabled) {
          opacity: 0.9;
        }

        .cs-play-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .cs-play-btn:focus {
          outline: 2px solid var(--accent-2);
          outline-offset: 2px;
        }

        @media (max-width: 480px) {
          .cs-root {
            padding: 1rem;
          }

          .cs-title {
            font-size: 1.25rem;
          }

          .cs-label-major {
            font-size: 0.85rem;
          }

          .cs-label-minor {
            font-size: 0.65rem;
          }

          .cs-info {
            padding: 1rem;
          }

          .cs-info-title {
            font-size: 1.125rem;
          }

          .cs-info-row {
            flex-direction: column;
            gap: 0.25rem;
            align-items: flex-start;
          }

          .cs-info-value {
            text-align: left;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cs-segment {
            transition: none;
          }

          .cs-play-btn {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
