import type { ReactNode } from "react";

interface PageHeaderProps {
  /** Nagłówek — logo (Smaki) lub Text3D (pozostałe strony) */
  heading?: ReactNode;
  /** Opis pod nagłówkiem */
  description?: ReactNode;
  /** Pigułki z informacjami (np. smaki, pojemności, dostawa) */
  chips?: string[];
}

/**
 * Spójny nagłówek podstrony: nagłówek → opis → pigułki.
 * Używany na /smaki, /info i /secret, żeby wszystkie strony
 * wyglądały jednakowo.
 */
function PageHeader({ heading, description, chips }: PageHeaderProps) {
  return (
    <header className="text-center mb-10 shrink-0">
      {heading && <div className="mb-5 w-full flex justify-center">{heading}</div>}

      {description && (
        <p className="text-white/75 text-lg md:text-xl font-['Space_Grotesk'] font-bold leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}

      {chips && chips.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2.5 mt-6">
          {chips.map((chip) => (
            <span
              key={chip}
              className="px-4 py-2 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md text-white/60 font-['Space_Grotesk'] font-bold text-sm tracking-wide whitespace-nowrap"
            >
              {chip}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}

export default PageHeader;
