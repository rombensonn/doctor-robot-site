import { motion } from "framer-motion";
import { galleryItems } from "../data/gallery";

export const GalleryBlock = () => (
  <section className="section">
    <div className="container-px mx-auto max-w-7xl">
      <div className="section-head">
        <p className="eyebrow">Галерея</p>
        <h2>Фото сервиса и работ</h2>
        <p>
          Здесь можно разместить реальные фотографии диагностики, ремонтной зоны, узлов трансмиссии и процесса
          адаптации. Пока стоят аккуратные заглушки.
        </p>
      </div>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {galleryItems.map((item, index) => (
          <motion.article
            key={item.src}
            className="gallery-card"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.22, delay: index * 0.04 }}
          >
            <img src={item.src} width="960" height="640" loading="lazy" alt={item.alt} />
            <div className="p-4">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
