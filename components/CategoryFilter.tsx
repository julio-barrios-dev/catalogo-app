"use client";

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

// Editá iconos y etiquetas acá
const CATEGORY_CONFIG: Record<string, { icon: string; label: string }> = {
  all:      { icon: "🛍️", label: "Todos" },
  llaveros: { icon: "🔑", label: "Llaveros" },
  pines:    { icon: "📌", label: "Pines" },
};

const SUBCATEGORY_CONFIG: Record<string, { icon: string; label: string }> = {
  all:        { icon: "⭐", label: "Todos" },
  deportivos: { icon: "⚽", label: "Deportivos" },
  infantiles: { icon: "🦄", label: "Infantiles" },
  religiosos: { icon: "🕊️", label: "Religiosos" },
};

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function ThemeChip({ icon, label, active, onClick }: {
  icon: string; label: string; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{ touchAction: "manipulation" }}
      aria-pressed={active}
      className={`shrink-0 h-9 px-3 rounded-full border-2 flex items-center gap-1.5 text-xs font-bold transition-all duration-150 cursor-pointer ${
        active
          ? "bg-gray-900 border-gray-900 text-white shadow-sm"
          : "bg-white border-gray-200 text-gray-600 hover:border-gray-400 active:scale-95"
      }`}
    >
      <span className="text-sm leading-none">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function ProductChip({ label, active, onClick }: {
  label: string; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{ touchAction: "manipulation" }}
      aria-pressed={active}
      className={`shrink-0 h-9 px-4 rounded-full border-2 text-xs font-bold transition-all duration-150 cursor-pointer ${
        active
          ? "bg-amber-400 border-amber-400 text-white shadow-sm"
          : "bg-white border-gray-200 text-gray-600 hover:border-gray-400 active:scale-95"
      }`}
    >
      {label}
    </button>
  );
}

function FilterRow({
  step, label, children,
}: {
  step: number; label: string; children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      {/* Badge + label — fixed, no scroll */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="w-5 h-5 rounded-full bg-gray-900 text-white text-[10px] font-black flex items-center justify-center">
          {step}
        </span>
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-wide whitespace-nowrap">
          {label}
        </span>
      </div>

      {/* Scrollable chips with right fade */}
      <div className="relative flex-1 min-w-0">
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
          {children}
        </div>
        <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

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

        {/* Step 1 — Temática */}
        {subcategories.length > 0 && (
          <FilterRow step={1} label="Temática">
            <ThemeChip
              icon={SUBCATEGORY_CONFIG["all"].icon}
              label={SUBCATEGORY_CONFIG["all"].label}
              active={activeSubcategory === "all"}
              onClick={() => onSubcategoryChange("all")}
            />
            {subcategories.map((sub) => {
              const cfg = SUBCATEGORY_CONFIG[sub];
              return (
                <ThemeChip
                  key={sub}
                  icon={cfg?.icon ?? "🏷️"}
                  label={subcategoryNames[sub] || cfg?.label || capitalize(sub)}
                  active={activeSubcategory === sub}
                  onClick={() => onSubcategoryChange(sub)}
                />
              );
            })}
          </FilterRow>
        )}

        {/* Step 2 — Producto */}
        <FilterRow step={subcategories.length > 0 ? 2 : 1} label="Producto">
          <ProductChip
            label={CATEGORY_CONFIG["all"].label}
            active={activeCategory === "all"}
            onClick={() => onCategoryChange("all")}
          />
          {categories.map((cat) => {
            const cfg = CATEGORY_CONFIG[cat];
            return (
              <ProductChip
                key={cat}
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
