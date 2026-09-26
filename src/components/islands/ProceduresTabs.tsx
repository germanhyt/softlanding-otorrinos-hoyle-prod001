import { useState } from "react";

export type AlcanceTab = {
  id: string;
  label: string;
  image: { src: string; alt: string };
  procedures: readonly string[];
};

type Props = {
  tabs: readonly AlcanceTab[];
  proceduresLabel: string;
};

export default function ProceduresTabs({ tabs, proceduresLabel }: Props) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  if (!active) return null;

  return (
    <div>
      <div
        className="flex flex-wrap justify-center gap-2 sm:gap-3"
        role="tablist"
        aria-label="Áreas de atención"
      >
        {tabs.map((tab) => {
          const selected = tab.id === active.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`alcance-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`alcance-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              className={`rounded-full px-4 py-2 text-left text-[0.8rem] font-semibold leading-snug transition sm:px-5 sm:py-2.5 sm:text-sm ${
                selected
                  ? "bg-brand-navy text-white"
                  : "border border-brand-navy/15 bg-white text-text-muted hover:border-brand-navy/35 hover:text-brand-navy"
              }`}
              onClick={() => setActiveId(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`alcance-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`alcance-tab-${active.id}`}
        className="alcance-card mx-auto mt-8 w-full max-w-[68rem] overflow-hidden rounded-[1.5rem] bg-white sm:mt-10 sm:rounded-[1.75rem] lg:rounded-[2rem]"
      >
        <div className="grid md:grid-cols-2">
          <div className="alcance-photo relative min-h-[14rem] overflow-hidden sm:min-h-[16rem] md:min-h-[22rem]">
            <img
              key={active.image.src}
              src={active.image.src}
              alt={active.image.alt}
              className="h-full w-full object-cover object-[30%_50%]"
              width="720"
              height="520"
            />
          </div>

          <div className="flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
            <h3 className="text-lg font-bold tracking-tight text-brand-navy sm:text-xl">
              {proceduresLabel}
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {active.procedures.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-brand-neutral-fog px-5 py-2.5 text-sm font-medium text-text-soft sm:text-[0.95rem]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
