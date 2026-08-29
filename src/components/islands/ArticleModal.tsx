import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Article, ArticleBlock } from "@content/content";

type Props = {
  article: Article | null;
  closeLabel: string;
  onClose: () => void;
};

function ArticleBody({ block }: { block: ArticleBlock }) {
  if (block.type === "h2") {
    return (
      <h3 className="mt-8 text-lg font-bold tracking-tight text-brand-navy sm:text-xl">
        {block.text}
      </h3>
    );
  }
  if (block.type === "h3") {
    return (
      <h4 className="mt-5 text-base font-bold tracking-tight text-brand-navy sm:text-[1.05rem]">
        {block.text}
      </h4>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-text-soft sm:text-[0.95rem]">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return (
    <p className="mt-3 text-sm leading-[1.7] text-text-soft sm:text-[0.95rem] sm:leading-[1.75]">
      {block.text}
    </p>
  );
}

export default function ArticleModal({ article, closeLabel, onClose }: Props) {
  useEffect(() => {
    if (!article) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [article, onClose]);

  if (!article || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-brand-navy/55"
        aria-label={closeLabel}
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[1.5rem] bg-white shadow-2xl sm:max-h-[88vh] sm:rounded-[1.5rem]">
        <div className="flex items-start justify-between gap-4 border-b border-brand-navy/10 px-5 py-4 sm:px-7">
          <h2
            id="article-modal-title"
            className="pr-6 text-lg font-bold leading-snug tracking-tight text-brand-navy sm:text-xl"
          >
            {article.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full p-1.5 text-brand-navy transition hover:bg-brand-neutral-fog"
            aria-label={closeLabel}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          <img
            src={article.image.src}
            alt={article.image.alt}
            className="mb-6 aspect-[16/9] w-full rounded-2xl object-cover"
            width="960"
            height="540"
          />
          {article.body.map((block, index) => (
            <ArticleBody key={`${block.type}-${index}`} block={block} />
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
