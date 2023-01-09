import { useCallback, useState } from 'react';

export const useToggle = (initialValue?: boolean) => {
  const [show, setShow] = useState(!!initialValue);

  const toggle = useCallback(() => setShow((show) => !show), []);

  return [show, toggle] as const;
};

export default useToggle;
