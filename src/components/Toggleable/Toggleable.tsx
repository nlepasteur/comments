import type { ComponentType } from 'react';

import { useState, useCallback } from 'react';

type Props = {
  render: (show: boolean, toggle: () => void) => JSX.Element;
};

const Toggleable: ComponentType<Props> = ({ render }) => {
  const [show, setShow] = useState(false);
  const toggle = useCallback(() => setShow((show) => !show), []);

  return render(show, toggle);
};

export default Toggleable;
