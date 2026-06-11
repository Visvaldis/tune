import type { Lang } from '../../i18n/utils';
import PlaceholderTool from './PlaceholderTool';

export default function StrumGrid({ lang }: { lang: Lang }) {
  return <PlaceholderTool lang={lang} toolId="strum-grid" />;
}
