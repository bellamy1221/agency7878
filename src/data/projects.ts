export type ProjectStatus =
  | "Концепт"
  | "Реализованный проект"
  | "Эксперимент";

export type ArchiveCategory =
  | "Сайты"
  | "Мини-приложения Telegram"
  | "Настольные приложения"
  | "3D-коммерция";

export type ProjectLayout =
  | "full"
  | "split-left"
  | "split-right"
  | "compact"
  | "editorial";

export interface Project {
  slug: string;
  title: string;
  shortTitle?: string;
  previewTitle: string;
  previewCategory: string;
  category: string;
  projectType: string;
  archiveCategory: ArchiveCategory;
  year: number;
  status: ProjectStatus;
  featured: boolean;
  featuredOrder?: number;
  layout: ProjectLayout;
  accent: string;
  cover: string;
  previewImage?: string;
  coverPosition?: string;
  coverZoom?: number;
  previewFit?: "contain";
  previewDevice?: "phone";
  previewDevicePosition?: string;
  previewDeviceSide?: "left";
  previewCopySide?: "left";
  demoPath?: string;
  gallery: string[];
  summary: string;
  context: string;
  problem: string;
  objective: string;
  solution: string;
  functionality: string[];
  contribution: string;
  services: string[];
  visualDirection: string;
  development: string;
  outcome: string;
  isConcept: boolean;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "mount-hospitality",
    title: "MOUNT",
    previewTitle: "MOUNT",
    previewCategory: "Архитектурный отель",
    category: "Гостеприимство / отель",
    projectType: "Концепт сайта",
    archiveCategory: "Сайты",
    year: 2026,
    status: "Концепт",
    featured: true,
    featuredOrder: 1,
    layout: "full",
    accent: "#9C7A4A",
    cover: "/projects/mount-hero-generated.png",
    coverPosition: "center 48%",
    demoPath: "/demos/mount/index.html",
    gallery: [
      "/projects/mount-exterior.svg",
      "/projects/mount-room.svg",
    ],
    summary:
      "Концепция сайта уединённого архитектурного отеля в Северной Осетии, построенная вокруг тишины, камня и горного ландшафта.",
    context:
      "MOUNT представлен как камерный архитектурный отель, встроенный в склон и рассчитанный на спокойный, созерцательный отдых.",
    problem:
      "Обычная структура гостиничного сайта не передавала бы характер места и свела бы впечатление к каталогу номеров и форме бронирования.",
    objective:
      "Соединить атмосферную презентацию локации с понятным выбором номера, инфраструктуры и сценария запроса дат.",
    solution:
      "Редакционная композиция с топографической графикой, крупными сценами, обзором номеров, ресторана, спа и коротким путём к бронированию.",
    functionality: [
      "Каталог номеров и резиденций",
      "Обзор локации и инфраструктуры",
      "Сезонные сценарии отдыха",
      "Форма запроса доступности",
    ],
    contribution:
      "Концепция, информационная архитектура, визуальная система, адаптивный frontend и интерактивные сценарии.",
    services: ["Art direction", "UX", "Web design", "Frontend"],
    visualDirection:
      "Тёплая минеральная палитра, топографические линии, сдержанная типографика и большой объём воздуха.",
    development:
      "Статический адаптивный сайт с локальными медиа, интерактивными галереями и поддержкой reduced motion.",
    outcome:
      "Завершённая концепция hospitality-сайта с цельным визуальным языком и проработанным путём к бронированию.",
    isConcept: true,
  },
  {
    slug: "elena-orlova",
    title: "Elena Orlova",
    previewTitle: "Елена Орлова",
    previewCategory: "Личный сайт косметолога",
    category: "Личный бренд / косметология",
    projectType: "Концепт сайта",
    archiveCategory: "Сайты",
    year: 2026,
    status: "Концепт",
    featured: true,
    featuredOrder: 2,
    layout: "editorial",
    accent: "#A9796B",
    cover: "/projects/elena-live.png",
    previewImage: "/demos/elena/assets/poster.webp",
    coverPosition: "center 50%",
    demoPath: "/demos/elena/index.html",
    gallery: [
      "/projects/elena-portrait.webp",
      "/projects/elena-cover.webp",
    ],
    summary:
      "Премиальный личный сайт независимого специалиста по эстетической косметологии с акцентом на доверие и естественный результат.",
    context:
      "Концепция персонального бренда специалиста, где важны деликатная визуальная подача, ясные услуги и спокойный сценарий записи.",
    problem:
      "Типовые beauty-сайты часто перегружены обещаниями и не дают пользователю почувствовать подход конкретного специалиста.",
    objective:
      "Передать профессиональный характер практики и собрать услуги, метод, профиль специалиста и запись в цельную историю.",
    solution:
      "Одностраничный editorial-сайт с мягкой сменой светлых и тёмных сцен, выборочной serif-типографикой и выразительной макросъёмкой.",
    functionality: [
      "Презентация специалиста и подхода",
      "Каталог процедур",
      "Раздел о методе и диагностике",
      "Сценарий записи",
    ],
    contribution:
      "Бренд-концепция, UX, визуальная система, адаптивная вёрстка и motion direction.",
    services: ["Personal brand", "UX", "Web design", "Motion"],
    visualDirection:
      "Фарфоровые оттенки, графитовые сцены, приглушённая розовая медь и естественные текстуры кожи.",
    development:
      "Семантический статический сайт с адаптивом, reduced motion и визуальным fallback для 3D-сцены.",
    outcome:
      "Готовая концепция личного сайта, в которой доверие строится через структуру, тон и аккуратную детализацию.",
    isConcept: true,
  },
  {
    slug: "forma-mini-app",
    title: "FORMA",
    previewTitle: "FORMA",
    previewCategory: "Мини-приложение Telegram",
    category: "Мини-приложение Telegram",
    projectType: "Интерактивный продукт",
    archiveCategory: "Мини-приложения Telegram",
    year: 2026,
    status: "Концепт",
    featured: true,
    featuredOrder: 3,
    layout: "split-right",
    accent: "#B58A63",
    cover: "/projects/forma-live.png",
    coverPosition: "72% center",
    previewCopySide: "left",
    demoPath: "/demos/forma/index.html",
    gallery: [
      "/projects/forma-tools.jpg",
      "/projects/forma-live.png",
    ],
    summary:
      "Интерактивный Telegram Mini App для записи в барбершоп: мастер, услуга, живой слот, перенос визита и лояльность.",
    context:
      "FORMA объединяет презентационный лендинг и полностью кликабельный прототип записи внутри привычного интерфейса Telegram.",
    problem:
      "Запись через переписку требует повторных уточнений и не даёт клиенту быстро увидеть свободное время и управлять визитом.",
    objective:
      "Собрать короткий самостоятельный сценарий записи и сохранить ощущение премиального сервиса на каждом шаге.",
    solution:
      "Девять интерактивных экранов с выбором услуги, мастера и времени, подтверждением, переносом, отменой и программой лояльности.",
    functionality: [
      "Запись за четыре шага",
      "Выбор мастера и услуги",
      "Перенос и отмена визита",
      "Светлая и тёмная темы",
      "Программа лояльности",
    ],
    contribution:
      "Продуктовый сценарий, UI-система, интерактивный прототип, адаптивная презентация и локальная сборка.",
    services: ["Product UX", "UI", "Prototype", "Telegram Mini App"],
    visualDirection:
      "Тактильная мужская эстетика, крупная фотография, спокойная типографика и компактные продуктовые экраны.",
    development:
      "Автономный статический пакет с локальными шрифтами, фотографиями и анимациями без внешнего backend.",
    outcome:
      "Завершённый интерактивный концепт полного сценария записи и управления визитом.",
    isConcept: true,
  },
  {
    slug: "hearth-macos",
    title: "Hearth",
    previewTitle: "Hearth",
    previewCategory: "Рабочее пространство для macOS",
    category: "Приложение для macOS",
    projectType: "Настольное приложение",
    archiveCategory: "Настольные приложения",
    year: 2026,
    status: "Реализованный проект",
    featured: true,
    featuredOrder: 4,
    layout: "split-left",
    accent: "#4D8191",
    cover: "/projects/hearth-cover.jpg",
    coverPosition: "center",
    demoPath: "/demos/hearth/index.html",
    gallery: ["/projects/hearth-cover.jpg"],
    summary:
      "Спокойное персональное рабочее пространство для macOS, объединяющее задачи, заметки, планирование, календарь, фокус и базу знаний.",
    context:
      "Hearth существует как настольное Electron-приложение для локальной работы с повседневными задачами и связанными знаниями.",
    problem:
      "Разделение задач, календаря, заметок и целей между разными инструментами создаёт лишние переключения и теряет контекст.",
    objective:
      "Собрать ежедневное планирование и личную базу знаний в одном спокойном, последовательно организованном приложении.",
    solution:
      "Единая desktop-среда с Today, Timeline, Notes, Tables, Canvas, Atlas, Goals, Focus и Archive, дополненная командной строкой.",
    functionality: [
      "Задачи и временная шкала",
      "Markdown-заметки и wiki-ссылки",
      "Календарь и цели",
      "Canvas и граф связей Atlas",
      "Focus-режим и локальное хранение",
    ],
    contribution:
      "Продуктовая архитектура, дизайн интерфейса, компоненты, локальное состояние и упаковка приложения для macOS.",
    services: ["Product design", "Desktop UI", "Electron", "Local data"],
    visualDirection:
      "Светлая рабочая поверхность, тихие цветовые маркеры, тонкая иерархия и интерфейс, рассчитанный на долгую работу.",
    development:
      "Electron-приложение для macOS с локальным хранением и сборкой в DMG. В портфолио показан case study без ложной web-demo ссылки.",
    outcome:
      "Рабочее desktop-приложение с завершённой системой ключевых экранов и инструментов продуктивности.",
    isConcept: false,
  },
  {
    slug: "stanza-3d",
    title: "STANZA",
    previewTitle: "STANZA",
    previewCategory: "3D-конфигуратор мебели",
    category: "3D-коммерция / мебель",
    projectType: "Интерактивный веб-проект",
    archiveCategory: "3D-коммерция",
    year: 2026,
    status: "Концепт",
    featured: true,
    featuredOrder: 5,
    layout: "full",
    accent: "#8B735B",
    cover: "/projects/stanza-configurator-cover-v2.png",
    coverPosition: "center",
    demoPath: "/demos/stanza/studio/index.html",
    gallery: [
      "/projects/stanza-editorial.webp",
      "/projects/stanza-room.webp",
    ],
    summary:
      "Интерактивная 3D-commerce система для мебели: каталог, конфигурация комнаты, материалы, живая стоимость, сохранение и заявка.",
    context:
      "STANZA соединяет премиальный мебельный каталог с Room Studio, где пользователь собирает и настраивает собственное пространство.",
    problem:
      "Статичные карточки товара не помогают оценить масштаб, сочетание материалов и итоговую композицию мебели в комнате.",
    objective:
      "Перенести ключевую часть консультации в интерактивный web-сценарий без разрыва между вдохновением, настройкой и запросом цены.",
    solution:
      "Параметрический 3D-конфигуратор с шаблонами комнат, каталогом, инспектором материалов, photo mode, live pricing и сохранением проекта.",
    functionality: [
      "Параметрическая 3D-мебель",
      "Шаблоны комнат и photo mode",
      "Материалы и размеры",
      "Живая стоимость и корзина",
      "Локальное сохранение и share links",
    ],
    contribution:
      "Продуктовая система, e-commerce UX, визуальный дизайн, React Three Fiber сцены и архитектура конфигуратора.",
    services: ["3D UX", "Commerce", "R3F", "Product design"],
    visualDirection:
      "Тихая интерьерная редакционность, натуральные материалы и утилитарный интерфейс поверх полноценной 3D-сцены.",
    development:
      "Next.js-приложение с React Three Fiber, процедурной геометрией, локальной персистентностью и статическим экспортом.",
    outcome:
      "Завершённая техническая концепция, связывающая мебельный каталог с глубоким интерактивным конфигуратором.",
    isConcept: true,
  },
  {
    slug: "aera-dentistry",
    title: "AERA",
    previewTitle: "AERA",
    previewCategory: "Сайт стоматологии",
    category: "Медицина / стоматология",
    projectType: "Концепт сайта",
    archiveCategory: "Сайты",
    year: 2026,
    status: "Концепт",
    featured: false,
    layout: "editorial",
    accent: "#315F58",
    cover: "/projects/aera-cover.jpg",
    coverPosition: "center 42%",
    previewFit: "contain",
    demoPath: "/demos/aera/index.html",
    gallery: ["/projects/aera-cover.jpg"],
    summary:
      "Спокойный сайт стоматологии с понятными услугами, врачами, ценами, кейсами и записью на консультацию.",
    context: "Концепция цифрового представительства современной стоматологии.",
    problem: "Медицинские сайты часто перегружены тревожной подачей и сложной навигацией.",
    objective: "Сделать путь к информации и записи спокойным и прозрачным.",
    solution: "Светлая editorial-система с ясной структурой услуг и доверительной подачей.",
    functionality: ["Каталог услуг", "Профили врачей", "Цены", "Запись"],
    contribution: "UX, визуальная концепция, адаптивный frontend.",
    services: ["UX", "Web design", "Frontend"],
    visualDirection: "Тёплый ivory, глубокий зелёный и мягкая медицинская фотография.",
    development: "Автономная responsive web-концепция.",
    outcome: "Полностью собранная концепция сайта стоматологии без заявленных коммерческих результатов.",
    isConcept: true,
  },
  {
    slug: "anna-volkova",
    title: "Anna Volkova",
    previewTitle: "Анна Волкова",
    previewCategory: "Частная недвижимость",
    category: "Личный бренд / недвижимость",
    projectType: "Концепт сайта",
    archiveCategory: "Сайты",
    year: 2026,
    status: "Концепт",
    featured: false,
    layout: "split-left",
    accent: "#8A6A4A",
    cover: "/projects/anna-volkova-cover.webp",
    coverPosition: "center 42%",
    demoPath: "/demos/anna-volkova/index.html",
    gallery: ["/projects/anna-volkova-cover.webp"],
    summary:
      "Личный сайт частного риелтора с объектами, услугами, многошаговой оценкой и понятным сценарием обращения.",
    context: "Демонстрационная концепция персонального сайта специалиста по недвижимости.",
    problem: "Пользователю сложно оценить подход специалиста и быстро сформулировать запрос.",
    objective: "Соединить доверительную презентацию, объекты и первичную квалификацию заявки.",
    solution: "Спокойный сайт с портретной подачей, фильтрами объектов и пошаговой формой оценки.",
    functionality: ["Каталог объектов", "Фильтры", "Форма оценки", "Контактные сценарии"],
    contribution: "Структура, UI, адаптивная вёрстка и интерактивные состояния.",
    services: ["Personal brand", "UX", "Frontend"],
    visualDirection: "Тёплая нейтральная палитра и архитектурная фотография.",
    development: "Статический сайт с локальными ассетами и демонстрационными формами.",
    outcome: "Готовая к презентации концепция личного сайта риелтора.",
    isConcept: true,
  },
  {
    slug: "elan-events",
    title: "Élan Events",
    previewTitle: "Élan",
    previewCategory: "События и свадьбы",
    category: "События / гостеприимство",
    projectType: "Концепт сайта",
    archiveCategory: "Сайты",
    year: 2026,
    status: "Концепт",
    featured: false,
    layout: "editorial",
    accent: "#9A7568",
    cover: "/projects/elan-cover.jpg",
    coverPosition: "center",
    demoPath: "/demos/elan-events/index.html",
    gallery: ["/projects/elan-cover.jpg"],
    summary:
      "Editorial-сайт boutique event studio для свадеб, частных событий и международных проектов.",
    context: "Концепция сайта студии камерных и destination-событий.",
    problem: "Типовой каталог услуг не передаёт режиссуру, атмосферу и масштаб работы студии.",
    objective: "Показать визуальный мир бренда и направить к содержательному запросу.",
    solution: "Фотографическая история с услугами, направлениями, процессом и формой обращения.",
    functionality: ["Портфолио событий", "Услуги", "География", "Inquiry form"],
    contribution: "Art direction, структура, responsive design и motion.",
    services: ["Art direction", "Editorial web", "Motion"],
    visualDirection: "Мягкая event-фотография, тёплые нейтралы и выразительная serif-типографика.",
    development: "Статический сайт с оптимизированной фотографией и inline-интеракциями.",
    outcome: "Цельная concept presentation для event-бренда.",
    isConcept: true,
  },
  {
    slug: "gran-education",
    title: "GRAN",
    previewTitle: "GRAN",
    previewCategory: "Образовательный центр",
    category: "Образование",
    projectType: "Концепт сайта",
    archiveCategory: "Сайты",
    year: 2026,
    status: "Концепт",
    featured: false,
    layout: "split-right",
    accent: "#5E7896",
    cover: "/projects/gran-cover.jpg",
    coverPosition: "center 42%",
    demoPath: "/demos/gran/index.html",
    gallery: ["/projects/gran-cover.jpg"],
    summary:
      "Сайт образовательного центра с программами, методом, преподавателями, пространством и записью на консультацию.",
    context: "Концепция цифровой платформы современного образовательного центра.",
    problem: "Большой объём программ и доверительных блоков легко превращается в перегруженную витрину.",
    objective: "Выстроить ясную и визуально собранную историю обучения.",
    solution: "Модульный сайт с программами, методом, командой, пространством и формой записи.",
    functionality: ["Программы", "Метод", "Преподаватели", "Запись"],
    contribution: "Информационная архитектура, visual design, 3D-акценты и frontend.",
    services: ["UX", "Web design", "3D direction"],
    visualDirection: "Тёплый белый, песочный, приглушённый синий и редакционная фотография.",
    development: "Статический адаптивный сайт с локальными медиа и reduced motion.",
    outcome: "Завершённая концепция сайта образовательного центра.",
    isConcept: true,
  },
  {
    slug: "lumen-card",
    title: "Lumen Card",
    previewTitle: "Lumen Card",
    previewCategory: "Финтех в Telegram",
    category: "Финтех / Telegram",
    projectType: "Интерактивный продукт",
    archiveCategory: "Мини-приложения Telegram",
    year: 2026,
    status: "Концепт",
    featured: false,
    layout: "compact",
    accent: "#C9E85B",
    cover: "/projects/lumen-cover.jpg",
    coverPosition: "center 42%",
    coverZoom: 1.26,
    previewDevice: "phone",
    previewDevicePosition: "center 46%",
    previewDeviceSide: "left",
    demoPath: "/demos/lumen-card/index.html",
    gallery: ["/projects/lumen-cover.jpg"],
    summary:
      "Кликабельный Telegram Mini App для виртуальной crypto-карты с балансом, обменом, оплатой и историей операций.",
    context: "Интерактивный fintech-концепт на локальных демонстрационных данных.",
    problem: "Финансовые сценарии внутри Mini App требуют плотного, но понятного мобильного интерфейса.",
    objective: "Собрать ключевые операции карты в одном последовательном продукте.",
    solution: "Mobile-first приложение с четырьмя разделами и интерактивными денежными сценариями.",
    functionality: ["Баланс", "Пополнение", "Обмен", "Оплата", "История"],
    contribution: "Product UX, UI-система, состояния и интерактивный прототип.",
    services: ["Fintech UX", "Telegram UI", "Prototype"],
    visualDirection: "Тёмный графит, тёплый белый и точечный lime-акцент.",
    development: "React/Vite single-file build с локальными mock-данными.",
    outcome: "Полностью кликабельный product concept без реальных финансовых операций.",
    isConcept: true,
  },
  {
    slug: "morozov-renovation",
    title: "Morozov",
    previewTitle: "Morozov",
    previewCategory: "Сайт для ремонта",
    category: "Услуги / ремонт",
    projectType: "Концепт сайта",
    archiveCategory: "Сайты",
    year: 2026,
    status: "Концепт",
    featured: false,
    layout: "split-left",
    accent: "#A36D45",
    cover: "/projects/morozov-cover.jpg",
    coverPosition: "center",
    demoPath: "/demos/morozov/index.html",
    gallery: ["/projects/morozov-cover.jpg"],
    summary:
      "Сайт частного мастера по ремонту с услугами, портфолио до и после, калькулятором и формой заявки.",
    context: "Концепция сайта сервисного специалиста с большим объёмом практической информации.",
    problem: "Разрозненные фотографии и списки услуг не объясняют процесс и не помогают оценить задачу.",
    objective: "Сделать предложение понятным и провести пользователя от примеров к расчёту.",
    solution: "Структурированный сайт с услугами, проектами, калькулятором и формой заявки.",
    functionality: ["Услуги", "До и после", "Калькулятор", "Форма заявки"],
    contribution: "Структура, визуальный дизайн, адаптив и frontend-интеракции.",
    services: ["UX", "Web design", "Calculator"],
    visualDirection: "Тёплые интерьерные кадры и практичная, спокойная типографика.",
    development: "Статический сайт с локальными изображениями и демонстрационной формой.",
    outcome: "Готовая concept presentation для частного специалиста.",
    isConcept: true,
  },
  {
    slug: "sfera-travel",
    title: "SFERA",
    previewTitle: "SFERA",
    previewCategory: "Авторские путешествия",
    category: "Путешествия / гостеприимство",
    projectType: "Концепт сайта",
    archiveCategory: "Сайты",
    year: 2026,
    status: "Концепт",
    featured: false,
    layout: "full",
    accent: "#7B8068",
    cover: "/projects/sfera-cover.jpg",
    coverPosition: "center",
    demoPath: "/demos/sfera/index.html",
    gallery: ["/projects/sfera-cover.jpg"],
    summary:
      "Сайт boutique travel agency с авторскими маршрутами, форматами путешествий, историями и формой подбора.",
    context: "Концепция сайта для небольшого агентства авторских путешествий.",
    problem: "Каталог направлений без редакционного контекста не передаёт характер маршрутов и сопровождения.",
    objective: "Соединить вдохновение, детали поездок и понятный запрос на подбор.",
    solution: "Атмосферный сайт с маршрутами, форматами, историями и формой брифа.",
    functionality: ["Маршруты", "Форматы", "Истории", "Форма подбора"],
    contribution: "Art direction, UX, адаптивный frontend и motion.",
    services: ["Editorial web", "Travel UX", "Motion"],
    visualDirection: "Крупный ландшафт, глубокая природная палитра и сдержанная редакционная сетка.",
    development: "Статический адаптивный сайт с локальной фотографией.",
    outcome: "Завершённая концепция digital-презентации travel-бренда.",
    isConcept: true,
  },
  {
    slug: "levante-restaurant",
    title: "LEVANTE",
    previewTitle: "LEVANTE",
    previewCategory: "Ресторан на Менорке",
    category: "Ресторан / гостеприимство",
    projectType: "Концепт сайта",
    archiveCategory: "Сайты",
    year: 2026,
    status: "Концепт",
    featured: false,
    layout: "editorial",
    accent: "#A0512D",
    cover: "/projects/levante-cover.webp",
    coverPosition: "center",
    previewImage: "/demos/levante/assets/images/hero-poster.webp",
    demoPath: "/demos/levante/index.html",
    gallery: ["/projects/levante-cover.webp"],
    summary: "Ресторанный сайт для концепта LEVANTE на побережье Менорки.",
    context: "Концепция сайта ресторана с дневным меню и атмосферой средиземноморского побережья.",
    problem: "Подача ресторана должна передавать свет, место и ритм одного дневного сервиса.",
    objective: "Собрать меню, пространство и бронирование в короткую выразительную историю.",
    solution: "Редакционный сайт с кинематографичным первым экраном, блюдами и сценарием бронирования.",
    functionality: ["Меню", "Бронирование", "История ресторана"],
    contribution: "Концепция, визуальная система, адаптивная вёрстка и интеракции.",
    services: ["Art direction", "Web design", "Frontend"],
    visualDirection: "Тёплый известняк, морской свет, терракотовый акцент и редакционная типографика.",
    development: "Статический сайт с локальными изображениями, видео и reduced motion.",
    outcome: "Завершённая концепция сайта ресторана.",
    isConcept: true,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((project) => project.featured)
    .sort(
      (first, second) =>
        (first.featuredOrder ?? 99) - (second.featuredOrder ?? 99),
    );
}

export function getArchiveProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((project) => project.slug === slug);

  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : null,
  };
}
