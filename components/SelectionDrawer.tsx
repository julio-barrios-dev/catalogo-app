"use client";

import Image from "next/image";
import { useSelectionStore } from "@/lib/store";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SelectionDrawer({ open, onClose }: Props) {
  const { selected, setVariation, clear } = useSelectionStore();

  const handleSend = () => {
    const url = buildWhatsAppUrl(selected);
    window.open(url, "_blank");
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 transition-opacity"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-40 shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            Selección ({selected.length})
          </h2>
          <div className="flex items-center gap-2">
            {selected.length > 0 && (
              <button
                onClick={clear}
                className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
              >
                Limpiar selección
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Cerrar"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {selected.length === 0 ? (
            <p className="text-center text-gray-400 py-12 text-sm">
              Aún no seleccionaste ningún diseño
            </p>
          ) : (
            selected.map((d) => (
              <div key={d.id} className="flex gap-3 items-start">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                  <Image
                    src="/images/placeholder.jpg"
                    alt={d.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 font-mono">{d.code}</p>
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {d.name}
                  </p>
                  <input
                    type="text"
                    placeholder="Variación / nota (opcional)"
                    value={d.variation}
                    onChange={(e) => setVariation(d.id, e.target.value)}
                    className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-300"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-4 py-4 border-t border-gray-100">
          <button
            onClick={handleSend}
            disabled={selected.length === 0}
            className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Enviar por WhatsApp
          </button>
        </div>
      </div>
    </>
  );
}
