import { useEffect, useState } from "react";

/**
 * Globalny stan "aplikacja gotowa" — ustawiany przez Transition.tsx
 * po zakończeniu animacji ładowania (GIF). Dzięki temu nawigacja
 * i inne elementy mogą pojawić się dopiero po loadingu.
 */

let ready = false;
const listeners = new Set<() => void>();

export function setAppReady(): void {
  if (ready) return;
  ready = true;
  listeners.forEach((l) => l());
  listeners.clear();
}

export function isAppReady(): boolean {
  return ready;
}

/** Hook — zwraca true, gdy loading się zakończył (z subskrypcją na zmianę) */
export function useAppReady(): boolean {
  const [isReady, setIsReady] = useState(isAppReady());

  useEffect(() => {
    if (isAppReady()) return;
    const cb = () => setIsReady(true);
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  }, []);

  return isReady;
}
