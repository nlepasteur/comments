import type { Comment } from 'types';

import CommentFullName from './CommentFullName/CommentFullName';
import CommentHeadline from './CommentHeadline/CommentHeadline';
import CommentText from './CommentText/CommentText';
import CommentFooter from './CommentFooter/CommentFooter';

type Props = {
  isLogged: boolean;
  comment: Comment;
  updateComments(commentsUpdater: (comments: Comment[]) => Comment[]): void;
};

const CommentItem = (props: Props) => (
  <div className="comment-item">
    <CommentFullName
      userFullName={props.comment.user.full_name}
      userPermalink={props.comment.user.permalink}
    />
    <CommentHeadline userHeadline={props.comment.user.headline} />
    <CommentText text={props.comment.text} />
    <CommentFooter {...props} />
  </div>
);

export default CommentItem;
