import type { Like } from 'types';

import { Link } from 'react-router-dom';

type Props = Pick<
  Like['user'],
  'followers_count' | 'full_name' | 'headline' | 'projects_count' | 'permalink'
>;

const UserDescription = (props: Props) => (
  <div className="px-2">
    <div className="d-flex">
      <Link to={props.permalink}>{props.full_name}</Link>
      <span className="like-artworks-count">
        <i></i>
        {props.projects_count} Artworks
      </span>
      <span className="like-users">
        <i></i>
        {props.followers_count}Users
      </span>
    </div>
    <div className="like-headline">{props.headline}</div>
  </div>
);

export default UserDescription;
