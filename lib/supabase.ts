import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

const STORAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ?? "images";

export function getImageUrl(path: string | null): string {
  if (!path) return "/images/placeholder.jpg";
  if (path.startsWith("http")) return path;
  return `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`;
}

export interface Design {
  id: string;
  code: string;
  name: string;
  image_path: string | null;
  category: string;
  subcategory: string;
}
