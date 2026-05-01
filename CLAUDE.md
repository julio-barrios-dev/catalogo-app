@AGENTS.md

# Catalogo App — Contexto del Proyecto

## Propósito

Aplicación de catálogo digital para **Souvenir Exacto**, un negocio de souvenirs personalizados (llaveros y pines). Los usuarios navegan diseños, seleccionan los que les interesan, agregan notas de variación, y envían el pedido por WhatsApp.

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16.2.4 (App Router, TypeScript, Turbopack) |
| UI | React 19, Tailwind CSS v4 |
| Estado global | Zustand 5 con persistencia en localStorage |
| Base de datos | Supabase (PostgreSQL) |
| Imágenes | Supabase Storage bucket `products` |
| Analytics | @vercel/analytics |
| Contacto | WhatsApp Web API (wa.me) |

## Estructura de carpetas

```
catalogo-app/
├── app/
│   ├── catalogo/
│   │   ├── page.tsx            # SSR con Suspense — fetches Supabase
│   │   ├── CatalogoClient.tsx  # Client component: filtros, búsqueda, grid
│   │   └── CatalogoSkeleton.tsx
│   ├── layout.tsx              # Root layout con Analytics
│   ├── page.tsx                # Redirect a /catalogo
│   └── globals.css
├── components/
│   ├── CategoryFilter.tsx      # Tabs de categoría y subcategoría (2 niveles)
│   ├── DesignCard.tsx          # Card con selección, código, nombre
│   ├── DesignGrid.tsx          # Grid responsivo 2/3/4 columnas
│   ├── HeroSlider.tsx          # Carrusel auto-rotativo con touch
│   ├── SelectionDrawer.tsx     # Drawer derecho con diseños seleccionados
│   └── WhatsAppButton.tsx      # Botón flotante con badge de conteo
├── lib/
│   ├── store.ts                # Zustand store (selectedDesigns, variaciones)
│   ├── supabase.ts             # Cliente Supabase + helper de URL de imágenes
│   └── whatsapp.ts             # Construye mensaje formateado para WhatsApp
├── data/
│   └── designs.json            # Mock data (solo referencia, los datos vienen de Supabase)
├── specs/
│   └── spec.md                 # Especificación completa de features
├── .env.local                  # Variables de entorno (no commitear)
└── .env.example                # Template de variables requeridas
```

## Base de datos (Supabase)

**Tablas:**

```sql
categories     (id UUID, slug TEXT, name TEXT)
subcategories  (id UUID, slug TEXT, name TEXT)
products       (id UUID, code TEXT, name TEXT, image_path TEXT,
                category_id UUID→categories, subcategory_id UUID→subcategories,
                active BOOLEAN)
```

**Storage:** bucket `products` — las imágenes se referencian por `image_path` relativo.

**Helper de URL:**
```ts
// lib/supabase.ts
getImageUrl(image_path) → `${SUPABASE_URL}/storage/v1/object/public/products/${image_path}`
```

## Variables de entorno requeridas

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=products
NEXT_PUBLIC_WHATSAPP_NUMBER=5491178957481
```

## Flujo principal de usuario

1. Ingresa en `/` → redirect a `/catalogo`
2. Ve el hero slider (Llaveros, Pines, Proceso)
3. Filtra por subcategoría temática (Religiosos, Infantiles, Deportivos) y tipo de producto (Llaveros, Pines)
4. Busca por nombre o código de diseño
5. Clickea cards para seleccionar (toggle) — con nota opcional de variación
6. El botón flotante verde muestra el conteo de seleccionados
7. Abre el drawer derecho → revisa selección → "Enviar por WhatsApp"
8. WhatsApp Web abre con mensaje pre-armado agrupado por categoría

## Formato del mensaje WhatsApp

```
Hola! Me interesan los siguientes diseños:

🔑 *Llaveros - Religiosos*
- LLV-REL-001 - Virgen de Luján
  Variación: sin fondo

Quedo a la espera, gracias!
```

## Convenciones de código

- **Server Components** para fetching de Supabase (app/catalogo/page.tsx)
- **Client Components** para interactividad (`"use client"` explícito)
- Categorías: `llaveros` / `pines`; subcategorías: `religiosos` / `infantiles` / `deportivos`
- Códigos de producto: `{CAT}-{SUB}-{###}` (ej. `LLV-REL-001`)
- Tailwind v4 — sin archivo `tailwind.config.js`, configuración vía PostCSS
- TypeScript strict mode activo

## Gotchas importantes (Next.js 16)

- Los `params` de rutas dinámicas son **async** — siempre `await params`
- Las rutas son **dinámicas por defecto** — no asumir static rendering
- Usar Turbopack (`next dev --turbo` o default) — no webpack config legacy
- `next/image` requiere declarar los dominios remotos en `next.config.ts` bajo `remotePatterns`

## Comandos de desarrollo

```bash
cd catalogo-app
npm run dev      # Inicia en localhost:3000 con Turbopack
npm run build    # Build de producción
npm run lint     # ESLint
```
