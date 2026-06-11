// =============================================================================
// Chord data for ChordExplorer interactive.
// Each chord includes finger positions, string states, and audio notes.
// All data traced to content/en/basic-chords.md and content/uk/basic-chords.md
// =============================================================================

export interface ChordData {
  id: string;
  name: { en: string; uk: string };
  /** String states from low E to high E: fret number, 'x' (muted), or 0 (open) */
  strings: (number | 'x' | 0)[];
  /** Finger numbers for each string (0 = no finger, 1-4 = finger number) */
  fingers: (0 | 1 | 2 | 3 | 4)[];
  /** Audio notes to play (low E to high E, null for muted strings) */
  notes: (string | null)[];
  /** Full chord name for display */
  fullName: { en: string; uk: string };
}

export const CHORDS: ChordData[] = [
  {
    id: 'Em',
    name: { en: 'Em', uk: 'Em' },
    fullName: { en: 'E minor', uk: 'E мінор' },
    strings: [0, 2, 2, 0, 0, 0],
    fingers: [0, 2, 3, 0, 0, 0],
    notes: ['E2', 'B2', 'E3', 'G3', 'B3', 'E4'],
  },
  {
    id: 'Am',
    name: { en: 'Am', uk: 'Am' },
    fullName: { en: 'A minor', uk: 'A мінор' },
    strings: ['x', 0, 2, 2, 1, 0],
    fingers: [0, 0, 2, 3, 1, 0],
    notes: [null, 'A2', 'E3', 'A3', 'C4', 'E4'],
  },
  {
    id: 'C',
    name: { en: 'C', uk: 'C' },
    fullName: { en: 'C major', uk: 'C мажор' },
    strings: ['x', 3, 2, 0, 1, 0],
    fingers: [0, 3, 2, 0, 1, 0],
    notes: [null, 'C3', 'E3', 'G3', 'C4', 'E4'],
  },
  {
    id: 'G',
    name: { en: 'G', uk: 'G' },
    fullName: { en: 'G major', uk: 'G мажор' },
    strings: [3, 2, 0, 0, 0, 3],
    fingers: [2, 1, 0, 0, 0, 3],
    notes: ['G2', 'B2', 'D3', 'G3', 'B3', 'G4'],
  },
  {
    id: 'D',
    name: { en: 'D', uk: 'D' },
    fullName: { en: 'D major', uk: 'D мажор' },
    strings: ['x', 'x', 0, 2, 3, 2],
    fingers: [0, 0, 0, 1, 3, 2],
    notes: [null, null, 'D3', 'A3', 'D4', 'F#4'],
  },
  {
    id: 'E',
    name: { en: 'E', uk: 'E' },
    fullName: { en: 'E major', uk: 'E мажор' },
    strings: [0, 2, 2, 1, 0, 0],
    fingers: [0, 2, 3, 1, 0, 0],
    notes: ['E2', 'B2', 'E3', 'G#3', 'B3', 'E4'],
  },
  {
    id: 'A',
    name: { en: 'A', uk: 'A' },
    fullName: { en: 'A major', uk: 'A мажор' },
    strings: ['x', 0, 2, 2, 2, 0],
    fingers: [0, 0, 1, 2, 3, 0],
    notes: [null, 'A2', 'E3', 'A3', 'C#4', 'E4'],
  },
];

/** String names from low to high */
export const STRING_NAMES = ['E', 'A', 'D', 'G', 'B', 'E'] as const;
