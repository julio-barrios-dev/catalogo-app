"use client";

import DesignCard from "./DesignCard";
import { Design } from "@/lib/supabase";

export default function DesignGrid({ designs }: { designs: Design[] }) {
  if (designs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <p className="text-lg">No hay diseños en esta categoría</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-4 max-w-6xl mx-auto">
      {designs.map((design) => (
        <DesignCard key={design.id} design={design} />
      ))}
    </div>
  );
}
