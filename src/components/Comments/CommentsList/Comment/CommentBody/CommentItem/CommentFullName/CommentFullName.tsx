import type { ComponentType } from 'react';

import { Link } from 'react-router-dom';

type Props = {
  userFullName: string;
  userPermalink: string;
};

const UserFullName: ComponentType<Props> = ({
  userFullName,
  userPermalink,
}) => <Link to={userPermalink}>userFullName</Link>;

export default UserFullName;
