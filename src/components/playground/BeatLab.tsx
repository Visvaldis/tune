import type { Lang } from '../../i18n/utils';
import PlaceholderTool from './PlaceholderTool';

export default function BeatLab({ lang }: { lang: Lang }) {
  return <PlaceholderTool lang={lang} toolId="beat-lab" />;
}
