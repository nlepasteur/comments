import type { ComponentType } from 'react';

import { useState, useCallback } from 'react';

type UnwrappedComponentProps<T> = {
  incrementPage(currentCount: number, totalCount: number): void;
  page: number;
} & T;

type Props<T> = T;

function withPagination<T>(
  UnwrappedComponent: ComponentType<UnwrappedComponentProps<T>>
) {
  const WithPagination = (props: Omit<Props<T>, 'incrementPage' | 'page'>) => {
    const [page, setPage] = useState(1);

    const incrementPage = useCallback(
      (currentCount: number, totalCount: number) => {
        if (totalCount > currentCount) {
          setPage((currentPage) => currentPage + 1);
        }
      },
      []
    );
    return (
      <UnwrappedComponent
        page={page}
        incrementPage={incrementPage}
        {...(props as T)}
      />
    );
  };
  return WithPagination;
}

export default withPagination;
