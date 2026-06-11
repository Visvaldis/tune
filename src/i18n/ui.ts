// ============================================================================
// Single source of truth for every localized UI string (site chrome only).
// Article *content* lives in content/<lang>/<slug>.md — NOT here.
// Rules:
//   • Every key has both `en` and `uk`. Never hardcode user-facing text in JSX.
//   • Component chrome is namespaced by interactive id: 'sampleToy.title', etc.
//   • Bulky bilingual *content data* (word lists, quiz items) goes in a
//     co-located <name>.data.ts file, not here (see CONVENTIONS.md).
// ============================================================================

export const LANGS = ['en', 'uk'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'en';

export type UIKey = keyof (typeof ui)['en'];

export const ui = {
  en: {
    'brand': 'Tune',
    'brand.tagline': 'music & guitar basics',
    'skip': 'Skip to content',

    'nav.home': 'Home',
    'nav.playground': 'Playground',
    'nav.about': 'About',

    'lang.label': 'EN',
    'lang.full': 'English',
    'lang.switch': 'Switch language',

    'home.hero.kicker': 'Bilingual · interactive · open',
    'home.hero.title': 'Learn music by playing with it',
    'home.hero.subtitle':
      'Hands-on lessons on notes, rhythm, chords, and guitar — in English and Ukrainian.',
    'home.articles': 'Lessons',
    'home.filterAria': 'Filter lessons by topic',
    'home.filterAll': 'All topics',

    'playground.kicker': 'Start by exploring one tool',
    'playground.title': 'Music playground',
    'playground.subtitle':
      'Six small bilingual tools for pulse, fretboard notes, chords, strumming, intervals, and a first four-bar jam.',
    'playground.tools': 'Choose a tool',
    'playground.back': 'Back to playground',
    'playground.learningGoal': 'Learning goal',
    'playground.startTool': 'Open tool',
    'playground.placeholder.status': 'Foundation ready',
    'playground.placeholder.title': 'This route is ready for the interactive build.',
    'playground.placeholder.body':
      'The shared shell, navigation, and localization are in place. The next task replaces this placeholder with the full practice tool.',
    'playground.placeholder.note':
      'For now, this page acts as a stable, language-safe shell for the upcoming interactive.',
    'playground.audioUnavailable.title': 'Audio can be optional',
    'playground.audioUnavailable.body':
      'Each tool must stay useful when sound is muted or unavailable. Visual state and text feedback remain part of the contract.',
    'playground.action.play': 'Play',
    'playground.action.stop': 'Stop',
    'playground.action.reset': 'Reset',
    'playground.action.clear': 'Clear',
    'playground.action.reveal': 'Reveal',
    'playground.action.replay': 'Replay',
    'playground.action.next': 'Next',
    'playground.action.start': 'Start',
    'playground.action.undo': 'Undo',
    'playground.action.mute': 'Mute',
    'playground.action.unmute': 'Unmute',
    'playground.action.compare': 'Compare',
    'playground.label.tempo': 'Tempo',
    'playground.label.mode': 'Mode',
    'playground.label.status': 'Status',
    'playground.label.root': 'Root',
    'playground.label.quality': 'Quality',
    'playground.label.bar': 'Bar',
    'playground.label.beat': 'Beat',
    'playground.label.audio': 'Audio',
    'playground.label.currentBar': 'Current bar',
    'playground.mode.explore': 'Explore',
    'playground.mode.challenge': 'Challenge',
    'playground.state.ready': 'Ready',
    'playground.state.running': 'Running',
    'playground.state.stopped': 'Stopped',
    'playground.state.muted': 'Muted',
    'playground.beatLab.name': 'Beat Lab',
    'playground.beatLab.goal':
      'Start a pulse, change the tempo, feel a repeating first beat, and estimate a tempo by tapping.',
    'playground.fretboardMap.name': 'Fretboard Map',
    'playground.fretboardMap.goal':
      'Reveal note names on the first twelve frets and spot every repeated pitch class on the guitar neck.',
    'playground.chordRecipe.name': 'Chord Recipe',
    'playground.chordRecipe.goal':
      'Keep one root fixed and see how a chord quality turns into intervals, note names, and keyboard keys.',
    'playground.strumGrid.name': 'Strum Grid',
    'playground.strumGrid.goal':
      'Build one bar of subdivision-based strumming and follow the pattern with visible counts and a looping playhead.',
    'playground.intervalEar.name': 'Interval Ear',
    'playground.intervalEar.goal':
      'Hear a small set of pitch distances, replay them, and match the sound to an interval name.',
    'playground.miniJam.name': 'Mini Jam Builder',
    'playground.miniJam.goal':
      'Start a four-bar loop and hear how beat, chords, and piano notes combine into a first jam.',

    'card.read': 'Read',
    'card.minRead': 'min read',

    'article.previous': 'Previous',
    'article.next': 'Next',
    'article.allArticles': 'All lessons',

    'sources.title': 'Explore further',
    'sources.newTab': 'opens in a new tab',

    'interactive.badge': 'Interactive',
    'interactive.comingSoon': 'In progress',
    'interactive.note': "Here's what this hands-on component will let you do:",

    'about.title': 'About',
    'about.p1': 'Лад / Tune is an interactive storybook for learning the base concepts of music and guitar playing.',
    'about.p2': 'Every lesson is bilingual (English + Ukrainian) and every page has a hands-on interactive component.',
    'about.p3': 'Built with Astro + React islands. Open source and statically deployed.',

    'notfound.title': 'Page not found',
    'notfound.body': 'That page does not exist.',
    'notfound.home': 'Go home',

    'footer.tagline': '© Лад / Tune — built as a static, bilingual site.',

    // --- per-interactive chrome (namespaced by id) -----------------------
    // Add interactive-specific UI strings here as islands are built.

    // RhythmTapper (what-is-rhythm)
    'rhythmTapper.title': 'Rhythm Tapper',
    'rhythmTapper.tapHere': 'Tap spacebar or click to record',
    'rhythmTapper.record': 'Record',
    'rhythmTapper.stop': 'Stop',
    'rhythmTapper.playback': 'Play back',
    'rhythmTapper.clear': 'Clear',
    'rhythmTapper.tempo': 'Tempo (BPM)',
    'rhythmTapper.presets': 'Try a pattern:',
    'rhythmTapper.beat': 'Beat',

    // TimeConductor (time-signatures)
    'timeConductor.title': 'Time Signature Conductor',
    'timeConductor.select': 'Choose a time signature:',
    'timeConductor.tempo': 'Tempo (BPM):',
    'timeConductor.play': 'Play',
    'timeConductor.stop': 'Stop',
    'timeConductor.beat': 'Beat:',
    'timeConductor.feel': 'Feel:',

    // GuitarAnatomy (anatomy-of-guitar)
    'guitarAnatomy.title': 'Guitar Anatomy Explorer',
    'guitarAnatomy.instruction': 'Hover or tap each part to learn about it',
    'guitarAnatomy.selectPart': 'Select a part',

    // ScaleBuilder (major-scale)
    'scaleBuilder.title': 'Major Scale Builder',
    'scaleBuilder.rootNote': 'Starting note:',
    'scaleBuilder.check': 'Check my scale',
    'scaleBuilder.correct': "Perfect! That's the major scale.",
    'scaleBuilder.incorrect': 'Not quite. Follow the W-W-H-W-W-W-H pattern.',
    'scaleBuilder.playScale': 'Play scale',
    'scaleBuilder.showGuide': 'Show pattern guide',
    'scaleBuilder.reset': 'Reset',

    // CircleSpinner (circle-of-fifths)
    'circleSpinner.title': 'Circle of Fifths',
    'circleSpinner.instruction': 'Click a key to explore',
    'circleSpinner.accidentals': 'Accidentals:',
    'circleSpinner.relative': 'Relative minor:',
    'circleSpinner.neighbors': 'Neighboring keys:',
    'circleSpinner.playChord': 'Play tonic chord',
    'circleSpinner.sharps': 'sharps',
    'circleSpinner.flats': 'flats',
    'circleSpinner.none': 'No sharps or flats',


    // IntervalTrainer (intervals)
    'intervalTrainer.title': 'Interval Ear Trainer',
    'intervalTrainer.quiz': 'Quiz',
    'intervalTrainer.practice': 'Practice',
    'intervalTrainer.play': 'Play interval',
    'intervalTrainer.correct': 'Correct!',
    'intervalTrainer.incorrect': 'Not quite. It was',
    'intervalTrainer.score': 'Score:',
    'intervalTrainer.next': 'Next',
    'intervalTrainer.semitones': 'semitones',
    'intervalTrainer.reference': 'Sounds like:',

    // StaffExplorer (notes-and-staff)
    'staffExplorer.title': 'Explore the Staff',
    'staffExplorer.dragNote': 'Drag the note up and down',
    'staffExplorer.tapNote': 'Tap a note to place it',
    'staffExplorer.playNote': 'Play note',
    'staffExplorer.currentNote': 'Current note:',
    'staffExplorer.lineNote': 'Line note',
    'staffExplorer.spaceNote': 'Space note',

    // ChordExplorer (basic-chords)
    'chordExplorer.title': 'Chord Explorer',
    'chordExplorer.selectChord': 'Select a chord:',
    'chordExplorer.strum': 'Strum',
    'chordExplorer.stringByString': 'String by string',
    'chordExplorer.notes': 'Notes:',
    'chordExplorer.muted': 'Muted',
    'chordExplorer.open': 'Open',
    'chordExplorer.finger': 'Finger',
  },
  uk: {
    'brand': 'Лад',
    'brand.tagline': 'музика й гітара з нуля',
    'skip': 'Перейти до вмісту',

    'nav.home': 'Головна',
    'nav.playground': 'Майданчик',
    'nav.about': 'Про проєкт',

    'lang.label': 'УК',
    'lang.full': 'Українська',
    'lang.switch': 'Змінити мову',

    'home.hero.kicker': 'Двомовний · інтерактивний · відкритий',
    'home.hero.title': 'Вивчай музику граючи',
    'home.hero.subtitle':
      'Інтерактивні уроки про ноти, ритм, акорди та гітару — англійською й українською.',
    'home.articles': 'Уроки',
    'home.filterAria': 'Фільтрувати уроки за темою',
    'home.filterAll': 'Усі теми',

    'playground.kicker': 'Почни з одного інструмента',
    'playground.title': 'Музичний майданчик',
    'playground.subtitle':
      'Шість невеликих двомовних інструментів для пульсу, нот на грифі, акордів, бою, інтервалів і першого чотиритактового джему.',
    'playground.tools': 'Обери інструмент',
    'playground.back': 'Назад до майданчика',
    'playground.learningGoal': 'Навчальна мета',
    'playground.startTool': 'Відкрити інструмент',
    'playground.placeholder.status': 'Основа готова',
    'playground.placeholder.title': 'Маршрут готовий для повної інтерактивної збірки.',
    'playground.placeholder.body':
      'Спільна оболонка, навігація та локалізація вже на місці. Наступне завдання замінює цю заглушку повним практичним інструментом.',
    'playground.placeholder.note':
      'Поки що ця сторінка працює як стабільна мовобезпечна оболонка для майбутнього інтерактиву.',
    'playground.audioUnavailable.title': 'Аудіо може бути необов’язковим',
    'playground.audioUnavailable.body':
      'Кожен інструмент має лишатися корисним, навіть якщо звук вимкнений або недоступний. Видимий стан і текстовий відгук залишаються частиною контракту.',
    'playground.action.play': 'Грати',
    'playground.action.stop': 'Стоп',
    'playground.action.reset': 'Скинути',
    'playground.action.clear': 'Очистити',
    'playground.action.reveal': 'Показати',
    'playground.action.replay': 'Повторити',
    'playground.action.next': 'Далі',
    'playground.action.start': 'Почати',
    'playground.action.undo': 'Скасувати',
    'playground.action.mute': 'Вимкнути шар',
    'playground.action.unmute': 'Увімкнути шар',
    'playground.action.compare': 'Порівняти',
    'playground.label.tempo': 'Темп',
    'playground.label.mode': 'Режим',
    'playground.label.status': 'Стан',
    'playground.label.root': 'Тоніка',
    'playground.label.quality': 'Тип акорду',
    'playground.label.bar': 'Такт',
    'playground.label.beat': 'Доля',
    'playground.label.audio': 'Аудіо',
    'playground.label.currentBar': 'Поточний такт',
    'playground.mode.explore': 'Дослідження',
    'playground.mode.challenge': 'Виклик',
    'playground.state.ready': 'Готово',
    'playground.state.running': 'Працює',
    'playground.state.stopped': 'Зупинено',
    'playground.state.muted': 'Вимкнено',
    'playground.beatLab.name': 'Лабораторія пульсу',
    'playground.beatLab.goal':
      'Запусти пульс, зміни темп, відчуй повторювану сильну долю й приблизно оціни темп постукуванням.',
    'playground.fretboardMap.name': 'Мапа грифу',
    'playground.fretboardMap.goal':
      'Показуй назви нот на перших дванадцяти ладах і знаходь усі повтори одного класу висоти на грифі.',
    'playground.chordRecipe.name': 'Рецепт акорду',
    'playground.chordRecipe.goal':
      'Тримай одну тоніку сталою й дивись, як тип акорду перетворюється на інтервали, назви нот і клавіші.',
    'playground.strumGrid.name': 'Сітка бою',
    'playground.strumGrid.goal':
      'Побудуй один такт бою за поділами та стеж за візерунком через видимий рахунок і циклічний курсор.',
    'playground.intervalEar.name': 'Слух на інтервали',
    'playground.intervalEar.goal':
      'Слухай невеликий набір звукових відстаней, повторюй їх і співвіднось звук з назвою інтервалу.',
    'playground.miniJam.name': 'Міні-джем',
    'playground.miniJam.goal':
      'Запусти чотиритактовий цикл і почуй, як ритм, акорди й фортепіанні ноти складаються у перший джем.',

    'card.read': 'Читати',
    'card.minRead': 'хв читання',

    'article.previous': 'Назад',
    'article.next': 'Далі',
    'article.allArticles': 'Усі уроки',

    'sources.title': 'Дізнатися більше',
    'sources.newTab': 'відкриється в новій вкладці',

    'interactive.badge': 'Інтерактив',
    'interactive.comingSoon': 'У розробці',
    'interactive.note': 'Ось що дозволить робити цей інтерактивний компонент:',

    'about.title': 'Про проєкт',
    'about.p1': 'Лад / Tune — інтерактивна книга для вивчення основ музики та гри на гітарі.',
    'about.p2': 'Кожен урок — двомовний (англійська + українська), і кожна сторінка має інтерактивний компонент.',
    'about.p3': 'Зроблено на Astro + React islands. Відкритий код, статичне розгортання.',

    'notfound.title': 'Сторінку не знайдено',
    'notfound.body': 'Такої сторінки не існує.',

    // ScaleBuilder (major-scale)
    'scaleBuilder.title': 'Побудова мажорної гами',
    'scaleBuilder.rootNote': 'Початкова нота:',
    'scaleBuilder.check': 'Перевірити гаму',
    'scaleBuilder.correct': 'Чудово! Це мажорна гама.',
    'scaleBuilder.incorrect': 'Не зовсім. Спробуй за формулою Т-Т-П-Т-Т-Т-П.',
    'scaleBuilder.playScale': 'Відтворити гаму',
    'scaleBuilder.showGuide': 'Показати формулу',
    'scaleBuilder.reset': 'Скинути',
    'notfound.home': 'На головну',

    'footer.tagline': '© Лад / Tune — статичний двомовний сайт.',

    // --- per-interactive chrome (namespaced by id) -----------------------
    // Add interactive-specific UI strings here as islands are built.

    // RhythmTapper (what-is-rhythm)
    'rhythmTapper.title': 'Ритм-таппер',
    'rhythmTapper.tapHere': 'Натисни пробіл або клікни, щоб записати',
    'rhythmTapper.record': 'Запис',
    'rhythmTapper.stop': 'Стоп',
    'rhythmTapper.playback': 'Відтворити',
    'rhythmTapper.clear': 'Очистити',
    'rhythmTapper.tempo': 'Темп (BPM)',
    'rhythmTapper.presets': 'Спробуй патерн:',
    'rhythmTapper.beat': 'Доля',

    // TimeConductor (time-signatures)
    'timeConductor.title': 'Диригент тактових розмірів',
    'timeConductor.select': 'Обери тактовий розмір:',
    'timeConductor.tempo': 'Темп (BPM):',
    'timeConductor.play': 'Грати',
    'timeConductor.stop': 'Стоп',
    'timeConductor.beat': 'Доля:',
    'timeConductor.feel': 'Відчуття:',

    // CircleSpinner (circle-of-fifths)
    'circleSpinner.title': 'Квінтове коло',
    'circleSpinner.instruction': 'Натисни на тональність',
    'circleSpinner.accidentals': 'Знаки:',
    'circleSpinner.relative': 'Паралельний мінор:',
    'circleSpinner.neighbors': 'Сусідні тональності:',
    'circleSpinner.playChord': 'Відтворити тоніку',
    'circleSpinner.sharps': 'дієзів',
    'circleSpinner.flats': 'бемолів',
    'circleSpinner.none': 'Без знаків',

    // GuitarAnatomy (anatomy-of-guitar)
    'guitarAnatomy.title': 'Будова гітари',
    'guitarAnatomy.instruction': 'Наведи або натисни на частину, щоб дізнатися про неї',
    'guitarAnatomy.selectPart': 'Обери частину',


    // IntervalTrainer (intervals)
    'intervalTrainer.title': 'Тренажер інтервалів',
    'intervalTrainer.quiz': 'Вікторина',
    'intervalTrainer.practice': 'Практика',
    'intervalTrainer.play': 'Відтворити інтервал',
    'intervalTrainer.correct': 'Правильно!',
    'intervalTrainer.incorrect': 'Не зовсім. Це був',
    'intervalTrainer.score': 'Рахунок:',
    'intervalTrainer.next': 'Далі',
    'intervalTrainer.semitones': 'півтонів',
    'intervalTrainer.reference': 'Звучить як:',

    // StaffExplorer (notes-and-staff)
    'staffExplorer.title': 'Досліди нотний стан',
    'staffExplorer.dragNote': 'Перетягуй ноту вгору й вниз',
    'staffExplorer.tapNote': 'Натисни ноту, щоб розмістити',
    'staffExplorer.playNote': 'Відтворити ноту',
    'staffExplorer.currentNote': 'Поточна нота:',
    'staffExplorer.lineNote': 'Нота на лінії',
    'staffExplorer.spaceNote': 'Нота в проміжку',

    // ChordExplorer (basic-chords)
    'chordExplorer.title': 'Дослідник акордів',
    'chordExplorer.selectChord': 'Обери акорд:',
    'chordExplorer.strum': 'Бряжчання',
    'chordExplorer.stringByString': 'По струні',
    'chordExplorer.notes': 'Ноти:',
    'chordExplorer.muted': 'Заглушена',
    'chordExplorer.open': 'Відкрита',
    'chordExplorer.finger': 'Палець',

    // TunerPractice (tuning-guitar)
    'tunerPractice.title': 'Практика налаштування гітари',
    'tunerPractice.instruction': 'Натисни на струну, щоб почути еталонний тон',
    'tunerPractice.playTone': 'Відтворити еталон',
    'tunerPractice.challenge': 'Виклик: зведення висоти',
    'tunerPractice.tooLow': 'Занадто низько',
    'tunerPractice.inTune': 'Налаштовано!',
    'tunerPractice.tooHigh': 'Занадто високо',
    'tunerPractice.higher': 'Вище',
    'tunerPractice.lower': 'Нижче',
    'tunerPractice.frequency': 'Гц',
  },
} as const;

// ---- Topic registry --------------------------------------------------------
// One entry per topic id used in article frontmatter. Add a matching accent
// triplet in src/styles/global.css ([data-topic='<id>'], light + dark).
export const topicNames: Record<string, { en: string; uk: string }> = {
  theory:  { en: 'Music Theory', uk: 'Теорія музики' },
  rhythm:  { en: 'Rhythm',       uk: 'Ритм' },
  guitar:  { en: 'Guitar',       uk: 'Гітара' },
  harmony: { en: 'Harmony',      uk: 'Гармонія' },
  ear:     { en: 'Ear Training',  uk: 'Тренування слуху' },
};

// ---- Interactive registry (metadata) --------------------------------------
// One entry per interactive id. `desc` seeds the placeholder shown before the
// real component is built — keep it derived from the article summary only.
export const interactiveInfo: Record<
  string,
  { icon: string; title: { en: string; uk: string }; desc: { en: string; uk: string } }
> = {
  'staff-explorer': {
    icon: '🎼',
    title: { en: 'Explore the Staff', uk: 'Досліди нотний стан' },
    desc: {
      en: 'Drag a note across the staff to learn note names and hear their pitch.',
      uk: 'Перетягуй ноту по стану, щоб вивчити назви нот і почути їхню висоту.',
    },
  },
  'rhythm-tapper': {
    icon: '🥁',
    title: { en: 'Rhythm Tapper', uk: 'Ритм-таппер' },
    desc: {
      en: 'Tap along to feel the beat, record your rhythm, and play it back.',
      uk: 'Відстукуй ритм, запиши його й відтвори.',
    },
  },
  'guitar-anatomy': {
    icon: '🎸',
    title: { en: 'Guitar Anatomy Explorer', uk: 'Будова гітари' },
    desc: {
      en: 'Hover or tap each part of the guitar to learn its name and role.',
      uk: 'Наведи або натисни на частину гітари, щоб дізнатися її назву й роль.',
    },
  },
  'interval-trainer': {
    icon: '👂',
    title: { en: 'Interval Ear Trainer', uk: 'Тренажер інтервалів' },
    desc: {
      en: 'Listen to two notes and guess the interval — train your ear step by step.',
      uk: 'Послухай дві ноти й вгадай інтервал — тренуй слух крок за кроком.',
    },
  },
  'scale-builder': {
    icon: '🎹',
    title: { en: 'Major Scale Builder', uk: 'Побудова мажорної гами' },
    desc: {
      en: 'Pick notes on a piano keyboard to build a major scale and hear the result.',
      uk: 'Обирай ноти на клавіатурі, щоб побудувати мажорну гаму й почути результат.',
    },
  },
  'chord-explorer': {
    icon: '✋',
    title: { en: 'Chord Explorer', uk: 'Дослідник акордів' },
    desc: {
      en: 'Pick a chord, see the fingering diagram, and hear how it sounds.',
      uk: 'Обери акорд, подивись аплікатуру й послухай, як він звучить.',
    },
  },
  'time-conductor': {
    icon: '🎵',
    title: { en: 'Time Signature Conductor', uk: 'Диригент тактових розмірів' },
    desc: {
      en: 'Conduct in 2/4, 3/4, 4/4, or 6/8 — feel how each time signature shapes the beat.',
      uk: 'Диригуй у розмірах 2/4, 3/4, 4/4, 6/8 — відчуй, як кожен формує пульс.',
    },
  },
  'circle-spinner': {
    icon: '🔵',
    title: { en: 'Circle of Fifths', uk: 'Квінтове коло' },
    desc: {
      en: 'Click a key on the circle to see its relatives, sharps, and flats.',
      uk: 'Натисни на тональність, щоб побачити споріднені, дієзи й бемолі.',
    },
  },
  'tuner-practice': {
    icon: '🎯',
    title: { en: 'Guitar Tuner Practice', uk: 'Практика налаштування гітари' },
    desc: {
      en: 'Play reference tones for each string and practise matching pitch.',
      uk: 'Відтвори еталонний тон для кожної струни й практикуй зведення висоти.',
    },
  },
};
