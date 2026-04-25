'use client';

import { useEffect, useState } from 'react';

interface Slide { url: string; alt: string }

export function HeroSlideshow({ slides, children }: { slides: Slide[]; children: React.ReactNode }) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setVisible(true);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  function goTo(i: number) {
    setVisible(false);
    setTimeout(() => { setCurrent(i); setVisible(true); }, 300);
  }

  return (
    <section className="relative min-h-[560px] overflow-hidden px-6 py-20 text-center">
      {slides.map((slide, i) => (
        <div
          key={slide.url}
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{ backgroundImage: `url('${slide.url}')`, opacity: i === current && visible ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Imagen ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === current ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
          />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}
