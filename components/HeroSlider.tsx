"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ── Decorative SVG illustrations ──────────────────────────────────────────

function KeychainIllustration({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle cx="36" cy="34" r="20" stroke="currentColor" strokeWidth="5" strokeOpacity="0.6" />
      <circle cx="36" cy="34" r="10" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="3.5" strokeOpacity="0.4" />
      <rect x="31" y="51" width="10" height="38" rx="5" fill="currentColor" fillOpacity="0.55" />
      <rect x="24" y="68" width="24" height="9" rx="4.5" fill="currentColor" fillOpacity="0.3" />
      <rect x="27" y="82" width="18" height="9" rx="4.5" fill="currentColor" fillOpacity="0.2" />
      <circle cx="36" cy="34" r="4" fill="currentColor" fillOpacity="0.5" />
    </svg>
  );
}

function PinIllustration({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle cx="50" cy="42" r="30" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="5" strokeOpacity="0.5" />
      <circle cx="50" cy="42" r="18" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="3" strokeOpacity="0.35" />
      <circle cx="50" cy="42" r="8" fill="currentColor" fillOpacity="0.6" />
      <path d="M50 72L50 90" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.55" />
      <circle cx="66" cy="22" r="5" fill="currentColor" fillOpacity="0.25" />
      <circle cx="76" cy="34" r="3.5" fill="currentColor" fillOpacity="0.18" />
    </svg>
  );
}

function StepsIllustration({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <rect x="8" y="10" width="84" height="22" rx="11" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="3" strokeOpacity="0.35" />
      <rect x="8" y="39" width="84" height="22" rx="11" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="3" strokeOpacity="0.45" />
      <rect x="8" y="68" width="84" height="22" rx="11" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="3" strokeOpacity="0.35" />
      <path d="M22 21l5 5 11-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
      <path d="M22 50l5 5 11-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
      <path d="M22 79l5 5 11-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
    </svg>
  );
}

// ── Slide data ────────────────────────────────────────────────────────────

const SLIDES = [
  {
    id: "llaveros",
    tag: "Llaveros personalizados",
    title: "Llevá tu historia\nen tus manos",
    subtitle: "Religiosos · Deportivos · Infantiles",
    bg: "from-amber-100 to-orange-100",
    tagBg: "bg-amber-200/80 text-amber-900",
    dot: "bg-amber-500",
    illustrationColor: "text-amber-500",
    Illustration: KeychainIllustration,
  },
  {
    id: "pines",
    tag: "Pines únicos",
    title: "Tu estilo,\ntu identidad",
    subtitle: "Decorá ropa, mochilas y accesorios",
    bg: "from-indigo-100 to-blue-100",
    tagBg: "bg-indigo-200/80 text-indigo-900",
    dot: "bg-indigo-500",
    illustrationColor: "text-indigo-500",
    Illustration: PinIllustration,
  },
  {
    id: "proceso",
    tag: "¿Cómo pedirlos?",
    title: "Elegí, personalizá\ny listo",
    subtitle: "Seleccioná diseños y consultá en minutos",
    bg: "from-emerald-100 to-teal-100",
    tagBg: "bg-emerald-200/80 text-emerald-900",
    dot: "bg-teal-500",
    illustrationColor: "text-emerald-600",
    Illustration: StepsIllustration,
  },
];

const AUTO_MS = 4500;

// ── Component ─────────────────────────────────────────────────────────────

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const currentRef = useRef(current);
  currentRef.current = current;
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(((index % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => goTo(currentRef.current + 1), AUTO_MS);
    return () => clearInterval(id);
  }, [paused, goTo]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) goTo(currentRef.current + (delta > 0 ? 1 : -1));
    touchStartX.current = null;
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-roledescription="carrusel"
      aria-label="Destacados"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`w-full shrink-0 bg-linear-to-br ${slide.bg}`}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={slide.title.replace("\n", " ")}
            aria-hidden={i !== current}
          >
            <div className="flex items-center justify-between px-7 sm:px-14 h-60 sm:h-72 max-w-4xl mx-auto">
              {/* Text — always visible */}
              <div className="flex flex-col justify-center flex-1">
                <span className={`inline-block self-start text-xs font-semibold px-3 py-1 rounded-full mb-4 ${slide.tagBg}`}>
                  {slide.tag}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight whitespace-pre-line">
                  {slide.title}
                </h2>
                <p className="mt-2.5 text-sm text-gray-500 max-w-xs">{slide.subtitle}</p>
              </div>

              {/* Illustration — desktop only */}
              <div className={`hidden sm:block shrink-0 ml-6 ${slide.illustrationColor}`}>
                <slide.Illustration className="w-36 h-36" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next — desktop only */}
      <button
        onClick={() => goTo(current - 1)}
        aria-label="Diapositiva anterior"
        style={{ touchAction: "manipulation" }}
        className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-sm backdrop-blur-sm transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => goTo(current + 1)}
        aria-label="Diapositiva siguiente"
        style={{ touchAction: "manipulation" }}
        className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-sm backdrop-blur-sm transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5" role="tablist" aria-label="Ir a diapositiva">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            role="tab"
            aria-selected={i === current}
            aria-label={`Diapositiva ${i + 1}`}
            onClick={() => goTo(i)}
            style={{ touchAction: "manipulation" }}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? `w-6 ${slide.dot}` : "w-1.5 bg-gray-900/20 hover:bg-gray-900/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
