declare global {
  interface Window {
    fbq: (
      command: 'init' | 'track' | 'trackCustom',
      eventOrPixelId: string,
      params?: Record<string, unknown>
    ) => void;
    _fbq: unknown;
  }
}

function fbqReady(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

export function trackPageView(): void {
  if (fbqReady()) window.fbq('track', 'PageView');
}

export function trackFamiliasLead(): void {
  if (fbqReady()) {
    window.fbq('track', 'Lead', { content_name: 'familias', content_category: 'demanda' });
  }
}

export function trackCuidadoraLead(price: 30 | 60 | 90): void {
  if (fbqReady()) {
    window.fbq('track', 'Lead', { content_name: 'cuidadoras', value: price, currency: 'PEN', content_category: 'oferta' });
  }
}
