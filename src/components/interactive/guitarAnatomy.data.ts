// =============================================================================
// Bilingual content data for GuitarAnatomy interactive.
// Every fact here must trace to content/*/anatomy-of-guitar.md.
// =============================================================================

export interface GuitarPart {
  id: string;
  label: { en: string; uk: string };
  desc: { en: string; uk: string };
}

export const GUITAR_PARTS: GuitarPart[] = [
  {
    id: 'body',
    label: { en: 'Body', uk: 'Корпус' },
    desc: {
      en: 'The body amplifies the vibration of the strings and projects sound.',
      uk: 'Корпус підсилює вібрацію струн і проєктує звук.',
    },
  },
  {
    id: 'soundHole',
    label: { en: 'Sound Hole', uk: 'Резонаторний отвір' },
    desc: {
      en: 'The opening in the soundboard that lets the sound project outward.',
      uk: 'Отвір у деці, через який звук виходить назовні.',
    },
  },
  {
    id: 'bridge',
    label: { en: 'Bridge', uk: 'Бридж (підставка)' },
    desc: {
      en: 'Anchors the strings to the body and transfers vibration to the soundboard.',
      uk: 'Кріпить струни до корпусу й передає вібрацію на деку.',
    },
  },
  {
    id: 'saddle',
    label: { en: 'Saddle', uk: 'Сідло (поріжок)' },
    desc: {
      en: 'A thin strip on the bridge that sets the string height and transfers energy to the top.',
      uk: 'Тонка смужка на бриджі, що задає висоту струн і передає енергію на верхню деку.',
    },
  },
  {
    id: 'neck',
    label: { en: 'Neck', uk: 'Гриф' },
    desc: {
      en: 'The long piece you grip; it holds the fretboard and connects to the body.',
      uk: 'Довга частина, яку ти тримаєш; несе на собі накладку й з\'єднується з корпусом.',
    },
  },
  {
    id: 'fretboard',
    label: { en: 'Fretboard', uk: 'Накладка грифа' },
    desc: {
      en: 'The flat surface on the front of the neck where you press the strings.',
      uk: 'Плоска поверхня на передній частині грифа, де ти притискаєш струни.',
    },
  },
  {
    id: 'frets',
    label: { en: 'Frets', uk: 'Лади' },
    desc: {
      en: 'Metal strips across the fretboard that divide it into semitone intervals.',
      uk: 'Металеві смужки поперек накладки, що ділять її на півтонові інтервали.',
    },
  },
  {
    id: 'headstock',
    label: { en: 'Headstock', uk: 'Голова грифа' },
    desc: {
      en: 'The wide end at the top of the neck that holds the tuning pegs.',
      uk: 'Широка частина на верхньому кінці грифа, де розміщені кілки.',
    },
  },
  {
    id: 'tuningPegs',
    label: { en: 'Tuning Pegs', uk: 'Кілки' },
    desc: {
      en: 'Mechanical gears you turn to tighten or loosen each string, changing its pitch.',
      uk: 'Механізми, які ти крутиш, щоб натягти або послабити струну й змінити висоту звуку.',
    },
  },
  {
    id: 'nut',
    label: { en: 'Nut', uk: 'Верхній поріжок' },
    desc: {
      en: 'A grooved strip at the top of the fretboard that spaces the strings and sets their height.',
      uk: 'Смужка з пазами на верху накладки, яка розміщує струни й задає їхню висоту.',
    },
  },
  {
    id: 'strings',
    label: { en: 'Strings', uk: 'Струни' },
    desc: {
      en: 'Six strings tuned E-A-D-G-B-E from lowest to highest pitch.',
      uk: 'Шість струн, налаштованих E-A-D-G-B-E від найнижчої до найвищої висоти.',
    },
  },
];
