import type { RefObject } from 'react';

import { useEffect } from 'react';

function useEventListener<T extends HTMLElement = HTMLElement>(
  eventName: keyof WindowEventMap | string,
  handler: (event: Event) => void,
  element?: RefObject<T>
) {
  useEffect(() => {
    const targetElement: T | Window = element?.current || window;
    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    const eventListener = (e: Event) => {
      handler(e);
    };

    targetElement.addEventListener(eventName, eventListener);

    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element, handler]);
}

export default useEventListener;
