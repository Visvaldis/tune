import type { Lang } from '../../i18n/utils';
import PlaceholderTool from './PlaceholderTool';

export default function MiniJam({ lang }: { lang: Lang }) {
  return <PlaceholderTool lang={lang} toolId="mini-jam" />;
}
