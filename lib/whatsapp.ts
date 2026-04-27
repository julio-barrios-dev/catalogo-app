import { SelectedDesign } from "./store";

const CATEGORY_EMOJI: Record<string, string> = {
  llaveros: "🔑",
  pines: "📌",
};

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5491178957481";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function buildWhatsAppUrl(designs: SelectedDesign[]): string {
  const grouped = designs.reduce<Record<string, SelectedDesign[]>>(
    (acc, d) => {
      const key = `${d.category}|${d.subcategory}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(d);
      return acc;
    },
    {}
  );

  const lines: string[] = ["Hola! Me interesan los siguientes diseños:", ""];

  for (const key of Object.keys(grouped)) {
    const [category, subcategory] = key.split("|");
    const emoji = CATEGORY_EMOJI[category] ?? "•";
    lines.push(
      `${emoji} *${capitalize(category)} - ${capitalize(subcategory)}*`
    );
    for (const d of grouped[key]) {
      lines.push(`- ${d.code} - ${d.name}`);
      if (d.variation) lines.push(`  Variación: ${d.variation}`);
    }
    lines.push("");
  }

  lines.push("Quedo a la espera, gracias!");

  const message = lines.join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
