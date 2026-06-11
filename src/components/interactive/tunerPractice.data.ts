// =============================================================================
// Data for TunerPractice interactive — standard guitar string tuning.
// All frequencies traced to article content (equal temperament, A4 = 440 Hz).
// =============================================================================

export const STRINGS: {
  number: number;
  note: string;
  octave: number;
  frequency: number;
  label: { en: string; uk: string };
}[] = [
  {
    number: 6,
    note: 'E',
    octave: 2,
    frequency: 82.41,
    label: { en: '6th — E', uk: '6-та — E (мі)' },
  },
  {
    number: 5,
    note: 'A',
    octave: 2,
    frequency: 110.0,
    label: { en: '5th — A', uk: '5-та — A (ля)' },
  },
  {
    number: 4,
    note: 'D',
    octave: 3,
    frequency: 146.83,
    label: { en: '4th — D', uk: '4-та — D (ре)' },
  },
  {
    number: 3,
    note: 'G',
    octave: 3,
    frequency: 196.0,
    label: { en: '3rd — G', uk: '3-тя — G (соль)' },
  },
  {
    number: 2,
    note: 'B',
    octave: 3,
    frequency: 246.94,
    label: { en: '2nd — B', uk: '2-га — B (сі)' },
  },
  {
    number: 1,
    note: 'E',
    octave: 4,
    frequency: 329.63,
    label: { en: '1st — E', uk: '1-ша — E (мі)' },
  },
];
