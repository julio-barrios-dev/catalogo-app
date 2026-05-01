"use client";

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
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ── Chip components ───────────────────────────────────────────────────────

function Chip({
  icon, label, active, onClick,
}: {
  icon?: React.ReactNode; label: string; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{ touchAction: "manipulation" }}
      aria-pressed={active}
      className={`shrink-0 h-9 px-3.5 rounded-full border-2 flex items-center gap-1.5 text-xs font-semibold transition-all duration-150 cursor-pointer select-none ${
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

// ── Filter row ────────────────────────────────────────────────────────────

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="shrink-0 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap w-16">
        {label}
      </span>
      <div className="relative flex-1 min-w-0">
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
          {children}
        </div>
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
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
}: Props) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-2.5">

        {subcategories.length > 0 && (
          <FilterRow label="Temática">
            <Chip
              icon={SUBCATEGORY_CONFIG["all"].icon}
              label={SUBCATEGORY_CONFIG["all"].label}
              active={activeSubcategory === "all"}
              onClick={() => onSubcategoryChange("all")}
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
              />
            );
          })}
        </FilterRow>

      </div>
    </div>
  );
}
