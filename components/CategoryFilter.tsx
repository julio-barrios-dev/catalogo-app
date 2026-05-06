"use client";

import { useRef, useCallback } from "react";

// ── Inline SVG icons — consistent stroke-2 style ──────────────────────────

function IconGrid() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function IconKey() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="7.5" cy="8.5" r="4.5" /><path d="M10.9 11.9L20 21" /><path d="M17 18l2-2" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21c-4-4-7-7.5-7-11a7 7 0 1114 0c0 3.5-3 7-7 11z" /><circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function IconSparkle() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
      <path d="M19 15l.6 1.8 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6z" />
    </svg>
  );
}
function IconCross() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <line x1="12" y1="2" x2="12" y2="22" /><line x1="5" y1="8" x2="19" y2="8" />
    </svg>
  );
}

// ── Config maps ───────────────────────────────────────────────────────────

const CATEGORY_CONFIG: Record<string, { icon: React.ReactNode; label: string }> = {
  all:      { icon: <IconGrid />,  label: "Todos" },
  llaveros: { icon: <IconKey />,   label: "Llaveros" },
  pines:    { icon: <IconPin />,   label: "Pines" },
};

const SUBCATEGORY_CONFIG: Record<string, { icon: React.ReactNode; label: string }> = {
  all:        { icon: <IconStar />,    label: "Todos" },
  deportivos: { icon: <IconBolt />,    label: "Deportivos" },
  infantiles: { icon: <IconSparkle />, label: "Infantiles" },
  religiosos: { icon: <IconCross />,   label: "Religiosos" },
};

// ── Props ─────────────────────────────────────────────────────────────────

interface Props {
  categories: string[];
  categoryNames: Record<string, string>;
  subcategories: string[];
  subcategoryNames: Record<string, string>;
  activeCategory: string;
  activeSubcategory: string;
  onCategoryChange: (c: string) => void;
  onSubcategoryChange: (s: string) => void;
  variant?: "horizontal" | "vertical";
  className?: string;
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ── Chip ──────────────────────────────────────────────────────────────────

function Chip({
  icon, label, active, onClick, fullWidth = false,
}: {
  icon?: React.ReactNode; label: string; active: boolean; onClick: () => void; fullWidth?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{ touchAction: "manipulation" }}
      aria-pressed={active}
      className={`h-9 px-3.5 rounded-full border-2 flex items-center gap-1.5 text-xs font-semibold transition-all duration-150 cursor-pointer select-none ${fullWidth ? "w-full" : "shrink-0"} ${
        active
          ? "bg-gray-900 border-gray-900 text-white shadow-sm"
          : "bg-white border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-800 active:scale-95"
      }`}
    >
      {icon && <span className={active ? "text-white" : "text-gray-400"}>{icon}</span>}
      <span>{label}</span>
    </button>
  );
}

// ── Filter row — horizontal (mobile) ─────────────────────────────────────

function FilterRowHorizontal({ label, children }: { label: string; children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    if (scrollRef.current) scrollRef.current.style.cursor = "grabbing";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft.current - (x - startX.current);
  }, []);

  const stopDrag = useCallback(() => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  }, []);

  const onWheel = useCallback((e: React.WheelEvent) => {
    if (!scrollRef.current) return;
    e.preventDefault();
    scrollRef.current.scrollLeft += e.deltaY + e.deltaX;
  }, []);

  return (
    <div className="flex items-center gap-3">
      <span className="shrink-0 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap w-16">
        {label}
      </span>
      <div className="relative flex-1 min-w-0">
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5 cursor-grab select-none"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onWheel={onWheel}
        >
          {children}
        </div>
        <div className="absolute inset-y-0 right-0 w-8 bg-linear-to-l from-white to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

// ── Filter row — vertical (desktop sidebar) ───────────────────────────────

function FilterRowVertical({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────

export default function CategoryFilter({
  categories,
  categoryNames,
  subcategories,
  subcategoryNames,
  activeCategory,
  activeSubcategory,
  onCategoryChange,
  onSubcategoryChange,
  variant = "horizontal",
  className,
}: Props) {
  const FilterRow = variant === "vertical" ? FilterRowVertical : FilterRowHorizontal;
  const fullWidth = false;

  const content = (
    <>
      {subcategories.length > 0 && (
        <FilterRow label="Temática">
          <Chip
            icon={SUBCATEGORY_CONFIG["all"].icon}
            label={SUBCATEGORY_CONFIG["all"].label}
            active={activeSubcategory === "all"}
            onClick={() => onSubcategoryChange("all")}
            fullWidth={fullWidth}
          />
          {subcategories.map((sub) => {
            const cfg = SUBCATEGORY_CONFIG[sub];
            return (
              <Chip
                key={sub}
                icon={cfg?.icon}
                label={subcategoryNames[sub] || cfg?.label || capitalize(sub)}
                active={activeSubcategory === sub}
                onClick={() => onSubcategoryChange(sub)}
                fullWidth={fullWidth}
              />
            );
          })}
        </FilterRow>
      )}

      <FilterRow label="Producto">
        <Chip
          icon={CATEGORY_CONFIG["all"].icon}
          label={CATEGORY_CONFIG["all"].label}
          active={activeCategory === "all"}
          onClick={() => onCategoryChange("all")}
          fullWidth={fullWidth}
        />
        {categories.map((cat) => {
          const cfg = CATEGORY_CONFIG[cat];
          return (
            <Chip
              key={cat}
              icon={cfg?.icon}
              label={categoryNames[cat] || cfg?.label || capitalize(cat)}
              active={activeCategory === cat}
              onClick={() => onCategoryChange(cat)}
              fullWidth={fullWidth}
            />
          );
        })}
      </FilterRow>
    </>
  );

  if (variant === "vertical") {
    return <div className={`flex flex-col gap-6 px-3 pt-6 ${className ?? ""}`}>{content}</div>;
  }

  return (
    <div className={`sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm ${className ?? ""}`}>
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-2.5">
        {content}
      </div>
    </div>
  );
}
