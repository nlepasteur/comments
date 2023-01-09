import type { ComponentType, ReactNode } from 'react';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

import useOnClickOutside from '../../hooks/useOnClickOutside';

import ModalHeader from './ModalHeader/ModalHeader';
import ModalBody from './ModalBody/ModalBody';

type Props = {
  title: string;
  close(): void;
  children: ReactNode;
};

const CustomModal: ComponentType<Props> = ({ title, close, children }) => {
  const modal = useRef(null);
  useOnClickOutside(modal, close);
  useLayoutEffect(() => {
    gsap
      .timeline()
      .set(modal.current, { y: '-100%' })
      .to(modal.current, { y: '-50%', top: '50%' });
  }, []);
  return (
    <div className="modal-background">
      <div className="custom-modal" ref={modal}>
        <ModalHeader title={title} close={close} />
        <ModalBody>{children}</ModalBody>
      </div>
    </div>
  );
};

export default CustomModal;
