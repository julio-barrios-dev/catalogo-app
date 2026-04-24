import { supabase, Design } from "@/lib/supabase";
import CatalogoClient from "./CatalogoClient";

async function getDesigns(): Promise<Design[]> {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      code,
      name,
      image_path,
      categories!products_category_id_fkey ( slug ),
      subcategories!products_subcategory_id_fkey ( slug )
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
    subcategory: row.subcategories?.slug ?? "",
  }));
}

export default async function CatalogoPage() {
  const designs = await getDesigns();

  return <CatalogoClient designs={designs} />;
}
