import type { ReactNode } from 'react';
import type { Comment as CommentType } from 'types';

import CommentUserAvatar from 'components/Comments/UserAvatar/UserAvatar';
import CommentBody from './CommentBody/CommentBody';

type Props = {
  isLogged: boolean;
  comment: CommentType;
  updateComments(
    commentsUpdater: (comments: CommentType[]) => CommentType[]
  ): void;
};

const Comment = (props: Props) => (
  <div className="container comment">
    <CommentUserAvatar
      userAvatar={props.comment.user.medium_avatar_url}
      userPermalink={props.comment.user.permalink}
    />
    <CommentBody {...props} />
  </div>
);

export default Comment;
