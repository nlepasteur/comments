import type { Like } from 'types';

import { Link } from 'react-router-dom';

type Props = Pick<
  Like['user'],
  'followers_count' | 'full_name' | 'headline' | 'projects_count' | 'permalink'
>;

const UserDescription = (props: Props) => (
  <div>
    <div>
      <Link to={props.permalink}>{props.full_name}</Link>
      <span>{props.projects_count}</span>
      <span>{props.followers_count}</span>
    </div>
    <div>{props.headline}</div>
  </div>
);

export default UserDescription;
