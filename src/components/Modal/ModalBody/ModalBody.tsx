import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ModalHeader = ({ children }: Props) => (
  <div className="modal-body">{children}</div>
);

export default ModalHeader;
