// =============================================================================
// GuitarAnatomy — interactive SVG guitar with labeled parts.
// User hovers/taps parts to learn their names and functions.
// Every fact traces to content/*/anatomy-of-guitar.md.
// =============================================================================
import { useState, useEffect, useRef } from 'react';
import type { Lang } from '../../i18n/utils';
import { ui } from '../../i18n/ui';
import { useReducedMotion } from './useReducedMotion';
import { GUITAR_PARTS } from './guitarAnatomy.data';

export default function GuitarAnatomy({ lang }: { lang: Lang }) {
  const t = (k: keyof (typeof ui)['en']) => ui[lang][k] ?? ui.en[k];
  const [activePart, setActivePart] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const reducedMotion = useReducedMotion();
  const partsRefs = useRef<Map<string, SVGGElement>>(new Map());

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePart(null);
        setFocusedIndex(-1);
      } else if (e.key === 'Tab') {
        // Tab handled natively by focus management
      } else if (e.key === 'Enter' || e.key === ' ') {
        if (focusedIndex >= 0 && focusedIndex < GUITAR_PARTS.length) {
          const part = GUITAR_PARTS[focusedIndex];
          setActivePart(activePart === part.id ? null : part.id);
          e.preventDefault();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePart, focusedIndex]);

  const handlePartClick = (id: string) => {
    setActivePart(activePart === id ? null : id);
  };

  const handlePartFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const activeParts = GUITAR_PARTS.find((p) => p.id === activePart);
  const transitionClass = reducedMotion ? '' : 'ga-transition';

  return (
    <div className="ga-root">
      <div className="ga-header">
        <h3 className="ga-title">{t('guitarAnatomy.title')}</h3>
        <p className="ga-instruction">{t('guitarAnatomy.instruction')}</p>
      </div>

      <div className="ga-content">
        <svg
          viewBox="0 0 300 800"
          className="ga-guitar"
          aria-label={lang === 'en' ? 'Interactive guitar diagram' : 'Інтерактивна схема гітари'}
        >
          {/* HEADSTOCK */}
          <g
            ref={(el) => el && partsRefs.current.set('headstock', el)}
            className={`ga-part ${transitionClass} ${activePart === 'headstock' ? 'ga-active' : ''}`}
            onClick={() => handlePartClick('headstock')}
            tabIndex={0}
            role="button"
            aria-label={GUITAR_PARTS.find((p) => p.id === 'headstock')?.label[lang]}
            onFocus={() => handlePartFocus(GUITAR_PARTS.findIndex((p) => p.id === 'headstock'))}
          >
            <path
              d="M 120 40 L 100 20 L 80 30 L 70 50 L 80 70 L 100 80 L 120 80 L 140 70 L 150 50 L 140 30 L 120 20 Z"
              className="ga-shape"
            />
          </g>

          {/* TUNING PEGS */}
          <g
            ref={(el) => el && partsRefs.current.set('tuningPegs', el)}
            className={`ga-part ${transitionClass} ${activePart === 'tuningPegs' ? 'ga-active' : ''}`}
            onClick={() => handlePartClick('tuningPegs')}
            tabIndex={0}
            role="button"
            aria-label={GUITAR_PARTS.find((p) => p.id === 'tuningPegs')?.label[lang]}
            onFocus={() => handlePartFocus(GUITAR_PARTS.findIndex((p) => p.id === 'tuningPegs'))}
          >
            <circle cx="75" cy="30" r="4" className="ga-shape" />
            <circle cx="75" cy="45" r="4" className="ga-shape" />
            <circle cx="75" cy="60" r="4" className="ga-shape" />
            <circle cx="145" cy="30" r="4" className="ga-shape" />
            <circle cx="145" cy="45" r="4" className="ga-shape" />
            <circle cx="145" cy="60" r="4" className="ga-shape" />
          </g>

          {/* NUT */}
          <g
            ref={(el) => el && partsRefs.current.set('nut', el)}
            className={`ga-part ${transitionClass} ${activePart === 'nut' ? 'ga-active' : ''}`}
            onClick={() => handlePartClick('nut')}
            tabIndex={0}
            role="button"
            aria-label={GUITAR_PARTS.find((p) => p.id === 'nut')?.label[lang]}
            onFocus={() => handlePartFocus(GUITAR_PARTS.findIndex((p) => p.id === 'nut'))}
          >
            <rect x="95" y="85" width="30" height="3" className="ga-shape" />
          </g>

          {/* NECK */}
          <g
            ref={(el) => el && partsRefs.current.set('neck', el)}
            className={`ga-part ${transitionClass} ${activePart === 'neck' ? 'ga-active' : ''}`}
            onClick={() => handlePartClick('neck')}
            tabIndex={0}
            role="button"
            aria-label={GUITAR_PARTS.find((p) => p.id === 'neck')?.label[lang]}
            onFocus={() => handlePartFocus(GUITAR_PARTS.findIndex((p) => p.id === 'neck'))}
          >
            <rect x="90" y="88" width="40" height="312" rx="2" className="ga-shape" />
          </g>

          {/* FRETBOARD */}
          <g
            ref={(el) => el && partsRefs.current.set('fretboard', el)}
            className={`ga-part ${transitionClass} ${activePart === 'fretboard' ? 'ga-active' : ''}`}
            onClick={() => handlePartClick('fretboard')}
            tabIndex={0}
            role="button"
            aria-label={GUITAR_PARTS.find((p) => p.id === 'fretboard')?.label[lang]}
            onFocus={() => handlePartFocus(GUITAR_PARTS.findIndex((p) => p.id === 'fretboard'))}
          >
            <rect x="95" y="90" width="30" height="308" className="ga-shape ga-fretboard-fill" />
          </g>

          {/* FRETS */}
          <g
            ref={(el) => el && partsRefs.current.set('frets', el)}
            className={`ga-part ${transitionClass} ${activePart === 'frets' ? 'ga-active' : ''}`}
            onClick={() => handlePartClick('frets')}
            tabIndex={0}
            role="button"
            aria-label={GUITAR_PARTS.find((p) => p.id === 'frets')?.label[lang]}
            onFocus={() => handlePartFocus(GUITAR_PARTS.findIndex((p) => p.id === 'frets'))}
          >
            {[110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310, 330, 350, 370, 390].map((y, i) => (
              <line key={i} x1="95" y1={y} x2="125" y2={y} className="ga-fret-line" strokeWidth="1.5" />
            ))}
            {/* Position markers */}
            <circle cx="110" cy="150" r="2.5" className="ga-marker" />
            <circle cx="110" cy="190" r="2.5" className="ga-marker" />
            <circle cx="110" cy="230" r="2.5" className="ga-marker" />
            <circle cx="110" cy="270" r="2.5" className="ga-marker" />
            <circle cx="107" cy="310" r="2.5" className="ga-marker" />
            <circle cx="113" cy="310" r="2.5" className="ga-marker" />
          </g>

          {/* STRINGS */}
          <g
            ref={(el) => el && partsRefs.current.set('strings', el)}
            className={`ga-part ${transitionClass} ${activePart === 'strings' ? 'ga-active' : ''}`}
            onClick={() => handlePartClick('strings')}
            tabIndex={0}
            role="button"
            aria-label={GUITAR_PARTS.find((p) => p.id === 'strings')?.label[lang]}
            onFocus={() => handlePartFocus(GUITAR_PARTS.findIndex((p) => p.id === 'strings'))}
          >
            {[98, 102, 106, 114, 118, 122].map((x, i) => (
              <line
                key={i}
                x1={x}
                y1="88"
                x2={x + (i < 3 ? -8 : 8)}
                y2="520"
                className="ga-string"
                strokeWidth={i < 3 ? 1.5 : 0.8}
              />
            ))}
          </g>

          {/* BODY */}
          <g
            ref={(el) => el && partsRefs.current.set('body', el)}
            className={`ga-part ${transitionClass} ${activePart === 'body' ? 'ga-active' : ''}`}
            onClick={() => handlePartClick('body')}
            tabIndex={0}
            role="button"
            aria-label={GUITAR_PARTS.find((p) => p.id === 'body')?.label[lang]}
            onFocus={() => handlePartFocus(GUITAR_PARTS.findIndex((p) => p.id === 'body'))}
          >
            {/* Upper bout */}
            <ellipse cx="110" cy="440" rx="55" ry="60" className="ga-shape" />
            {/* Lower bout */}
            <ellipse cx="110" cy="620" rx="80" ry="100" className="ga-shape" />
            {/* Waist connection */}
            <path d="M 80 480 Q 95 530 80 580 L 140 580 Q 125 530 140 480 Z" className="ga-shape" />
          </g>

          {/* SOUND HOLE */}
          <g
            ref={(el) => el && partsRefs.current.set('soundHole', el)}
            className={`ga-part ${transitionClass} ${activePart === 'soundHole' ? 'ga-active' : ''}`}
            onClick={() => handlePartClick('soundHole')}
            tabIndex={0}
            role="button"
            aria-label={GUITAR_PARTS.find((p) => p.id === 'soundHole')?.label[lang]}
            onFocus={() => handlePartFocus(GUITAR_PARTS.findIndex((p) => p.id === 'soundHole'))}
          >
            <circle cx="110" cy="460" r="20" className="ga-shape ga-soundhole-fill" />
            <circle cx="110" cy="460" r="22" className="ga-soundhole-ring" fill="none" strokeWidth="1" />
          </g>

          {/* BRIDGE */}
          <g
            ref={(el) => el && partsRefs.current.set('bridge', el)}
            className={`ga-part ${transitionClass} ${activePart === 'bridge' ? 'ga-active' : ''}`}
            onClick={() => handlePartClick('bridge')}
            tabIndex={0}
            role="button"
            aria-label={GUITAR_PARTS.find((p) => p.id === 'bridge')?.label[lang]}
            onFocus={() => handlePartFocus(GUITAR_PARTS.findIndex((p) => p.id === 'bridge'))}
          >
            <rect x="80" y="515" width="60" height="8" rx="1" className="ga-shape" />
          </g>

          {/* SADDLE */}
          <g
            ref={(el) => el && partsRefs.current.set('saddle', el)}
            className={`ga-part ${transitionClass} ${activePart === 'saddle' ? 'ga-active' : ''}`}
            onClick={() => handlePartClick('saddle')}
            tabIndex={0}
            role="button"
            aria-label={GUITAR_PARTS.find((p) => p.id === 'saddle')?.label[lang]}
            onFocus={() => handlePartFocus(GUITAR_PARTS.findIndex((p) => p.id === 'saddle'))}
          >
            <rect x="85" y="517" width="50" height="2" className="ga-shape" />
          </g>
        </svg>

        <div className="ga-info">
          {activeParts ? (
            <>
              <h4 className="ga-info-title">{activeParts.label[lang]}</h4>
              <p className="ga-info-desc">{activeParts.desc[lang]}</p>
            </>
          ) : (
            <p className="ga-info-placeholder">{t('guitarAnatomy.selectPart')}</p>
          )}
        </div>
      </div>

      <style>{`
        .ga-root {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 1.5rem;
          border-radius: var(--radius);
          background: var(--bg-elev);
        }

        .ga-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .ga-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 0.5rem;
        }

        .ga-instruction {
          font-size: 0.95rem;
          color: var(--muted);
          margin: 0;
        }

        .ga-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: start;
        }

        .ga-guitar {
          width: 100%;
          height: auto;
          max-height: 600px;
        }

        .ga-part {
          cursor: pointer;
          outline: none;
        }

        .ga-part:focus-visible .ga-shape,
        .ga-part:focus-visible .ga-fret-line,
        .ga-part:focus-visible .ga-string {
          stroke: var(--accent);
          stroke-width: 2;
        }

        .ga-shape {
          fill: var(--bg);
          stroke: var(--line);
          stroke-width: 1.5;
        }

        .ga-fretboard-fill {
          fill: var(--muted);
          opacity: 0.2;
        }

        .ga-soundhole-fill {
          fill: var(--bg);
        }

        .ga-soundhole-ring {
          stroke: var(--line);
        }

        .ga-fret-line {
          stroke: var(--line);
        }

        .ga-string {
          stroke: var(--muted);
        }

        .ga-marker {
          fill: var(--line);
        }

        .ga-part:hover .ga-shape,
        .ga-part:hover .ga-fret-line,
        .ga-part:hover .ga-string,
        .ga-part.ga-active .ga-shape,
        .ga-part.ga-active .ga-fret-line,
        .ga-part.ga-active .ga-string {
          stroke: var(--accent);
        }

        .ga-part.ga-active .ga-shape {
          fill: var(--accent-soft);
        }

        .ga-transition .ga-shape,
        .ga-transition .ga-fret-line,
        .ga-transition .ga-string {
          transition: stroke 0.2s ease, fill 0.2s ease;
        }

        .ga-info {
          padding: 1.5rem;
          background: var(--bg);
          border-radius: var(--radius-sm);
          border: 1px solid var(--line);
          min-height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .ga-info-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--accent);
          margin: 0 0 0.5rem;
        }

        .ga-info-desc {
          font-size: 0.95rem;
          color: var(--text);
          margin: 0;
          line-height: 1.5;
        }

        .ga-info-placeholder {
          font-size: 0.95rem;
          color: var(--muted);
          margin: 0;
          text-align: center;
        }

        @media (max-width: 768px) {
          .ga-content {
            grid-template-columns: 1fr;
          }

          .ga-guitar {
            max-height: 500px;
          }
        }

        @media (max-width: 375px) {
          .ga-root {
            padding: 1rem;
          }

          .ga-title {
            font-size: 1.25rem;
          }

          .ga-guitar {
            max-height: 400px;
          }
        }
      `}</style>
    </div>
  );
}
