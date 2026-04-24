"use client";

import { useState, useMemo } from "react";
import { Design } from "@/lib/supabase";
import CategoryFilter from "@/components/CategoryFilter";
import DesignGrid from "@/components/DesignGrid";
import SelectionDrawer from "@/components/SelectionDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function CatalogoClient({ designs }: { designs: Design[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubcategory, setActiveSubcategory] = useState("all");
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
    return designs.filter((d) => {
      const catMatch =
        activeCategory === "all" || d.category === activeCategory;
      const subMatch =
        activeSubcategory === "all" || d.subcategory === activeSubcategory;
      return catMatch && subMatch;
    });
  }, [designs, activeCategory, activeSubcategory]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveSubcategory("all");
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="max-w-6xl mx-auto px-4 py-5">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Catálogo
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Seleccioná los diseños que te interesan
        </p>
      </header>

      <CategoryFilter
        categories={categories}
        subcategories={availableSubcategories}
        activeCategory={activeCategory}
        activeSubcategory={activeSubcategory}
        onCategoryChange={handleCategoryChange}
        onSubcategoryChange={setActiveSubcategory}
      />

      <DesignGrid designs={filteredDesigns} />

      <SelectionDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <WhatsAppButton onOpen={() => setDrawerOpen(true)} />
    </div>
  );
}
