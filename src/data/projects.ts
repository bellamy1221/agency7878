export type ProjectStatus = "Коммерческий проект" | "Концепция" | "Эксперимент";

export type ArchiveCategory = "Сайты" | "Telegram" | "Интерфейсы" | "Эксперименты";

export type ProjectLayout = "full" | "split-left" | "split-right" | "compact" | "editorial";

export interface Project {
  slug: string;
  title: string;
  shortTitle?: string;
  category: string;
  archiveCategory: ArchiveCategory;
  year: number;
  status: ProjectStatus;
  featured: boolean;
  featuredOrder?: number;
  layout: ProjectLayout;
  accent: string;
  cover: string;
  gallery: string[];
  /** Short card blurb */
  summary: string;
  /** Business context */
  context: string;
  /** User / client problem */
  problem: string;
  /** Project objective */
  objective: string;
  /** Design solution */
  solution: string;
  /** What the product does */
  functionality: string[];
  /** What TSBLV delivered */
  contribution: string;
  services: string[];
  visualDirection: string;
  development: string;
  outcome: string;
  isConcept: boolean;
}

export const projects: Project[] = [
  {
    slug: "sol-restaurant",
    title: "Ресторан «Соль»",
    shortTitle: "Соль",
    category: "Сайт / Ресторан",
    archiveCategory: "Сайты",
    year: 2025,
    status: "Концепция",
    featured: true,
    featuredOrder: 1,
    layout: "full",
    accent: "#C65D3A",
    cover: "https://picsum.photos/seed/tsblv-sol-dining/1600/1100",
    gallery: [
      "https://picsum.photos/seed/tsblv-sol-interior/1400/900",
      "https://picsum.photos/seed/tsblv-sol-menu/1400/900",
      "https://picsum.photos/seed/tsblv-sol-mobile/900/1400",
    ],
    summary:
      "Сайт ресторана: атмосфера, меню, события и бронь стола без лишних кликов.",
    context:
      "Небольшой городской ресторан с сезонной кухней. Гости узнают о месте из соцсетей и часто ищут меню и свободный стол с телефона.",
    problem:
      "Старый сайт не передавал характер зала, меню было в PDF, а бронь уходила в переписку. События почти не замечали.",
    objective:
      "Показать атмосферу, удобно открыть меню, анонсировать вечера и упростить бронирование стола.",
    solution:
      "Тёплый editorial-сайт с крупными кадрами, живым меню по разделам, блоком событий и короткой формой брони на главной и в меню.",
    functionality: [
      "Атмосферная главная с понятным следующим шагом",
      "Меню с ценами и категориями",
      "Анонсы вечеров и спецпредложений",
      "Форма бронирования стола",
    ],
    contribution:
      "Структура, дизайн, адаптивная вёрстка, форма брони с уведомлением и подготовка к публикации.",
    services: ["Дизайн", "Вёрстка", "Меню", "Форма брони"],
    visualDirection:
      "Тёплый свет, крупные фото еды и зала, спокойная типографика, один яркий акцент на действиях.",
    development:
      "Быстрый адаптивный сайт, оптимизация изображений, форма заявки без тяжёлой админки.",
    outcome:
      "Гость за минуту понимает формат места, смотрит меню и оставляет бронь. Концепция готова к наполнению реальными фото.",
    isConcept: true,
  },
  {
    slug: "hrebet-hotel",
    title: "Отель «Хребет»",
    shortTitle: "Хребет",
    category: "Сайт / Отель",
    archiveCategory: "Сайты",
    year: 2025,
    status: "Концепция",
    featured: true,
    featuredOrder: 2,
    layout: "split-left",
    accent: "#3D4F5F",
    cover: "https://picsum.photos/seed/tsblv-hrebet-mountain/1600/1100",
    gallery: [
      "https://picsum.photos/seed/tsblv-hrebet-rooms/1400/900",
      "https://picsum.photos/seed/tsblv-hrebet-lobby/1400/900",
      "https://picsum.photos/seed/tsblv-hrebet-mobile/900/1400",
    ],
    summary:
      "Сайт горного отеля: номера, локация, ответы на частые вопросы и путь к брони.",
    context:
      "Небольшой отель у горного маршрута. Брони часто идут через сообщения, гости заранее спрашивают про дорогу, завтрак и разницу номеров.",
    problem:
      "Информация размазана по чатам и устаревшей странице. Сложно сравнить номера и быстро оставить запрос на даты.",
    objective:
      "Показать номера и место, закрыть типовые вопросы и привести к запросу бронирования.",
    solution:
      "Спокойная структура: виды, номера, удобства, как добраться, FAQ и форма запроса дат на каждой карточке номера.",
    functionality: [
      "Обзор отеля и локации",
      "Каталог номеров с отличиями",
      "Блок ответов на частые вопросы",
      "Запрос бронирования по датам",
    ],
    contribution:
      "Информационная архитектура, дизайн страниц, frontend и настройка форм запроса.",
    services: ["Структура", "Дизайн", "Frontend", "FAQ"],
    visualDirection:
      "Широкий кадр, воздух в вёрстке, палитра камня и хвои, спокойный ритм без туристического шума.",
    development:
      "Многостраничный адаптивный сайт, галереи номеров, валидация дат в форме.",
    outcome:
      "Гость сравнивает номера, находит ответы и оставляет запрос без лишней переписки.",
    isConcept: true,
  },
  {
    slug: "alina-vesna",
    title: "Алина Весна",
    shortTitle: "Алина",
    category: "Сайт / Косметолог",
    archiveCategory: "Сайты",
    year: 2025,
    status: "Концепция",
    featured: true,
    featuredOrder: 3,
    layout: "editorial",
    accent: "#8B5E3C",
    cover: "https://picsum.photos/seed/tsblv-alina-cosmo/1600/1100",
    gallery: [
      "https://picsum.photos/seed/tsblv-alina-services-cosmo/1400/900",
      "https://picsum.photos/seed/tsblv-alina-trust/1400/900",
      "https://picsum.photos/seed/tsblv-alina-booking/900/1400",
    ],
    summary:
      "Личный сайт косметолога: доверие, услуги, запись на приём и понятный следующий шаг.",
    context:
      "Частный косметолог ведёт приём и набор клиентов через Instagram. Люди спрашивают про услуги, цены и свободные окна в Direct.",
    problem:
      "В соцсетях красиво, но нет спокойной страницы, где понятны услуги, противопоказания и как записаться. Заявки теряются в переписке.",
    objective:
      "Собрать доверие, показать услуги и направить к короткой записи на консультацию или процедуру.",
    solution:
      "Личный сайт с ясным оффером, списком услуг, блоком доверия и формой записи без лишней медицинской терминологии.",
    functionality: [
      "Презентация специалиста",
      "Каталог услуг",
      "Блок доверия и ответов",
      "Форма записи на приём",
    ],
    contribution:
      "Структура, дизайн, вёрстка, форма записи и подготовка к публикации.",
    services: ["Личный сайт", "Услуги", "Запись", "Адаптив"],
    visualDirection:
      "Светлый спокойный тон, крупные портретные и процедурные кадры, акцент на доверии и ясности.",
    development:
      "Лёгкий сайт, адаптив, форма с уведомлением в Telegram.",
    outcome:
      "Клиент понимает услуги и оставляет запись без долгой переписки.",
    isConcept: true,
  },
  {
    slug: "stol-mini",
    title: "Стол",
    category: "Telegram Mini App",
    archiveCategory: "Telegram",
    year: 2025,
    status: "Концепция",
    featured: true,
    featuredOrder: 4,
    layout: "split-right",
    accent: "#2F6FED",
    cover: "https://picsum.photos/seed/tsblv-stol-telegram/1600/1100",
    gallery: [
      "https://picsum.photos/seed/tsblv-stol-flow/1400/900",
      "https://picsum.photos/seed/tsblv-stol-screens/1400/900",
      "https://picsum.photos/seed/tsblv-stol-mobile/900/1400",
    ],
    summary:
      "Mini App для локального кафе: бронь стола, заказ навынос и простая программа лояльности.",
    context:
      "Городское кафе принимает бронь и заказы в Telegram-чате. Постоянные гости просят «как в прошлый раз», а администратор тонет в сообщениях.",
    problem:
      "Заявки приходят текстом без структуры. Сложно видеть занятость, статусы заказа и накопленные бонусы.",
    objective:
      "Собрать бронь, заказ и лояльность в одном Mini App рядом с привычным чатом.",
    solution:
      "Компактное приложение внутри Telegram: выбор сценария, короткие формы, статусы и карта лояльности без отдельного сайта.",
    functionality: [
      "Бронь стола на дату и время",
      "Заказ навынос с составом",
      "Статусы для гостя",
      "Простая карта лояльности",
    ],
    contribution:
      "Сценарии, UI Mini App, адаптация под Telegram и связка уведомлений для администратора.",
    services: ["UX", "UI", "Telegram Mini App"],
    visualDirection:
      "Плотный, спокойный интерфейс в духе мессенджера: без декоративного шума, с ясными кнопками действий.",
    development:
      "Интерфейс Mini App, валидация форм, прототип статусов и уведомлений.",
    outcome:
      "Гость оформляет действие за минуту, администратор получает структурированную заявку.",
    isConcept: true,
  },
  {
    slug: "primerochnaya",
    title: "Примерочная",
    shortTitle: "Примерочная",
    category: "Веб-сервис / Конфигуратор",
    archiveCategory: "Интерфейсы",
    year: 2025,
    status: "Концепция",
    featured: true,
    featuredOrder: 5,
    layout: "compact",
    accent: "#8B6914",
    cover: "https://picsum.photos/seed/tsblv-primer-room/1600/1100",
    gallery: [
      "https://picsum.photos/seed/tsblv-primer-catalog/1400/900",
      "https://picsum.photos/seed/tsblv-primer-materials/1400/900",
      "https://picsum.photos/seed/tsblv-primer-mobile/900/1400",
    ],
    summary:
      "Интерактивный конфигуратор, в котором пользователь собирает комнату, добавляет мебель, меняет материалы и получает ориентировочную стоимость.",
    context:
      "Мебельная студия показывает каталог на сайте, но клиенту сложно представить набор в своей комнате. Заявки часто приходят без понимания бюджета и состава.",
    problem:
      "Клиент листает фото, но не собирает своё решение. Менеджер тратит время на уточнения, которые можно было закрыть на экране.",
    objective:
      "Помочь мебельной студии вовлечь клиента в выбор, наглядно показать будущий интерьер и получить более подготовленную заявку.",
    solution:
      "Конфигуратор комнаты: план, каталог мебели, материалы, живая оценка стоимости и сохранение сценария перед заявкой. В портфолио - превью интерфейса, не полный продукт.",
    functionality: [
      "План комнаты",
      "Каталог мебели",
      "Drag and drop",
      "Поворот и масштаб",
      "Выбор материалов и цвета",
      "Живая оценка стоимости",
      "Сохранённая конфигурация",
      "Отправка заявки",
    ],
    contribution:
      "Проектирование сценария, UI конфигуратора, слои интерфейса и каркас взаимодействия для портфолио-концепции.",
    services: ["Product UI", "Конфигуратор", "Frontend-концепт"],
    visualDirection:
      "Светлый продуктовый интерфейс, спокойная сетка, акценты на инструментах и превью комнаты.",
    development:
      "Слои UI и интерактивное превью без полной логики конфигуратора. Акцент на ясности сценария.",
    outcome:
      "Клиент видит, как студия может вовлечь покупателя в выбор и получить более точную заявку.",
    isConcept: true,
  },
  {
    slug: "type-rhythm",
    title: "Ритм набора",
    category: "Эксперимент / Typography",
    archiveCategory: "Эксперименты",
    year: 2025,
    status: "Эксперимент",
    featured: false,
    layout: "compact",
    accent: "#141413",
    cover: "https://picsum.photos/seed/tsblv-type-rhythm/1200/900",
    gallery: ["https://picsum.photos/seed/tsblv-type-rhythm-2/1200/900"],
    summary: "Эксперимент с крупной типографикой и модульными отступами для лендингов.",
    context: "Внутренний визуальный эксперимент студии.",
    problem: "Нужно проверить читаемость крупного текста на телефоне.",
    objective: "Собрать рабочие приёмы шкалы и интерлиньяжа.",
    solution: "Серия экранов с разными ритмами строк.",
    functionality: ["Типографические модули"],
    contribution: "Исследовательский набор приёмов.",
    services: ["Эксперимент"],
    visualDirection: "Монохром, акцент на ритме.",
    development: "Статичные экраны.",
    outcome: "Приёмы для будущих клиентских лендингов.",
    isConcept: true,
  },
  {
    slug: "ugol-cafe",
    title: "Кафе «Угол»",
    category: "Сайт / Локальный бизнес",
    archiveCategory: "Сайты",
    year: 2024,
    status: "Концепция",
    featured: false,
    layout: "compact",
    accent: "#8B5E3C",
    cover: "https://picsum.photos/seed/tsblv-cafe-ugol/1200/900",
    gallery: ["https://picsum.photos/seed/tsblv-cafe-ugol-2/1200/900"],
    summary: "Короткий сайт локального кафе: меню, часы, карта.",
    context: "Небольшое кафе в жилом районе.",
    problem: "Устаревшая одностраничка без актуального меню.",
    objective: "Быстрая понятная страница вместо хаоса.",
    solution: "Один экран с меню и контактами.",
    functionality: ["Меню", "Часы работы", "Контакты"],
    contribution: "Дизайн и вёрстка мини-сайта.",
    services: ["Лендинг"],
    visualDirection: "Тёплый локальный характер.",
    development: "Статический лендинг.",
    outcome: "Простой шаблон для локального места.",
    isConcept: true,
  },
  {
    slug: "status-cards",
    title: "Карточки статуса",
    category: "Telegram / Эксперимент",
    archiveCategory: "Эксперименты",
    year: 2024,
    status: "Эксперимент",
    featured: false,
    layout: "compact",
    accent: "#2F6FED",
    cover: "https://picsum.photos/seed/tsblv-status-cards/1200/900",
    gallery: ["https://picsum.photos/seed/tsblv-status-cards-2/1200/900"],
    summary: "Эксперимент со статусами заказа внутри Telegram.",
    context: "Прототип для будущих Mini App.",
    problem: "Клиенты спрашивают статус вручную.",
    objective: "Показать ясный статус без длинного текста.",
    solution: "Короткие карточки статусов.",
    functionality: ["Список статусов"],
    contribution: "UI-прототип.",
    services: ["Прототип"],
    visualDirection: "Плотный utility-интерфейс.",
    development: "Статичный прототип.",
    outcome: "Заготовка сценария для Mini App.",
    isConcept: true,
  },
  {
    slug: "form-states",
    title: "Состояния форм",
    category: "Интерфейс / Система",
    archiveCategory: "Интерфейсы",
    year: 2025,
    status: "Эксперимент",
    featured: false,
    layout: "compact",
    accent: "#C65D3A",
    cover: "https://picsum.photos/seed/tsblv-form-states/1200/900",
    gallery: ["https://picsum.photos/seed/tsblv-form-states-2/1200/900"],
    summary: "Набор аккуратных состояний полей и кнопок для клиентских сайтов.",
    context: "Внутренний UI-эксперимент.",
    problem: "Формы на сайтах часто выглядят чужеродно.",
    objective: "Единый язык ошибок, фокуса и успеха.",
    solution: "Компонентный набор состояний.",
    functionality: ["Поля", "Ошибки", "Успех"],
    contribution: "Переиспользуемый UI-слой.",
    services: ["UI"],
    visualDirection: "Светлый editorial UI.",
    development: "Компоненты без бэкенда.",
    outcome: "База для форм в проектах студии.",
    isConcept: true,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const featured = getFeaturedProjects();
  const index = featured.findIndex((p) => p.slug === slug);
  if (index === -1) {
    const allIndex = projects.findIndex((p) => p.slug === slug);
    return {
      prev: allIndex > 0 ? projects[allIndex - 1] : null,
      next: allIndex < projects.length - 1 ? projects[allIndex + 1] : null,
    };
  }
  return {
    prev: index > 0 ? featured[index - 1] : null,
    next: index < featured.length - 1 ? featured[index + 1] : null,
  };
}
