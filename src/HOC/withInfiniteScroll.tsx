import type { ComponentType } from 'react';

import { useState, useEffect } from 'react';

import useIntersectionObserver from '../hooks/useIntersectionObserver';

type UnwrappedComponentProps<T> = T & {
  observeElement(ref: HTMLElement): void;
};

type Props<T> = {
  getNextData(): void;
} & T;

function withInfiniteScroll<T>(
  UnwrappedComponent: ComponentType<UnwrappedComponentProps<T>>
) {
  function WithInfiniteScroll({
    getNextData,
    ...props
  }: Omit<Props<T>, 'observeElement'>) {
    const [ref, setRef] = useState<HTMLElement | null>(null);
    const entry = useIntersectionObserver(ref, { freezeOnceVisible: false });
    const observeElement = (ref: HTMLElement) => setRef(ref);

    useEffect(() => {
      if (entry?.isIntersecting) {
        getNextData();
      }
    }, [entry]);

    return (
      <UnwrappedComponent
        observeElement={observeElement}
        {...(props as Props<T>)}
      />
    );
  }
  return WithInfiniteScroll;
}

export default withInfiniteScroll;
