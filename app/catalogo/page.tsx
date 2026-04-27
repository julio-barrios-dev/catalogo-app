import { Suspense } from "react";
import { supabase, Design } from "@/lib/supabase";
import CatalogoClient from "./CatalogoClient";
import CatalogoSkeleton from "./CatalogoSkeleton";

async function getDesigns(): Promise<Design[]> {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      code,
      name,
      image_path,
      categories!products_category_id_fkey ( slug, name ),
      subcategories!products_subcategory_id_fkey ( slug, name )
    `)
    .eq("active", true)
    .order("code");

  if (error) {
    console.error("Supabase error:", error.message);
    return [];
  }

  return (data ?? []).map((row: any) => ({
    id: row.id,
    code: row.code,
    name: row.name,
    image_path: row.image_path,
    category: row.categories?.slug ?? "",
    category_name: row.categories?.name ?? "",
    subcategory: row.subcategories?.slug ?? "",
    subcategory_name: row.subcategories?.name ?? "",
  }));
}

async function CatalogoData() {
  const designs = await getDesigns();
  return <CatalogoClient designs={designs} />;
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<CatalogoSkeleton />}>
      <CatalogoData />
    </Suspense>
  );
}
