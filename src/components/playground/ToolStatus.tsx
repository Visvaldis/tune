import type { ReactNode } from 'react';

type Tone = 'neutral' | 'accent' | 'muted';

interface Props {
  children: ReactNode;
  tone?: Tone;
}

export default function ToolStatus({ children, tone = 'neutral' }: Props) {
  return <span className={`pg-status pg-status-${tone}`}>{children}</span>;
}
