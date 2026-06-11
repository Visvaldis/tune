// =============================================================================
// Staff position data for StaffExplorer interactive.
// Maps index to note name, position type, and descriptions.
// Range: C4 (ledger below) through G5 (ledger above), covering standard treble clef.
// =============================================================================

export interface StaffPosition {
  note: string;        // e.g., 'E4', 'F4', 'G4'
  type: 'line' | 'space' | 'ledger';
  y: number;           // Y-coordinate offset (multiplied by step in SVG)
  label: {
    en: string;        // e.g., "E4 (bottom line)"
    uk: string;
  };
}

// Staff positions from bottom to top.
// Y-coordinates: higher index = higher pitch, lower Y position on screen (SVG coords).
// Step size is 10px, so each position is 10px apart.
export const STAFF_POSITIONS: StaffPosition[] = [
  // Ledger lines below staff
  {
    note: 'C4',
    type: 'ledger',
    y: 13,
    label: { en: 'C4 (ledger line)', uk: 'C4 (додаткова лінія)' },
  },
  {
    note: 'D4',
    type: 'ledger',
    y: 12,
    label: { en: 'D4 (ledger space)', uk: 'D4 (додатковий проміжок)' },
  },
  // Staff lines and spaces (bottom to top)
  {
    note: 'E4',
    type: 'line',
    y: 11,
    label: { en: 'E4 (bottom line)', uk: 'E4 (нижня лінія)' },
  },
  {
    note: 'F4',
    type: 'space',
    y: 10,
    label: { en: 'F4 (first space)', uk: 'F4 (перший проміжок)' },
  },
  {
    note: 'G4',
    type: 'line',
    y: 9,
    label: { en: 'G4 (second line)', uk: 'G4 (друга лінія)' },
  },
  {
    note: 'A4',
    type: 'space',
    y: 8,
    label: { en: 'A4 (second space)', uk: 'A4 (другий проміжок)' },
  },
  {
    note: 'B4',
    type: 'line',
    y: 7,
    label: { en: 'B4 (middle line)', uk: 'B4 (середня лінія)' },
  },
  {
    note: 'C5',
    type: 'space',
    y: 6,
    label: { en: 'C5 (third space)', uk: 'C5 (третій проміжок)' },
  },
  {
    note: 'D5',
    type: 'line',
    y: 5,
    label: { en: 'D5 (fourth line)', uk: 'D5 (четверта лінія)' },
  },
  {
    note: 'E5',
    type: 'space',
    y: 4,
    label: { en: 'E5 (top space)', uk: 'E5 (верхній проміжок)' },
  },
  {
    note: 'F5',
    type: 'line',
    y: 3,
    label: { en: 'F5 (top line)', uk: 'F5 (верхня лінія)' },
  },
  // Ledger lines above staff
  {
    note: 'G5',
    type: 'ledger',
    y: 2,
    label: { en: 'G5 (ledger space)', uk: 'G5 (додатковий проміжок)' },
  },
  {
    note: 'A5',
    type: 'ledger',
    y: 1,
    label: { en: 'A5 (ledger line)', uk: 'A5 (додаткова лінія)' },
  },
  {
    note: 'B5',
    type: 'ledger',
    y: 0,
    label: { en: 'B5 (ledger space)', uk: 'B5 (додатковий проміжок)' },
  },
];

// Default starting position (middle of staff)
export const DEFAULT_POSITION = 6; // B4, middle line
