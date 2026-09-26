import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import type { Article } from "@content/content";
import ArticleModal from "./ArticleModal";

type Props = {
  items: readonly Article[];
  moreLabel: string;
  closeLabel: string;
};

export default function ArticlesCarousel({ items, moreLabel, closeLabel }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = items.find((item) => item.id === activeId) ?? null;

  return (
    <>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1.08}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 22 },
          1024: { slidesPerView: 3, spaceBetween: 28 },
        }}
        className="articulos-swiper !pb-12"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="h-auto">
            <article className="flex h-full flex-col">
              <img
                src={item.image.src}
                alt={item.image.alt}
                className="aspect-[16/10] w-full rounded-[1.15rem] object-cover sm:rounded-[1.35rem]"
                width="640"
                height="400"
                loading="lazy"
                decoding="async"
              />
              <h3 className="mt-5 min-h-[3lh] text-[1.05rem] font-bold leading-snug tracking-tight text-brand-navy sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-[1.6] text-text-muted">
                {item.excerpt}
              </p>
              <button
                type="button"
                onClick={() => setActiveId(item.id)}
                className="mt-4 inline-flex items-center justify-end gap-1.5 self-end text-sm font-semibold text-brand-navy transition hover:text-brand-blue"
              >
                {moreLabel}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <ArticleModal
        article={active}
        closeLabel={closeLabel}
        onClose={() => setActiveId(null)}
      />
    </>
  );
}
