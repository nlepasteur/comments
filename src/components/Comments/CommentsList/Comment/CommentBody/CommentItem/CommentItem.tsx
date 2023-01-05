import type { Comment } from 'types';

import UpdateCommentBtn from './UpdateCommentBtn';
import CommentFullName from './CommentFullName/CommentFullName';
import CommentHeadline from './CommentHeadline/CommentHeadline';
import CommentText from './CommentText/CommentText';
import CommentFooter from './CommentFooter/CommentFooter';

import { deleteComment } from 'services/comments.service';

type Props = {
  isLogged: boolean;
  userId: null | number;
  comment: Comment;
  updateComments(commentsUpdater: (comments: Comment[]) => Comment[]): void;
  showEditComment(): void;
  showReplyComment(): void;
};

const CommentItem = ({ userId, ...props }: Props) => (
  <div className="comment-item">
    <UpdateCommentBtn
      isLogged={props.isLogged}
      userId={userId}
      commentUserId={props.comment.user.id}
      commentId={props.comment.id}
      updateComments={props.updateComments}
      commentsUpdater={deleteComment}
      showEditComment={props.showEditComment}
    />
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
