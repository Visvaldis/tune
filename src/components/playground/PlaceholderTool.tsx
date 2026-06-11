import type { Lang } from '../../i18n/utils';
import { useTranslations } from '../../i18n/utils';
import { playgroundToolMap, type PlaygroundToolId } from '../../data/playground/toolCatalog';
import ToolPlaceholder from './ToolPlaceholder';

interface Props {
  lang: Lang;
  toolId: PlaygroundToolId;
}

export default function PlaceholderTool({ lang, toolId }: Props) {
  const t = useTranslations(lang);
  const tool = playgroundToolMap[toolId];

  return (
    <ToolPlaceholder
      title={t(tool.titleKey)}
      goal={t(tool.goalKey)}
      status={t('playground.placeholder.status')}
      placeholderTitle={t('playground.placeholder.title')}
      placeholderBody={t('playground.placeholder.body')}
      placeholderNote={t('playground.placeholder.note')}
      audioTitle={t('playground.audioUnavailable.title')}
      audioBody={t('playground.audioUnavailable.body')}
      usesAudio={tool.usesAudio}
    />
  );
}
