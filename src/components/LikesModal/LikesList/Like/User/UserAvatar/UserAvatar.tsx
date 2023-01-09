import type { Like } from 'types';

import { Link } from 'react-router-dom';

type Props = Pick<Like['user'], 'permalink' | 'medium_avatar_url'>;

const UserAvatar = ({ permalink, medium_avatar_url }: Props) => (
  <Link className="like-avatar" to={permalink}>
    <img className="avatar" src={medium_avatar_url} alt="user's avatar" />
  </Link>
);

export default UserAvatar;
