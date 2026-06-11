// =============================================================================
// Data for IntervalTrainer interactive component.
// Every interval includes: semitone count, names in both languages, and a
// reference song that starts with that interval (ascending).
// All facts sourced from the intervals article.
// =============================================================================

export interface Interval {
  id: string;
  semitones: number;
  shortName: string; // e.g., "m2", "M3", "P5"
  name: {
    en: string;
    uk: string;
  };
  referenceSong: {
    en: string;
    uk: string;
  };
}

export const INTERVALS: Interval[] = [
  {
    id: 'm2',
    semitones: 1,
    shortName: 'm2',
    name: {
      en: 'Minor 2nd',
      uk: 'Мала секунда',
    },
    referenceSong: {
      en: 'Jaws theme',
      uk: 'Тема з "Щелеп"',
    },
  },
  {
    id: 'M2',
    semitones: 2,
    shortName: 'M2',
    name: {
      en: 'Major 2nd',
      uk: 'Велика секунда',
    },
    referenceSong: {
      en: 'Happy Birthday',
      uk: 'Happy Birthday',
    },
  },
  {
    id: 'm3',
    semitones: 3,
    shortName: 'm3',
    name: {
      en: 'Minor 3rd',
      uk: 'Мала терція',
    },
    referenceSong: {
      en: 'Greensleeves',
      uk: 'Greensleeves',
    },
  },
  {
    id: 'M3',
    semitones: 4,
    shortName: 'M3',
    name: {
      en: 'Major 3rd',
      uk: 'Велика терція',
    },
    referenceSong: {
      en: 'When the Saints Go Marching In',
      uk: 'When the Saints Go Marching In',
    },
  },
  {
    id: 'P4',
    semitones: 5,
    shortName: 'P4',
    name: {
      en: 'Perfect 4th',
      uk: 'Чиста кварта',
    },
    referenceSong: {
      en: 'Here Comes the Bride',
      uk: 'Here Comes the Bride',
    },
  },
  {
    id: 'P5',
    semitones: 7,
    shortName: 'P5',
    name: {
      en: 'Perfect 5th',
      uk: 'Чиста квінта',
    },
    referenceSong: {
      en: 'Star Wars (main theme)',
      uk: 'Зоряні війни (головна тема)',
    },
  },
  {
    id: 'P8',
    semitones: 12,
    shortName: 'P8',
    name: {
      en: 'Octave',
      uk: 'Октава',
    },
    referenceSong: {
      en: 'Somewhere Over the Rainbow',
      uk: 'Somewhere Over the Rainbow',
    },
  },
];

// Helper to get interval by semitone count
export function getIntervalBySemitones(semitones: number): Interval | undefined {
  return INTERVALS.find((i) => i.semitones === semitones);
}

// Helper to get interval by ID
export function getIntervalById(id: string): Interval | undefined {
  return INTERVALS.find((i) => i.id === id);
}

// All root notes used for quiz generation (C3-C5 range)
export const ROOT_NOTES = [
  'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
  'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
  'C5',
];
