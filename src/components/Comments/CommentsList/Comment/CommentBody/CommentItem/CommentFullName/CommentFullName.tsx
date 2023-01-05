import type { ComponentType } from 'react';

import { Link } from 'react-router-dom';

type Props = {
  userFullName: string;
  userPermalink: string;
};

const UserFullName: ComponentType<Props> = ({
  userFullName,
  userPermalink,
}) => (
  <Link className="comment-user" to={userPermalink}>
    {userFullName}
  </Link>
);

export default UserFullName;
