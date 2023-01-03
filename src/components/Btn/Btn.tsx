import { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';

type Props<C extends ElementType> = {
  children: ReactNode;
  as?: C;
};

export type BtnProps<C extends ElementType> = Props<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof Props<C>>;

const Btn = <C extends ElementType = 'button'>({
  children,
  as,
  ...attributes
}: BtnProps<C>) => {
  const Element = as || 'button';
  return <Element {...attributes}>{children}</Element>;
};

export default Btn;
