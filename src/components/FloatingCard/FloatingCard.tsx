import { forwardRef } from 'react';
import classnames from 'classnames';

type Props = {
  avatarIsHover: boolean;
};

const FloatingCard = forwardRef<null | HTMLDivElement, Props>(
  ({ avatarIsHover }, floatingCardRef) => {
    return (
      <div
        ref={floatingCardRef}
        className={classnames('floating-card', {
          'avatar-is-hover': avatarIsHover,
        })}
      ></div>
    );
  }
);

export default FloatingCard;
