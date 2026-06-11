// =============================================================================
// TunerPractice — Interactive guitar tuner for the tuning-guitar article.
// Plays reference tones for each string and offers a pitch-matching challenge.
// =============================================================================
import { useState, useEffect, useRef } from 'react';
import type { Lang } from '../../i18n/utils';
import { ui } from '../../i18n/ui';
import { useReducedMotion } from './useReducedMotion';
import { playTone } from './audio.utils';
import { STRINGS } from './tunerPractice.data';

export default function TunerPractice({ lang }: { lang: Lang }) {
  const t = (k: keyof (typeof ui)['en']) => ui[lang][k] ?? ui.en[k];
  const reducedMotion = useReducedMotion();

  const [selectedString, setSelectedString] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [challengeMode, setChallengeMode] = useState(false);
  const [challengeOffset, setChallengeOffset] = useState(0); // cents off from correct
  const [userOffset, setUserOffset] = useState(0); // user's current adjustment

  const stopFnRef = useRef<(() => void) | null>(null);

  // Calculate frequency with cent offset: f * 2^(cents/1200)
  const getFrequency = (baseFreq: number, cents: number) => {
    return baseFreq * Math.pow(2, cents / 1200);
  };

  // Start a new challenge with random offset
  const startChallenge = (stringIndex: number) => {
    const offset = Math.random() > 0.5
      ? Math.floor(Math.random() * 26) + 5  // 5 to 30 cents sharp
      : -Math.floor(Math.random() * 26) - 5; // 5 to 30 cents flat
    setChallengeOffset(offset);
    setUserOffset(offset);
    setSelectedString(stringIndex);
  };

  // Play tone for selected string
  const playStringTone = (stringIndex: number, inChallenge = false) => {
    if (stopFnRef.current) {
      stopFnRef.current();
      stopFnRef.current = null;
    }

    const string = STRINGS[stringIndex];
    const offset = inChallenge ? userOffset : 0;
    const freq = getFrequency(string.frequency, offset);

    setIsPlaying(true);
    stopFnRef.current = playTone(freq, {
      duration: 2,
      type: 'sine',
      volume: 0.4,
    });

    setTimeout(() => {
      setIsPlaying(false);
      stopFnRef.current = null;
    }, 2000);
  };

  // Handle string selection
  const handleStringClick = (index: number) => {
    if (challengeMode) {
      startChallenge(index);
      playStringTone(index, true);
    } else {
      setSelectedString(index);
      playStringTone(index, false);
    }
  };

  // Adjust pitch in challenge mode
  const adjustPitch = (delta: number) => {
    if (!challengeMode || selectedString === null) return;
    const newOffset = Math.max(-50, Math.min(50, userOffset + delta));
    setUserOffset(newOffset);
    playStringTone(selectedString, true);
  };

  // Calculate tuner status
  const getTunerStatus = () => {
    const diff = Math.abs(userOffset);
    if (diff <= 5) return 'in-tune';
    if (userOffset > 0) return 'too-high';
    return 'too-low';
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // String selection: 1-6
      if (e.key >= '1' && e.key <= '6') {
        e.preventDefault();
        const index = 6 - parseInt(e.key); // reverse (1 = index 5, 6 = index 0)
        handleStringClick(index);
      }
      // Space: play reference
      else if (e.key === ' ' && selectedString !== null) {
        e.preventDefault();
        playStringTone(selectedString, challengeMode);
      }
      // C: toggle challenge
      else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        setChallengeMode(!challengeMode);
        setSelectedString(null);
        setUserOffset(0);
        setChallengeOffset(0);
      }
      // Arrow keys: adjust pitch
      else if (challengeMode && selectedString !== null) {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          adjustPitch(2);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          adjustPitch(-2);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedString, challengeMode, userOffset]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (stopFnRef.current) {
        stopFnRef.current();
      }
    };
  }, []);

  const tunerStatus = challengeMode && selectedString !== null ? getTunerStatus() : null;

  return (
    <div className="tp-root">
      <div className="tp-header">
        <h3 className="tp-title">{t('tunerPractice.title')}</h3>
        <p className="tp-instruction">
          {challengeMode ? t('tunerPractice.challenge') : t('tunerPractice.instruction')}
        </p>
      </div>

      <div className="tp-mode-toggle">
        <button
          onClick={() => {
            setChallengeMode(!challengeMode);
            setSelectedString(null);
            setUserOffset(0);
            setChallengeOffset(0);
          }}
          className={challengeMode ? 'active' : ''}
          aria-pressed={challengeMode}
          aria-label={
            challengeMode
              ? lang === 'en'
                ? 'Exit challenge mode'
                : 'Вийти з режиму виклику'
              : lang === 'en'
                ? 'Enter challenge mode'
                : 'Увімкнути режим виклику'
          }
        >
          {t('tunerPractice.challenge')}
        </button>
      </div>

      <div className="tp-strings">
        {STRINGS.map((string, index) => (
          <button
            key={string.number}
            className={`tp-string ${selectedString === index ? 'selected' : ''} ${
              isPlaying && selectedString === index ? 'playing' : ''
            }`}
            onClick={() => handleStringClick(index)}
            aria-label={`${string.label[lang]}, ${string.frequency.toFixed(2)} ${t('tunerPractice.frequency')}`}
          >
            <span className="tp-string-label">{string.label[lang]}</span>
            <span className="tp-string-freq">
              {string.frequency.toFixed(2)} {t('tunerPractice.frequency')}
            </span>
            {isPlaying && selectedString === index && !reducedMotion && (
              <span className="tp-string-wave" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </span>
            )}
            {isPlaying && selectedString === index && reducedMotion && (
              <span className="tp-string-indicator" aria-hidden="true">
                ♪
              </span>
            )}
          </button>
        ))}
      </div>

      {challengeMode && selectedString !== null && (
        <div className="tp-tuner">
          <div className="tp-tuner-meter" aria-label={lang === 'en' ? 'Tuner meter' : 'Метр тюнера'}>
            <div className="tp-meter-scale">
              <span className="tp-meter-mark left">{t('tunerPractice.tooLow')}</span>
              <span className="tp-meter-mark center">{t('tunerPractice.inTune')}</span>
              <span className="tp-meter-mark right">{t('tunerPractice.tooHigh')}</span>
            </div>
            <div className="tp-meter-bar">
              <div className="tp-meter-track">
                <div
                  className={`tp-meter-needle ${tunerStatus}`}
                  style={{
                    left: `${50 + (userOffset / 50) * 50}%`,
                    transition: reducedMotion ? 'none' : 'left 0.2s ease-out',
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <div className="tp-tuner-status">
            {tunerStatus === 'in-tune' && (
              <div className="tp-status-message success" role="status">
                {t('tunerPractice.inTune')}
              </div>
            )}
            {tunerStatus === 'too-low' && (
              <div className="tp-status-message low" role="status">
                {t('tunerPractice.tooLow')}
              </div>
            )}
            {tunerStatus === 'too-high' && (
              <div className="tp-status-message high" role="status">
                {t('tunerPractice.tooHigh')}
              </div>
            )}
          </div>

          <div className="tp-tuner-controls">
            <button
              onClick={() => adjustPitch(-2)}
              aria-label={t('tunerPractice.lower')}
              className="tp-adjust-btn"
            >
              ↓ {t('tunerPractice.lower')}
            </button>
            <button
              onClick={() => adjustPitch(2)}
              aria-label={t('tunerPractice.higher')}
              className="tp-adjust-btn"
            >
              ↑ {t('tunerPractice.higher')}
            </button>
          </div>
        </div>
      )}

      <style>{`
        .tp-root {
          font-family: inherit;
          max-width: 600px;
          margin: 0 auto;
          padding: 1.5rem;
        }

        .tp-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .tp-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: var(--accent);
        }

        .tp-instruction {
          font-size: 0.95rem;
          color: var(--text-secondary, #666);
          margin: 0;
        }

        .tp-mode-toggle {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .tp-mode-toggle button {
          padding: 0.5rem 1.25rem;
          border: 2px solid var(--accent);
          background: transparent;
          color: var(--accent);
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tp-mode-toggle button:hover {
          background: var(--accent-soft);
        }

        .tp-mode-toggle button.active {
          background: var(--accent);
          color: white;
        }

        .tp-strings {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .tp-string {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          border: 2px solid var(--border, #ddd);
          border-radius: 8px;
          background: var(--bg-secondary, #f9f9f9);
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1rem;
          text-align: left;
          width: 100%;
        }

        .tp-string:hover {
          border-color: var(--accent);
          background: var(--accent-soft);
        }

        .tp-string.selected {
          border-color: var(--accent);
          background: var(--accent-soft);
          box-shadow: 0 0 0 3px var(--accent-soft);
        }

        .tp-string.playing {
          animation: pulse 0.5s ease-in-out infinite alternate;
        }

        @keyframes pulse {
          from { transform: scale(1); }
          to { transform: scale(1.02); }
        }

        @media (prefers-reduced-motion: reduce) {
          .tp-string.playing {
            animation: none;
            border-color: var(--accent-2);
          }
        }

        .tp-string-label {
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--text-primary, #111);
        }

        .tp-string-freq {
          font-size: 0.9rem;
          color: var(--text-secondary, #666);
          font-variant-numeric: tabular-nums;
        }

        .tp-string-wave {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          gap: 4px;
          pointer-events: none;
        }

        .tp-string-wave span {
          width: 3px;
          height: 20px;
          background: var(--accent);
          border-radius: 2px;
          animation: wave 0.6s ease-in-out infinite;
        }

        .tp-string-wave span:nth-child(2) {
          animation-delay: 0.1s;
        }

        .tp-string-wave span:nth-child(3) {
          animation-delay: 0.2s;
        }

        @keyframes wave {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }

        .tp-string-indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.5rem;
          pointer-events: none;
          color: var(--accent);
        }

        .tp-tuner {
          margin-top: 2rem;
          padding: 1.5rem;
          border: 2px solid var(--accent);
          border-radius: 12px;
          background: var(--bg-secondary, #f9f9f9);
        }

        .tp-tuner-meter {
          margin-bottom: 1.5rem;
        }

        .tp-meter-scale {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-secondary, #666);
        }

        .tp-meter-mark {
          flex: 1;
          text-align: center;
        }

        .tp-meter-mark.left {
          text-align: left;
        }

        .tp-meter-mark.right {
          text-align: right;
        }

        .tp-meter-bar {
          width: 100%;
          height: 40px;
          position: relative;
        }

        .tp-meter-track {
          width: 100%;
          height: 12px;
          background: linear-gradient(
            to right,
            #f87171 0%,
            #fbbf24 40%,
            #34d399 48%,
            #34d399 52%,
            #fbbf24 60%,
            #f87171 100%
          );
          border-radius: 6px;
          position: relative;
          margin-top: 14px;
        }

        .tp-meter-needle {
          position: absolute;
          top: -14px;
          width: 4px;
          height: 40px;
          background: #111;
          border-radius: 2px;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .tp-meter-needle::after {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 8px solid #111;
        }

        .tp-tuner-status {
          text-align: center;
          margin-bottom: 1rem;
          min-height: 2rem;
        }

        .tp-status-message {
          font-weight: 700;
          font-size: 1.1rem;
          padding: 0.5rem;
          border-radius: 6px;
        }

        .tp-status-message.success {
          color: #059669;
          background: #d1fae5;
        }

        .tp-status-message.low {
          color: #b91c1c;
        }

        .tp-status-message.high {
          color: #b91c1c;
        }

        .tp-tuner-controls {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .tp-adjust-btn {
          padding: 0.75rem 1.5rem;
          border: 2px solid var(--accent);
          background: white;
          color: var(--accent);
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tp-adjust-btn:hover {
          background: var(--accent);
          color: white;
        }

        .tp-adjust-btn:active {
          transform: scale(0.98);
        }

        @media (max-width: 375px) {
          .tp-root {
            padding: 1rem;
          }

          .tp-string {
            padding: 0.875rem 1rem;
            flex-direction: column;
            gap: 0.25rem;
            align-items: flex-start;
          }

          .tp-string-label {
            font-size: 1rem;
          }

          .tp-string-freq {
            font-size: 0.85rem;
          }

          .tp-tuner {
            padding: 1rem;
          }

          .tp-tuner-controls {
            flex-direction: column;
          }

          .tp-adjust-btn {
            width: 100%;
          }

          .tp-meter-scale {
            font-size: 0.75rem;
          }
        }

        @media (prefers-color-scheme: dark) {
          .tp-string {
            background: var(--bg-secondary, #1a1a1a);
            border-color: var(--border, #444);
          }

          .tp-string:hover {
            background: var(--accent-soft);
          }

          .tp-tuner {
            background: var(--bg-secondary, #1a1a1a);
          }

          .tp-adjust-btn {
            background: var(--bg-primary, #0a0a0a);
            color: var(--accent);
          }

          .tp-adjust-btn:hover {
            background: var(--accent);
            color: white;
          }

          .tp-status-message.success {
            color: #34d399;
            background: #064e3b;
          }

          .tp-status-message.low,
          .tp-status-message.high {
            color: #f87171;
          }
        }
      `}</style>
    </div>
  );
}
