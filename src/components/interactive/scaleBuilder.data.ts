// =============================================================================
// Data for ScaleBuilder interactive component
// =============================================================================

// Major scale interval pattern in semitones: W=2, H=1
// Pattern: W-W-H-W-W-W-H
export const MAJOR_SCALE_PATTERN = [2, 2, 1, 2, 2, 2, 1];

// All 12 chromatic notes in order (starting from C)
export const CHROMATIC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Natural notes (white keys) for reference
export const NATURAL_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

/**
 * Get the major scale for a given root note
 * @param root The root note (e.g., 'C', 'D', 'G')
 * @returns Array of 8 notes (including octave) with octave numbers
 */
export function getMajorScale(root: string, startOctave = 4): string[] {
  const rootIndex = CHROMATIC.indexOf(root);
  if (rootIndex === -1) throw new Error(`Invalid root note: ${root}`);

  const scale: string[] = [`${root}${startOctave}`];
  let currentIndex = rootIndex;
  let currentOctave = startOctave;

  for (const interval of MAJOR_SCALE_PATTERN) {
    currentIndex += interval;
    if (currentIndex >= 12) {
      currentIndex -= 12;
      currentOctave += 1;
    }
    scale.push(`${CHROMATIC[currentIndex]}${currentOctave}`);
  }

  return scale;
}

/**
 * Get the major scale notes without octave numbers for display
 * @param root The root note
 * @returns Array of 8 note names
 */
export function getMajorScaleNotes(root: string): string[] {
  const rootIndex = CHROMATIC.indexOf(root);
  if (rootIndex === -1) throw new Error(`Invalid root note: ${root}`);

  const scale: string[] = [root];
  let currentIndex = rootIndex;

  for (const interval of MAJOR_SCALE_PATTERN) {
    currentIndex = (currentIndex + interval) % 12;
    scale.push(CHROMATIC[currentIndex]);
  }

  return scale;
}

/**
 * Piano key layout for one octave + one note
 * Each key has: note name (without octave), color (white/black), and position info
 */
export interface PianoKey {
  note: string;          // Note name without octave (e.g., 'C', 'C#')
  color: 'white' | 'black';
  whiteKeyIndex: number; // Position among white keys (0-7)
}

/**
 * Generate piano keys layout from a root note
 * Returns keys for one octave + the octave note (8 white keys total)
 */
export function getPianoKeys(root: string): PianoKey[] {
  const rootIndex = CHROMATIC.indexOf(root);
  if (rootIndex === -1) throw new Error(`Invalid root note: ${root}`);

  const keys: PianoKey[] = [];
  let whiteKeyIndex = 0;

  // Generate keys for one octave + octave note
  for (let i = 0; i <= 12; i++) {
    const noteIndex = (rootIndex + i) % 12;
    const note = CHROMATIC[noteIndex];
    const isBlack = note.includes('#');

    if (!isBlack || i < 12) { // Don't show black key after last white key
      keys.push({
        note,
        color: isBlack ? 'black' : 'white',
        whiteKeyIndex: isBlack ? whiteKeyIndex - 1 : whiteKeyIndex,
      });

      if (!isBlack) whiteKeyIndex++;
    }
  }

  return keys;
}

/**
 * Get the interval pattern labels for display
 */
export const PATTERN_LABELS = {
  en: ['W', 'W', 'H', 'W', 'W', 'W', 'H'],
  uk: ['Т', 'Т', 'П', 'Т', 'Т', 'Т', 'П'], // Тон, Тон, Півтон, ...
};

/**
 * Scale degree names
 */
export const SCALE_DEGREES = {
  en: ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Leading tone', 'Octave'],
  uk: ['Тоніка', 'Супертоніка', 'Медіанта', 'Субдомінанта', 'Домінанта', 'Субмедіанта', 'Вступний тон', 'Октава'],
};
