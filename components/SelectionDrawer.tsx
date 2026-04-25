"use client";

import Image from "next/image";
import { useSelectionStore } from "@/lib/store";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { getImageUrl } from "@/lib/supabase";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SelectionDrawer({ open, onClose }: Props) {
  const { selected, setVariation, remove, clear } = useSelectionStore();

  const handleSend = () => {
    const url = buildWhatsAppUrl(selected);
    window.open(url, "_blank");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Selección de diseños"
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-40 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            Selección ({selected.length})
          </h2>
          <div className="flex items-center gap-1">
            {selected.length > 0 && (
              <button
                onClick={clear}
                style={{ touchAction: "manipulation" }}
                className="min-h-11 px-3 text-xs text-gray-400 hover:text-gray-700 transition-colors cursor-pointer rounded-lg hover:bg-gray-50"
              >
                Limpiar
              </button>
            )}
            {/* Close — min 44×44px touch target */}
            <button
              onClick={onClose}
              style={{ touchAction: "manipulation" }}
              aria-label="Cerrar panel"
              className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {selected.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2 text-gray-400">
              <svg className="w-10 h-10 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <p className="text-sm">Aún no seleccionaste ningún diseño</p>
            </div>
          ) : (
            selected.map((d) => (
              <div key={d.id} className="flex gap-3 items-start">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">

                  <Image
                    src={getImageUrl(null)}
                    alt={d.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 font-mono">{d.code}</p>
                  <p className="text-sm font-medium text-gray-800 truncate">{d.name}</p>
                  <label
                    htmlFor={`variation-${d.id}`}
                    className="block mt-2 text-xs text-gray-400 mb-0.5"
                  >
                    Variación / nota
                  </label>
                  <input
                    id={`variation-${d.id}`}
                    type="text"
                    placeholder="Ej: sin fondo, color rojo..."
                    value={d.variation}
                    onChange={(e) => setVariation(d.id, e.target.value)}
                    className="w-full min-h-9 text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder:text-gray-300"
                  />
                </div>
                <button
                  onClick={() => remove(d.id)}
                  style={{ touchAction: "manipulation" }}
                  aria-label={`Eliminar ${d.name}`}
                  className="w-11 h-11 -mr-2 shrink-0 flex items-center justify-center rounded-xl text-gray-300 hover:text-red-400 hover:bg-red-50 active:bg-red-100 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* CTA */}
        <div className="px-4 py-4 border-t border-gray-100 safe-area-bottom">
          <button
            onClick={handleSend}
            disabled={selected.length === 0}
            style={{ touchAction: "manipulation" }}
            className="w-full min-h-12 bg-green-500 hover:bg-green-600 active:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Enviar por WhatsApp
          </button>
        </div>
      </div>
    </>
  );
}
