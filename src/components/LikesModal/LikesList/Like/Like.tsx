import type { Like as LikeType } from 'types';

import FollowBtn from 'components/FollowBtn';
import User from './User/User';

type Props = {
  like: LikeType;
  updateLikes(likesUpdater: (likes: LikeType[]) => LikeType[]): void;
};

const Like = ({ like, ...props }: Props) => (
  <div>
    <FollowBtn followed={like.user.followed} userId={like.user_id} {...props} />
    <User like={like} />
  </div>
);

export default Like;
