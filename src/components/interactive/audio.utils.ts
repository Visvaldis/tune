// =============================================================================
// Shared Web Audio API utilities for interactive components.
// Used by: staff-explorer, interval-trainer, scale-builder, chord-explorer,
//          tuner-practice, time-conductor, rhythm-tapper
// =============================================================================

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

// ---- Note frequencies (A4 = 440 Hz, equal temperament) ----------------------
// Maps note names like 'C4', 'A#3', 'Gb5' to Hz.

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;

function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function noteToMidi(note: string): number {
  const match = note.match(/^([A-G])(#|b)?(\d)$/);
  if (!match) throw new Error(`Invalid note: ${note}`);
  const [, letter, accidental, octaveStr] = match;
  let semitone = NOTE_NAMES.indexOf(letter as (typeof NOTE_NAMES)[number]);
  if (accidental === '#') semitone += 1;
  if (accidental === 'b') semitone -= 1;
  const octave = parseInt(octaveStr, 10);
  return (octave + 1) * 12 + semitone;
}

/** Get the frequency (Hz) for a note name like 'A4', 'C#3', 'Eb5'. */
export function noteFreq(note: string): number {
  return midiToFreq(noteToMidi(note));
}

// ---- Pre-computed frequency table for common range --------------------------

export const FREQUENCIES: Record<string, number> = {};
for (let octave = 2; octave <= 6; octave++) {
  for (const name of NOTE_NAMES) {
    const note = `${name}${octave}`;
    FREQUENCIES[note] = noteFreq(note);
  }
}
// Add enharmonic aliases
for (let octave = 2; octave <= 6; octave++) {
  FREQUENCIES[`Db${octave}`] = FREQUENCIES[`C#${octave}`];
  FREQUENCIES[`Eb${octave}`] = FREQUENCIES[`D#${octave}`];
  FREQUENCIES[`Gb${octave}`] = FREQUENCIES[`F#${octave}`];
  FREQUENCIES[`Ab${octave}`] = FREQUENCIES[`G#${octave}`];
  FREQUENCIES[`Bb${octave}`] = FREQUENCIES[`A#${octave}`];
}

// ---- Playback ---------------------------------------------------------------

export interface ToneOptions {
  /** Duration in seconds (default 0.5) */
  duration?: number;
  /** Gain 0-1 (default 0.3) */
  volume?: number;
  /** Waveform type (default 'triangle') */
  type?: OscillatorType;
}

/** Play a single tone at the given frequency. Returns a stop function. */
export function playTone(
  frequency: number,
  opts: ToneOptions = {},
): () => void {
  const { duration = 0.5, volume = 0.3, type = 'triangle' } = opts;
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);

  osc.connect(gain).connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + duration);

  return () => {
    try { osc.stop(); } catch { /* already stopped */ }
  };
}

/** Play a note by name (e.g. 'C4'). */
export function playNote(note: string, opts?: ToneOptions): () => void {
  return playTone(noteFreq(note), opts);
}

/** Play multiple notes simultaneously (chord). */
export function playChord(notes: string[], opts?: ToneOptions): () => void {
  const stops = notes.map((n) => playNote(n, { ...opts, volume: (opts?.volume ?? 0.3) / notes.length * 1.5 }));
  return () => stops.forEach((s) => s());
}

/** Play notes in sequence (arpeggio / scale). Returns a cancel function. */
export function playSequence(
  notes: string[],
  opts: ToneOptions & { gap?: number } = {},
): () => void {
  const { gap = 0.3, ...toneOpts } = opts;
  let cancelled = false;
  const timers: number[] = [];

  notes.forEach((note, i) => {
    const timer = window.setTimeout(() => {
      if (!cancelled) playNote(note, toneOpts);
    }, i * gap * 1000);
    timers.push(timer);
  });

  return () => {
    cancelled = true;
    timers.forEach(clearTimeout);
  };
}

/** Play a short click sound (for metronome / rhythm). */
export function playClick(accent = false): void {
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  const duration = 0.03;

  osc.type = 'square';
  osc.frequency.value = accent ? 1200 : 800;
  gain.gain.setValueAtTime(accent ? 0.4 : 0.2, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);

  osc.connect(gain).connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + duration);
}
