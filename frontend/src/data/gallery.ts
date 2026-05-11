const assetBase = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

export const galleryItems = [
  {
    src: `${assetBase}gallery/diagnostics-placeholder.jpg`,
    alt: "Заглушка фото зоны диагностики коробки передач",
    title: "Диагностика коробки",
    text: "Проверка ошибок, симптомов и поведения коробки до согласования ремонта.",
  },
  {
    src: `${assetBase}gallery/workshop-placeholder.jpg`,
    alt: "Заглушка фото ремонтного поста автосервиса",
    title: "Ремонтный пост",
    text: "Работы по сцеплениям, мехатроникам, гидроблокам и механической части.",
  },
  {
    src: `${assetBase}gallery/parts-placeholder.jpg`,
    alt: "Заглушка фото узлов роботизированной коробки передач",
    title: "Узлы трансмиссии",
    text: "Показываем неисправные детали и объясняем, что именно требует ремонта.",
  },
  {
    src: `${assetBase}gallery/adaptation-placeholder.jpg`,
    alt: "Заглушка фото адаптации коробки передач после ремонта",
    title: "Адаптация",
    text: "После установки проверяем работу коробки и даем рекомендации.",
  },
];
