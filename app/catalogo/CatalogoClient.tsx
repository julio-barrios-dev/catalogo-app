"use client";

import { useState, useMemo } from "react";
import { Design } from "@/lib/supabase";
import CategoryFilter from "@/components/CategoryFilter";
import DesignGrid from "@/components/DesignGrid";
import HeroSlider from "@/components/HeroSlider";
import SelectionDrawer from "@/components/SelectionDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function CatalogoClient({ designs }: { designs: Design[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubcategory, setActiveSubcategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const categories = useMemo(
    () => [...new Set(designs.map((d) => d.category))],
    [designs]
  );

  const availableSubcategories = useMemo(() => {
    const source =
      activeCategory === "all"
        ? designs
        : designs.filter((d) => d.category === activeCategory);
    return [...new Set(source.map((d) => d.subcategory))];
  }, [designs, activeCategory]);

  const filteredDesigns = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return designs.filter((d) => {
      const catMatch = activeCategory === "all" || d.category === activeCategory;
      const subMatch = activeSubcategory === "all" || d.subcategory === activeSubcategory;
      const searchMatch = !query || d.name.toLowerCase().includes(query) || d.code.toLowerCase().includes(query);
      return catMatch && subMatch && searchMatch;
    });
  }, [designs, activeCategory, activeSubcategory, searchQuery]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveSubcategory("all");
  };

  return (
    <div className="min-h-dvh bg-white">
      <HeroSlider />

      <header className="py-10 px-6 text-center bg-white">
        <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3">
          Catálogo
        </p>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight max-w-2xl mx-auto">
          Elegí el diseño ideal para tu evento
        </h1>
        <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto">
          Filtrá por temática, producto o buscá directamente el diseño que querés.
        </p>
        <div className="relative mt-7 max-w-lg mx-auto">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base pointer-events-none">🔍</span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar: infantiles, unicornio, religioso..."
            aria-label="Buscar diseño"
            className="w-full h-12 pl-10 pr-5 rounded-full border-2 border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
          />
        </div>
      </header>

      <CategoryFilter
        categories={categories}
        subcategories={availableSubcategories}
        activeCategory={activeCategory}
        activeSubcategory={activeSubcategory}
        onCategoryChange={handleCategoryChange}
        onSubcategoryChange={setActiveSubcategory}
      />

      <div className="pb-28">
        <div className="max-w-6xl mx-auto px-4 pt-3 pb-1">
          <p className="text-xs text-gray-400">
            {filteredDesigns.length === 0
              ? "Sin resultados para estos filtros"
              : `${filteredDesigns.length} diseño${filteredDesigns.length !== 1 ? "s" : ""} disponible${filteredDesigns.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <DesignGrid designs={filteredDesigns} />
      </div>

      <SelectionDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <WhatsAppButton onOpen={() => setDrawerOpen(true)} />
    </div>
  );
}
