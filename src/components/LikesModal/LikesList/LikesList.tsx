import type { Like } from 'types';

import FollowBtn from 'components/FollowBtn';

type Props = {
  error: null | string;
  status: 'init' | 'fetching' | 'failure' | 'success';
  likes: Like[];
  updateLikes(likesUpdater: (likes: Like[]) => Like[]): void;
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
              A like{' '}
              <FollowBtn
                userId={like.user_id}
                followed={like.user.followed}
                updateLikes={props.updateLikes}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default LikesList;
