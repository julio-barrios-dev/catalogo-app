"use client";

interface Props {
  categories: string[];
  subcategories: string[];
  activeCategory: string;
  activeSubcategory: string;
  onCategoryChange: (c: string) => void;
  onSubcategoryChange: (s: string) => void;
}

const CATEGORY_EMOJI: Record<string, string> = {
  llaveros: "🔑",
  pines: "📌",
};

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function CategoryFilter({
  categories,
  subcategories,
  activeCategory,
  activeSubcategory,
  onCategoryChange,
  onSubcategoryChange,
}: Props) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 space-y-2">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => onCategoryChange("all")}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {CATEGORY_EMOJI[cat]} {capitalize(cat)}
            </button>
          ))}
        </div>

        {subcategories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => onSubcategoryChange("all")}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                activeSubcategory === "all"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              Todos
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => onSubcategoryChange(sub)}
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeSubcategory === sub
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {capitalize(sub)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
