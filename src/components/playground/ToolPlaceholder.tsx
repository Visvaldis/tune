import ToolFrame from './ToolFrame';
import UnavailableAudioNotice from './UnavailableAudioNotice';

interface Props {
  title: string;
  goal: string;
  status: string;
  placeholderTitle: string;
  placeholderBody: string;
  placeholderNote: string;
  audioTitle: string;
  audioBody: string;
  usesAudio: boolean;
}

export default function ToolPlaceholder({
  title,
  goal,
  status,
  placeholderTitle,
  placeholderBody,
  placeholderNote,
  audioTitle,
  audioBody,
  usesAudio,
}: Props) {
  return (
    <ToolFrame
      title={title}
      goal={goal}
      status={status}
      statusTone="accent"
      aside={usesAudio ? <UnavailableAudioNotice title={audioTitle} body={audioBody} /> : null}
    >
      <div className="pg-placeholder">
        <h3>{placeholderTitle}</h3>
        <p>{placeholderBody}</p>
        <p>{placeholderNote}</p>
      </div>
    </ToolFrame>
  );
}
