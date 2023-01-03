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

const SignupSigninModal: ComponentType<Props> = ({
  title,
  close,
  children,
}) => {
  const modal = useRef(null);
  useOnClickOutside(modal, close);
  useLayoutEffect(() => {
    gsap
      .timeline()
      .set(modal.current, { y: '-100%' })
      .to(modal.current, { y: '-50%', top: '50%' });
  }, []);
  return (
    <div
      style={{
        backgroundColor: 'rgba(0,0,0,.5)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }}
    >
      <div
        ref={modal}
        className="modal"
        style={{ color: 'white', position: 'absolute' }}
      >
        <ModalHeader title={title} close={close} />
        <ModalBody>{children}</ModalBody>
      </div>
    </div>
  );
};

export default SignupSigninModal;
