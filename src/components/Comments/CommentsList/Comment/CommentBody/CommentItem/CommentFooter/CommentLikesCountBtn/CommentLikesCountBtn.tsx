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
            <button onClick={toggle}>
              <i></i>
              {likesCount} Like{likesCount > 1 && 's'}
            </button>
            {show ? (
              isLogged ? (
                <LikesModal {...props} close={toggle} />
              ) : (
                <div>Fallback</div>
              )
            ) : null}
          </>
        )}
      />
    ) : null}
  </>
);

export default LikesCountBtn;
