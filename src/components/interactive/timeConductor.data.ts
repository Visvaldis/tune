// =============================================================================
// Data for TimeConductor interactive (time-signatures article).
// Each time signature includes its beats, accent pattern, and localized feel.
// =============================================================================

export interface TimeSignature {
  id: string;
  label: string;
  beats: number;
  accents: ('strong' | 'medium' | 'weak')[];
  feel: { en: string; uk: string };
}

export const TIME_SIGNATURES: TimeSignature[] = [
  {
    id: '2/4',
    label: '2/4',
    beats: 2,
    accents: ['strong', 'weak'],
    feel: { en: 'March: ONE-two', uk: 'Марш: РАЗ-два' },
  },
  {
    id: '3/4',
    label: '3/4',
    beats: 3,
    accents: ['strong', 'weak', 'weak'],
    feel: { en: 'Waltz: ONE-two-three', uk: 'Вальс: РАЗ-два-три' },
  },
  {
    id: '4/4',
    label: '4/4',
    beats: 4,
    accents: ['strong', 'weak', 'medium', 'weak'],
    feel: { en: 'Common time: ONE-two-THREE-four', uk: 'Простий: РАЗ-два-ТРИ-чотири' },
  },
  {
    id: '6/8',
    label: '6/8',
    beats: 6,
    accents: ['strong', 'weak', 'weak', 'medium', 'weak', 'weak'],
    feel: { en: 'Sway: ONE-two-three-FOUR-five-six', uk: 'Гойдання: РАЗ-два-три-ЧОТИРИ-п\'ять-шість' },
  },
];
