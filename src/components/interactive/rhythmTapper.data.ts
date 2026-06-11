// =============================================================================
// Data for RhythmTapper interactive (what-is-rhythm article).
// Three preset rhythm patterns for the 8-beat grid.
// =============================================================================

export const PRESETS: {
  id: string;
  label: { en: string; uk: string };
  pattern: boolean[];
}[] = [
  {
    id: 'onbeat',
    label: { en: 'On the beat', uk: 'На долю' },
    pattern: [true, false, true, false, true, false, true, false],
  },
  {
    id: 'syncopated',
    label: { en: 'Syncopated', uk: 'Синкопований' },
    pattern: [true, false, false, true, false, true, false, false],
  },
  {
    id: 'offbeat',
    label: { en: 'Off the beat', uk: 'Поза долею' },
    pattern: [false, true, false, true, false, true, false, true],
  },
];
