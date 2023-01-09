import type { Like as LikeType } from 'types';

import FollowBtn from 'components/FollowBtn/';
import User from './User/User';

type Props = {
  like: LikeType;
  updateLikes(likesUpdater: (likes: LikeType[]) => LikeType[]): void;
};

const Like = ({ like, ...props }: Props) => (
  <div className="modal-like d-flex justify-content-between align-items-center">
    <User like={like} />
    <FollowBtn followed={like.user.followed} userId={like.user_id} {...props} />
  </div>
);

export default Like;
