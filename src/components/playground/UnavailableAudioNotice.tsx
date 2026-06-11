interface Props {
  title: string;
  body: string;
}

export default function UnavailableAudioNotice({ title, body }: Props) {
  return (
    <section className="pg-audio-note" aria-live="polite">
      <h3>{title}</h3>
      <p>{body}</p>
    </section>
  );
}
