import type { UIKey } from '../../i18n/ui';

export type PlaygroundToolId =
  | 'beat-lab'
  | 'fretboard-map'
  | 'chord-recipe'
  | 'strum-grid'
  | 'interval-ear'
  | 'mini-jam';

export interface PlaygroundToolDefinition {
  id: PlaygroundToolId;
  slug: PlaygroundToolId;
  topic: string;
  icon: string;
  titleKey: UIKey;
  goalKey: UIKey;
  usesAudio: boolean;
}

export const playgroundTools: readonly PlaygroundToolDefinition[] = [
  {
    id: 'beat-lab',
    slug: 'beat-lab',
    topic: 'rhythm',
    icon: '🥁',
    titleKey: 'playground.beatLab.name',
    goalKey: 'playground.beatLab.goal',
    usesAudio: true,
  },
  {
    id: 'fretboard-map',
    slug: 'fretboard-map',
    topic: 'guitar',
    icon: '🎸',
    titleKey: 'playground.fretboardMap.name',
    goalKey: 'playground.fretboardMap.goal',
    usesAudio: false,
  },
  {
    id: 'chord-recipe',
    slug: 'chord-recipe',
    topic: 'harmony',
    icon: '🎹',
    titleKey: 'playground.chordRecipe.name',
    goalKey: 'playground.chordRecipe.goal',
    usesAudio: false,
  },
  {
    id: 'strum-grid',
    slug: 'strum-grid',
    topic: 'rhythm',
    icon: '🪘',
    titleKey: 'playground.strumGrid.name',
    goalKey: 'playground.strumGrid.goal',
    usesAudio: true,
  },
  {
    id: 'interval-ear',
    slug: 'interval-ear',
    topic: 'ear',
    icon: '👂',
    titleKey: 'playground.intervalEar.name',
    goalKey: 'playground.intervalEar.goal',
    usesAudio: true,
  },
  {
    id: 'mini-jam',
    slug: 'mini-jam',
    topic: 'theory',
    icon: '🎛️',
    titleKey: 'playground.miniJam.name',
    goalKey: 'playground.miniJam.goal',
    usesAudio: true,
  },
] as const;

export const playgroundToolMap = Object.fromEntries(
  playgroundTools.map((tool) => [tool.slug, tool])
) as Record<PlaygroundToolId, PlaygroundToolDefinition>;
