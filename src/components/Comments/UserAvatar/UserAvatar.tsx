import type { ComponentType } from 'react';

import { Link } from 'react-router-dom';

type Props = {
  userAvatar: string;
  userPermalink: string;
};

const CommentAvatar: ComponentType<Props> = ({ userAvatar, userPermalink }) => (
  <Link to={userPermalink}>
    <img src={userAvatar} alt="user's avatar" />
  </Link>
);

export default CommentAvatar;
