import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ModalBody = ({ children }: Props) => (
  <div className="custom-modal-body">{children}</div>
);

export default ModalBody;
