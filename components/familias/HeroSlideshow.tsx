'use client';

import { useEffect, useState } from 'react';

const SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1600&q=80',
    alt: 'Familia feliz con bebé en casa',
  },
  {
    url: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1600&q=80',
    alt: 'Nana cuidando a un niño pequeño',
  },
  {
    url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1600&q=80',
    alt: 'Niño caminando en el parque',
  },
];

export function HeroSlideshow({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % SLIDES.length);
        setVisible(true);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[560px] overflow-hidden px-6 py-20 text-center">
      {/* Background images */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.url}
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{
            backgroundImage: `url('${slide.url}')`,
            opacity: i === current && visible ? 1 : 0,
          }}
        />
      ))}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* Slide indicator dots */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setVisible(false); setTimeout(() => { setCurrent(i); setVisible(true); }, 300); }}
            aria-label={`Imagen ${i + 1}`}
            className={`h-2 w-2 rounded-full transition-all ${i === current ? 'w-6 bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
