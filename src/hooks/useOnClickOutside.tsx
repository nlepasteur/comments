import type { RefObject } from 'react';

import useEventListener from './useEventListener';

const useOnClickOutside = (
  element: RefObject<HTMLElement>,
  handler: (e: MouseEvent) => void
) => {
  useEventListener('mousedown', (e) => {
    if (!element.current || element.current.contains(e.target as Node)) {
      return;
    }

    handler(e as MouseEvent);
  });
};

export default useOnClickOutside;
