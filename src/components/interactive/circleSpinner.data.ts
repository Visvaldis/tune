// =============================================================================
// Data for CircleSpinner — Circle of Fifths interactive
// =============================================================================

export interface CircleKey {
  major: string;
  minor: string;
  accidentals: number;
  accidentalType: '♯' | '♭' | null;
  accidentalNotes: string;
  triad: string[]; // notes for tonic triad to play
}

/**
 * All 12 keys arranged clockwise starting from C at index 0 (12 o'clock).
 * Each step moves clockwise by a perfect fifth (7 semitones).
 * C(0) → G(1) → D(2) → A(3) → E(4) → B(5) → F♯/G♭(6) → D♭(7) → A♭(8) → E♭(9) → B♭(10) → F(11) → C
 */
export const CIRCLE_KEYS: CircleKey[] = [
  {
    major: 'C',
    minor: 'Am',
    accidentals: 0,
    accidentalType: null,
    accidentalNotes: '',
    triad: ['C4', 'E4', 'G4'],
  },
  {
    major: 'G',
    minor: 'Em',
    accidentals: 1,
    accidentalType: '♯',
    accidentalNotes: 'F♯',
    triad: ['G3', 'B3', 'D4'],
  },
  {
    major: 'D',
    minor: 'Bm',
    accidentals: 2,
    accidentalType: '♯',
    accidentalNotes: 'F♯ C♯',
    triad: ['D4', 'F#4', 'A4'],
  },
  {
    major: 'A',
    minor: 'F♯m',
    accidentals: 3,
    accidentalType: '♯',
    accidentalNotes: 'F♯ C♯ G♯',
    triad: ['A3', 'C#4', 'E4'],
  },
  {
    major: 'E',
    minor: 'C♯m',
    accidentals: 4,
    accidentalType: '♯',
    accidentalNotes: 'F♯ C♯ G♯ D♯',
    triad: ['E4', 'G#4', 'B4'],
  },
  {
    major: 'B',
    minor: 'G♯m',
    accidentals: 5,
    accidentalType: '♯',
    accidentalNotes: 'F♯ C♯ G♯ D♯ A♯',
    triad: ['B3', 'D#4', 'F#4'],
  },
  {
    major: 'F♯/G♭',
    minor: 'D♯m/E♭m',
    accidentals: 6,
    accidentalType: '♯',
    accidentalNotes: 'F♯ C♯ G♯ D♯ A♯ E♯',
    triad: ['F#4', 'A#4', 'C#5'],
  },
  {
    major: 'D♭',
    minor: 'B♭m',
    accidentals: 5,
    accidentalType: '♭',
    accidentalNotes: 'B♭ E♭ A♭ D♭ G♭',
    triad: ['Db4', 'F4', 'Ab4'],
  },
  {
    major: 'A♭',
    minor: 'Fm',
    accidentals: 4,
    accidentalType: '♭',
    accidentalNotes: 'B♭ E♭ A♭ D♭',
    triad: ['Ab3', 'C4', 'Eb4'],
  },
  {
    major: 'E♭',
    minor: 'Cm',
    accidentals: 3,
    accidentalType: '♭',
    accidentalNotes: 'B♭ E♭ A♭',
    triad: ['Eb4', 'G4', 'Bb4'],
  },
  {
    major: 'B♭',
    minor: 'Gm',
    accidentals: 2,
    accidentalType: '♭',
    accidentalNotes: 'B♭ E♭',
    triad: ['Bb3', 'D4', 'F4'],
  },
  {
    major: 'F',
    minor: 'Dm',
    accidentals: 1,
    accidentalType: '♭',
    accidentalNotes: 'B♭',
    triad: ['F4', 'A4', 'C5'],
  },
];
