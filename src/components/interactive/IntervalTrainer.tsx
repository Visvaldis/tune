// =============================================================================
// IntervalTrainer — interactive ear training component for the intervals article.
// Two modes:
//   - Quiz: Listen to two notes and identify the interval (ear training)
//   - Practice: Select an interval to hear it with reference song info
// All intervals are ascending. Audio via audio.utils.ts.
// =============================================================================
import { useState, useEffect } from 'react';
import type { Lang } from '../../i18n/utils';
import { ui } from '../../i18n/ui';
import { playNote, playSequence } from './audio.utils';
import { INTERVALS, ROOT_NOTES, getIntervalById } from './intervalTrainer.data';
import type { Interval } from './intervalTrainer.data';

export default function IntervalTrainer({ lang }: { lang: Lang }) {
  const t = (k: keyof (typeof ui)['en']) => ui[lang][k] ?? ui.en[k];

  // Mode toggle
  type Mode = 'quiz' | 'practice';
  const [mode, setMode] = useState<Mode>('quiz');

  // Quiz state
  const [currentRoot, setCurrentRoot] = useState<string>('');
  const [currentInterval, setCurrentInterval] = useState<Interval | null>(null);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [hasPlayed, setHasPlayed] = useState(false);

  // Practice state
  const [selectedInterval, setSelectedInterval] = useState<Interval>(INTERVALS[0]);

  // Generate a new quiz question
  const generateQuestion = () => {
    const rootIndex = Math.floor(Math.random() * ROOT_NOTES.length);
    const root = ROOT_NOTES[rootIndex];
    const interval = INTERVALS[Math.floor(Math.random() * INTERVALS.length)];

    setCurrentRoot(root);
    setCurrentInterval(interval);
    setUserAnswer(null);
    setIsCorrect(null);
    setHasPlayed(false);
  };

  // Initialize with first question
  useEffect(() => {
    generateQuestion();
  }, []);

  // Calculate the second note based on root and interval
  const getSecondNote = (root: string, interval: Interval): string => {
    const match = root.match(/^([A-G]#?)(\d)$/);
    if (!match) return root;

    const [, note, octaveStr] = match;
    const octave = parseInt(octaveStr, 10);

    // Simple semitone mapping (simplified for this use case)
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    let noteIndex = notes.indexOf(note);
    if (noteIndex === -1) noteIndex = 0;

    let targetIndex = noteIndex + interval.semitones;
    let targetOctave = octave;

    while (targetIndex >= 12) {
      targetIndex -= 12;
      targetOctave += 1;
    }

    return `${notes[targetIndex]}${targetOctave}`;
  };

  // Play the current interval
  const playCurrentInterval = () => {
    if (mode === 'quiz' && currentRoot && currentInterval) {
      const secondNote = getSecondNote(currentRoot, currentInterval);
      playSequence([currentRoot, secondNote], { duration: 0.8, gap: 0.5 });
      setHasPlayed(true);
    } else if (mode === 'practice') {
      const root = 'C4';
      const secondNote = getSecondNote(root, selectedInterval);
      playSequence([root, secondNote], { duration: 0.8, gap: 0.5 });
    }
  };

  // Handle answer selection
  const handleAnswer = (intervalId: string) => {
    if (userAnswer !== null) return; // Already answered

    setUserAnswer(intervalId);
    const correct = intervalId === currentInterval?.id;
    setIsCorrect(correct);
    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  // Handle next question
  const handleNext = () => {
    generateQuestion();
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === ' ') {
        e.preventDefault();
        playCurrentInterval();
      } else if (e.key === 'n' && mode === 'quiz' && userAnswer !== null) {
        e.preventDefault();
        handleNext();
      } else if (mode === 'quiz' && userAnswer === null) {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= INTERVALS.length) {
          handleAnswer(INTERVALS[num - 1].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, userAnswer, currentInterval]);

  return (
    <div className="interval-trainer-root">
      {/* Mode toggle */}
      <div className="mode-toggle" role="tablist" aria-label={t('intervalTrainer.title')}>
        <button
          role="tab"
          aria-selected={mode === 'quiz'}
          onClick={() => setMode('quiz')}
          className={mode === 'quiz' ? 'active' : ''}
        >
          {t('intervalTrainer.quiz')}
        </button>
        <button
          role="tab"
          aria-selected={mode === 'practice'}
          onClick={() => setMode('practice')}
          className={mode === 'practice' ? 'active' : ''}
        >
          {t('intervalTrainer.practice')}
        </button>
      </div>

      {/* Quiz mode */}
      {mode === 'quiz' && (
        <div className="quiz-mode">
          <div className="play-section">
            <button
              className="play-button"
              onClick={playCurrentInterval}
              aria-label={t('intervalTrainer.play')}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>{t('intervalTrainer.play')}</span>
            </button>
            {!hasPlayed && (
              <p className="hint">{lang === 'en' ? 'Press Play or Space to hear the interval' : 'Натисни Play або Пробіл, щоб почути інтервал'}</p>
            )}
          </div>

          <div className="answers">
            {INTERVALS.map((interval, index) => (
              <button
                key={interval.id}
                onClick={() => handleAnswer(interval.id)}
                disabled={userAnswer !== null}
                className={`answer-button ${
                  userAnswer === interval.id
                    ? isCorrect
                      ? 'correct'
                      : 'incorrect'
                    : userAnswer !== null && interval.id === currentInterval?.id
                    ? 'correct-answer'
                    : ''
                }`}
                aria-label={`${index + 1}. ${interval.name[lang]}`}
              >
                <span className="shorthand">{interval.shortName}</span>
                <span className="full-name">{interval.name[lang]}</span>
              </button>
            ))}
          </div>

          {userAnswer !== null && (
            <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? (
                <p>{t('intervalTrainer.correct')}</p>
              ) : (
                <p>
                  {t('intervalTrainer.incorrect')} <strong>{currentInterval?.name[lang]}</strong>
                </p>
              )}
            </div>
          )}

          <div className="quiz-controls">
            <div className="score">
              {t('intervalTrainer.score')} <strong>{score.correct} / {score.total}</strong>
            </div>
            <button
              className="next-button"
              onClick={handleNext}
              disabled={userAnswer === null}
              aria-label={t('intervalTrainer.next')}
            >
              {t('intervalTrainer.next')}
            </button>
          </div>
        </div>
      )}

      {/* Practice mode */}
      {mode === 'practice' && (
        <div className="practice-mode">
          <div className="interval-selector">
            <label htmlFor="interval-select">
              {lang === 'en' ? 'Select interval:' : 'Обери інтервал:'}
            </label>
            <select
              id="interval-select"
              value={selectedInterval.id}
              onChange={(e) => {
                const interval = getIntervalById(e.target.value);
                if (interval) setSelectedInterval(interval);
              }}
            >
              {INTERVALS.map((interval) => (
                <option key={interval.id} value={interval.id}>
                  {interval.name[lang]} ({interval.shortName})
                </option>
              ))}
            </select>
          </div>

          <div className="play-section">
            <button
              className="play-button"
              onClick={playCurrentInterval}
              aria-label={t('intervalTrainer.play')}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>{t('intervalTrainer.play')}</span>
            </button>
          </div>

          <div className="interval-info">
            <div className="info-item">
              <span className="label">{lang === 'en' ? 'Semitones:' : 'Півтонів:'}</span>
              <span className="value">{selectedInterval.semitones}</span>
            </div>
            <div className="info-item">
              <span className="label">{t('intervalTrainer.reference')}</span>
              <span className="value">{selectedInterval.referenceSong[lang]}</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .interval-trainer-root {
          padding: 2rem;
          background: var(--bg-soft);
          border-radius: 0.75rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .mode-toggle {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          border-bottom: 2px solid var(--border);
        }

        .mode-toggle button {
          flex: 1;
          padding: 0.75rem 1rem;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          color: var(--fg-muted);
          transition: all 0.2s;
          margin-bottom: -2px;
        }

        .mode-toggle button:hover {
          color: var(--fg);
        }

        .mode-toggle button.active {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }

        .play-section {
          text-align: center;
          margin-bottom: 2rem;
        }

        .play-button {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
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

        .play-button:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px var(--accent-soft);
        }

        .play-button:active {
          transform: scale(0.98);
        }

        .hint {
          margin-top: 1rem;
          font-size: 0.875rem;
          color: var(--fg-muted);
        }

        .answers {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .answer-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 1rem 0.75rem;
          background: var(--bg);
          border: 2px solid var(--border);
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
        }

        .answer-button:not(:disabled):hover {
          border-color: var(--accent);
          background: var(--accent-soft);
        }

        .answer-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .answer-button .shorthand {
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--accent);
        }

        .answer-button .full-name {
          font-size: 0.875rem;
          color: var(--fg-muted);
        }

        .answer-button.correct {
          background: #10b981;
          border-color: #059669;
          color: white;
        }

        .answer-button.correct .shorthand,
        .answer-button.correct .full-name {
          color: white;
        }

        .answer-button.incorrect {
          background: #ef4444;
          border-color: #dc2626;
          color: white;
        }

        .answer-button.incorrect .shorthand,
        .answer-button.incorrect .full-name {
          color: white;
        }

        .answer-button.correct-answer {
          background: #10b981;
          border-color: #059669;
          color: white;
          animation: pulse 0.5s ease-in-out;
        }

        .answer-button.correct-answer .shorthand,
        .answer-button.correct-answer .full-name {
          color: white;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .feedback {
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
          text-align: center;
        }

        .feedback.correct {
          background: #d1fae5;
          color: #065f46;
        }

        .feedback.incorrect {
          background: #fee2e2;
          color: #991b1b;
        }

        .quiz-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 2px solid var(--border);
        }

        .score {
          font-size: 1rem;
          color: var(--fg-muted);
        }

        .score strong {
          color: var(--accent);
          font-size: 1.25rem;
        }

        .next-button {
          padding: 0.75rem 1.5rem;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .next-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px var(--accent-soft);
        }

        .next-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Practice mode */
        .interval-selector {
          margin-bottom: 2rem;
        }

        .interval-selector label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--fg);
        }

        .interval-selector select {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          background: var(--bg);
          color: var(--fg);
          border: 2px solid var(--border);
          border-radius: 0.5rem;
          cursor: pointer;
        }

        .interval-selector select:focus {
          outline: none;
          border-color: var(--accent);
        }

        .interval-info {
          margin-top: 2rem;
          padding: 1.5rem;
          background: var(--bg);
          border-radius: 0.5rem;
          border: 2px solid var(--border);
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--border);
        }

        .info-item:last-child {
          border-bottom: none;
        }

        .info-item .label {
          font-weight: 600;
          color: var(--fg-muted);
        }

        .info-item .value {
          font-weight: 600;
          color: var(--accent);
          text-align: right;
        }

        /* Mobile (375px) */
        @media (max-width: 640px) {
          .interval-trainer-root {
            padding: 1.5rem;
          }

          .answers {
            grid-template-columns: repeat(2, 1fr);
          }

          .answer-button {
            padding: 0.75rem 0.5rem;
          }

          .quiz-controls {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .next-button {
            width: 100%;
          }
        }

        @media (max-width: 375px) {
          .play-button {
            padding: 0.875rem 1.5rem;
            font-size: 1rem;
          }

          .answer-button .shorthand {
            font-size: 1.125rem;
          }

          .answer-button .full-name {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
