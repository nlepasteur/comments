import type { ComponentType } from 'react';

import Toggleable from 'components/Toggleable/Toggleable';
import LikesModal from 'components/LikesModal';

type Props = {
  isLogged: boolean;
  commentId: number;
  likesCount: number;
};

const LikesCountBtn: ComponentType<Props> = ({
  likesCount,
  isLogged,
  ...props
}) => (
  <>
    {likesCount ? (
      <Toggleable
        render={(show, toggle) => (
          <>
            <button
              className="comment-likes-count"
              onClick={() => (isLogged ? toggle() : console.log('fallback'))}
            >
              <i></i>
              {likesCount} Like{likesCount > 1 && 's'}
            </button>
            {show ? <LikesModal {...props} close={toggle} /> : null}
          </>
        )}
      />
    ) : null}
  </>
);

export default LikesCountBtn;
