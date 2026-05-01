"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelectionStore } from "@/lib/store";
import { Design, getImageUrl } from "@/lib/supabase";

export default function DesignCard({ design }: { design: Design }) {
  const { toggle, isSelected } = useSelectionStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const selected = mounted && isSelected(design.id);

  const src = getImageUrl(design.image_path);

  return (
    <button
      onClick={() => toggle(design)}
      style={{ touchAction: "manipulation" }}
      aria-pressed={selected}
      aria-label={`${design.name} — ${selected ? "seleccionado" : "no seleccionado"}`}
      className={`relative w-full rounded-xl overflow-hidden border-2 transition-all duration-200 text-left cursor-pointer ${
        selected
          ? "border-gray-900 shadow-lg scale-[1.02]"
          : "border-transparent shadow hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
      }`}
    >
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={src}
          alt={design.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {selected && (
          <div className="absolute inset-0 bg-gray-900/15 flex items-start justify-end p-2">
            <div className="bg-gray-900 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-[11px] text-gray-400 font-mono mb-0.5">{design.code}</p>
        <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">{design.name}</p>
      </div>
    </button>
  );
}
