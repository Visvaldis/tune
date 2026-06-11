import type { ReactNode } from 'react';
import ToolStatus from './ToolStatus';

type Tone = 'neutral' | 'accent' | 'muted';

interface Props {
  title: string;
  goal: string;
  status: string;
  statusTone?: Tone;
  controls?: ReactNode;
  aside?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export default function ToolFrame({
  title,
  goal,
  status,
  statusTone = 'neutral',
  controls,
  aside,
  footer,
  children,
}: Props) {
  return (
    <section className="pg-tool-frame">
      <header className="pg-tool-head">
        <div>
          <p className="pg-tool-label">{title}</p>
          <h2>{goal}</h2>
        </div>
        <ToolStatus tone={statusTone}>{status}</ToolStatus>
      </header>

      {controls ? <div className="pg-tool-controls">{controls}</div> : null}

      <div className={`pg-tool-panels${aside ? ' has-aside' : ''}`}>
        <div className="pg-tool-panel">{children}</div>
        {aside ? <aside className="pg-tool-panel">{aside}</aside> : null}
      </div>

      {footer ? <div className="pg-tool-footer">{footer}</div> : null}
    </section>
  );
}
