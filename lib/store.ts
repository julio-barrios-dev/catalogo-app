import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SelectedDesign {
  id: string;
  code: string;
  name: string;
  category: string;
  subcategory: string;
  variation: string;
}

interface SelectionStore {
  selected: SelectedDesign[];
  toggle: (design: Omit<SelectedDesign, "variation">) => void;
  setVariation: (id: string, variation: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
}

export const useSelectionStore = create<SelectionStore>()(
  persist(
    (set, get) => ({
      selected: [],
      toggle: (design) => {
        const existing = get().selected.find((d) => d.id === design.id);
        if (existing) {
          set({ selected: get().selected.filter((d) => d.id !== design.id) });
        } else {
          set({ selected: [...get().selected, { ...design, variation: "" }] });
        }
      },
      setVariation: (id, variation) => {
        set({
          selected: get().selected.map((d) =>
            d.id === id ? { ...d, variation } : d
          ),
        });
      },
      remove: (id) => set({ selected: get().selected.filter((d) => d.id !== id) }),
      clear: () => set({ selected: [] }),
      isSelected: (id) => get().selected.some((d) => d.id === id),
    }),
    { name: "catalogo-selection" }
  )
);
