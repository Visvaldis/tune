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
  },
  uk: {
    'brand': 'Лад',
    'brand.tagline': 'музика й гітара з нуля',
    'skip': 'Перейти до вмісту',

    'nav.home': 'Головна',
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
    'notfound.home': 'На головну',

    'footer.tagline': '© Лад / Tune — статичний двомовний сайт.',

    // --- per-interactive chrome (namespaced by id) -----------------------
    // Add interactive-specific UI strings here as islands are built.
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
  // Add one entry per article interactive as articles are authored.
};
