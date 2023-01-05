import type { Like } from 'types';

import UserAvatar from './UserAvatar/UserAvatar';
import UserDescription from './UserDescription/UserDescription';

type Props = {
  like: Like;
};

const User = ({
  like: {
    user: {
      medium_avatar_url,
      permalink,
      projects_count,
      followers_count,
      full_name,
      headline,
    },
  },
}: Props) => (
  <div>
    <UserAvatar medium_avatar_url={medium_avatar_url} permalink={permalink} />
    <UserDescription
      permalink={permalink}
      projects_count={projects_count}
      followers_count={followers_count}
      full_name={full_name}
      headline={headline}
    />
  </div>
);

export default User;
