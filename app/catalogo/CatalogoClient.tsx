"use client";

import { useState, useMemo } from "react";
import { Design } from "@/lib/supabase";
import { useSelectionStore } from "@/lib/store";
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
  const selectionCount = useSelectionStore((s) => s.selected.length);

  const categories = useMemo(
    () => [...new Set(designs.map((d) => d.category))],
    [designs]
  );

  const categoryNames = useMemo(() => {
    const map: Record<string, string> = {};
    designs.forEach((d) => { if (d.category) map[d.category] = d.category_name; });
    return map;
  }, [designs]);

  const availableSubcategories = useMemo(() => {
    const source =
      activeCategory === "all"
        ? designs
        : designs.filter((d) => d.category === activeCategory);
    return [...new Set(source.map((d) => d.subcategory))];
  }, [designs, activeCategory]);

  const subcategoryNames = useMemo(() => {
    const source =
      activeCategory === "all"
        ? designs
        : designs.filter((d) => d.category === activeCategory);
    const map: Record<string, string> = {};
    source.forEach((d) => { if (d.subcategory) map[d.subcategory] = d.subcategory_name; });
    return map;
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
          Catálogo Souvenir Exacto
        </p>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight max-w-2xl mx-auto">
          Elegí el diseño ideal para tu evento
        </h1>
        <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto">
          Todos los diseños son personalizables. Elegí uno o más, filtrá por temática o buscá directamente lo que querés.
        </p>

        {/* Custom design CTA */}
        <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-3 bg-amber-50 border border-amber-100 rounded-2xl px-5 py-4 max-w-xl mx-auto">
          <p className="text-sm text-gray-600 text-center sm:text-left">
            ¿No encontrás lo que buscás?{" "}
            <span className="font-semibold text-gray-800">
              Creamos un diseño desde cero
            </span>{" "}
            para vos.
          </p>
          <a
            href={`https://wa.me/5491178957481?text=${encodeURIComponent("Hola! Me gustaría consultar sobre un diseño personalizado desde cero.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold text-sm rounded-full px-4 py-2 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Consultar
          </a>
        </div>

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
        categoryNames={categoryNames}
        subcategories={availableSubcategories}
        subcategoryNames={subcategoryNames}
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

      {/* Floating custom-design WhatsApp button — only when no designs selected */}
      {selectionCount === 0 && (
        <a
          href={`https://wa.me/5491178957481?text=${encodeURIComponent("Hola! Me gustaría consultar sobre un diseño personalizado desde cero.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-20 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-full px-4 py-3 shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
          aria-label="Consultar diseño personalizado por WhatsApp"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="text-sm font-semibold pr-1">Diseño desde cero</span>
        </a>
      )}
    </div>
  );
}
