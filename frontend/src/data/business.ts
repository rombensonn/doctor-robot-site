export const business = {
  siteUrl: "https://example.ru",
  name: "Доктор Робот",
  legalNamePlaceholder: "[Юридическое наименование]",
  city: "Москва",
  address: "Москва, Салтыковская ул., 51, помещение 11/1",
  streetAddress: "Салтыковская ул., 51, помещение 11/1",
  phone: "+7 (905) 557-40-46",
  phoneHref: "tel:+79055574046",
  phoneDigits: "79055574046",
  whatsapp:
    "https://wa.me/79055574046?text=Здравствуйте,%20хочу%20получить%20консультацию%20по%20ремонту%20коробки",
  // Замените на реальный username или ссылку на бота/канал после подключения Telegram.
  telegram: "https://t.me/doctor_robot_placeholder",
  coordinates: {
    latitude: 55.745025,
    longitude: 37.881849,
  },
  rating: {
    value: 4.2,
    ratingCount: 9,
    reviewCount: 10,
  },
  scheduleNote: "Уточните актуальное время работы по телефону перед визитом.",
  openNowText: "Открыто до 20:00",
  features: [
    "Предварительная запись",
    "Оплата картой",
    "Наличные",
    "Гарантия",
    "Ремонт DSG",
    "Ремонт вариатора",
    "Ремонт гидротрансформаторов",
    "Ремонт маховика",
    "Ремонт гидроблока",
    "Можно с животными",
    "Частичная доступность для людей на инвалидной коляске",
  ],
  analytics: {
    yandexMetricaId: "",
    googleTagManagerId: "",
    callTrackingId: "",
  },
  nav: [
    { label: "Услуги", href: "/services" },
    { label: "Цены", href: "/prices" },
    { label: "Диагностика", href: "/diagnostics" },
    { label: "Отзывы", href: "/reviews" },
    { label: "Контакты", href: "/contacts" },
  ],
} as const;

export const advantages = [
  "DSG, Powershift, DCT, CVT",
  "Гарантия на работы и запчасти",
  "Запчасти по популярным коробкам",
  "Предварительная запись",
  "Москва, Салтыковская ул., 51",
];

export const trustFacts = [
  "Узкая специализация на коробках передач",
  "Работа с DSG, Powershift, DCT и CVT",
  "Не предлагаем замену коробки без диагностики",
  "Показываем и объясняем неисправность",
  "Даем гарантию на работы и запчасти",
  "Предварительная запись",
  "Оплата картой и наличными",
];
