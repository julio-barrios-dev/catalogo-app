"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const SLIDES = [
  {
    id: "llaveros",
    tag: "Llaveros personalizados",
    title: "Llevá tu historia\nen tus manos",
    subtitle: "Religiosos · Deportivos · Infantiles",
    bg: "from-amber-50 to-orange-100",
    tagBg: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  },
  {
    id: "pines",
    tag: "Pines únicos",
    title: "Tu estilo,\ntu identidad",
    subtitle: "Decorá ropa, mochilas y accesorios",
    bg: "from-indigo-50 to-blue-100",
    tagBg: "bg-indigo-100 text-indigo-700",
    dot: "bg-indigo-500",
  },
  {
    id: "proceso",
    tag: "¿Cómo pedirlos?",
    title: "Elegí, personalizá\ny listo",
    subtitle: "Seleccioná diseños y consultá por WhatsApp en minutos",
    bg: "from-emerald-50 to-teal-100",
    tagBg: "bg-emerald-100 text-emerald-700",
    dot: "bg-teal-500",
  },
];

const AUTO_MS = 4500;

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
            className={`w-full shrink-0 bg-linear-to-br ${slide.bg} h-56 sm:h-72 flex flex-col justify-end px-6 pb-10 sm:px-12`}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={slide.title.replace("\n", " ")}
            aria-hidden={i !== current}
          >
            <span className={`inline-block self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${slide.tagBg}`}>
              {slide.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight whitespace-pre-line">
              {slide.title}
            </h2>
            <p className="mt-1.5 text-sm text-gray-500">{slide.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Prev / Next — desktop only */}
      <button
        onClick={() => goTo(current - 1)}
        aria-label="Diapositiva anterior"
        style={{ touchAction: "manipulation" }}
        className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-white/70 hover:bg-white shadow-sm backdrop-blur-sm transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => goTo(current + 1)}
        aria-label="Diapositiva siguiente"
        style={{ touchAction: "manipulation" }}
        className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-white/70 hover:bg-white shadow-sm backdrop-blur-sm transition-colors cursor-pointer"
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
