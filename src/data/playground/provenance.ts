export interface BilingualText {
  en: string;
  uk: string;
}

export interface SourceReference {
  title: string;
  url: string;
}

export interface ProvenanceRecord<T = unknown> {
  id: string;
  value: T;
  source: SourceReference;
  note: BilingualText;
}

export interface ProvenanceBundle<T = unknown> {
  summary: BilingualText;
  records: readonly ProvenanceRecord<T>[];
}

export interface NoteSpellingPolicy {
  id: string;
  summary: BilingualText;
  limitation: BilingualText;
}

// Shared product rule for the MVP data layer. Individual tools may narrow or
// extend this policy only when they add sourced support for the new spelling set.
export const NOTE_SPELLING_POLICY: NoteSpellingPolicy = {
  id: 'playground-common-note-spellings',
  summary: {
    en: 'Use a common 12-pitch-class label set for the MVP playground unless a tool adds explicit sourced support for a richer spelling model.',
    uk: 'Для MVP-майданчика використовуй звичний набір назв для 12 класів висоти, якщо інструмент окремо не додає підтверджену джерелами ширшу систему написань.',
  },
  limitation: {
    en: 'Do not expose theoretical spellings such as double accidentals or uncommon enharmonic names unless the tool documents and sources them.',
    uk: 'Не показуй теоретичні написання на кшталт дубль-дієзів, дубль-бемолів чи рідкісних енгармонічних назв, доки інструмент не задокументує й не підкріпить їх джерелами.',
  },
};
