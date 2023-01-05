import type { Like as LikeType } from 'types';

import Like from './Like/Like';

type Props = {
  error: null | string;
  status: 'init' | 'fetching' | 'failure' | 'success';
  likes: LikeType[];
  updateLikes(likesUpdater: (likes: LikeType[]) => LikeType[]): void;
  observeElement(ref: HTMLElement): void;
};

const LikesList = ({
  error,
  status,
  likes,
  observeElement,
  ...props
}: Props) => {
  return (
    <>
      {status === 'init' || status === 'fetching' ? (
        <div>spinner</div>
      ) : (
        <ul>
          {likes.map((like) => (
            <li key={like.id}>
              <Like {...props} like={like} />
              {/* <FollowBtn
                userId={like.user_id}
                followed={like.user.followed}
                updateLikes={props.updateLikes} */}
              {/* /> */}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default LikesList;
