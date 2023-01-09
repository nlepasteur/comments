import type { Comment } from 'types';

import { Link } from 'react-router-dom';
import classnames from 'classnames';

import DropDown from './DropDown/DropDown';
import CommentFooter from './CommentFooter/CommentFooter';

type Props = {
  isLogged: boolean;
  userId: null | number;
  comment: Comment;
  showCommentReplyForm: boolean;
  toggleShowEditCommentForm(): void;
  toggleShowReplyCommentForm(): void;
  updateComments(commentUpdater: (comments: Comment[]) => Comment[]): void;
  attachParentIdToReplyCommentForm: (
    parentId: null | number
  ) => (toggleShowReplyCommentForm: () => void) => void;
};

const CommentItem = ({
  userId,
  comment,
  showCommentReplyForm,
  toggleShowEditCommentForm,
  ...props
}: Props) => {
  return (
    <div
      className={classnames(
        'comment-item position-relative rounded px-2 py-1 w-100',
        {
          'has-child-comments':
            comment.child_comments && comment.child_comments.length,
        }
      )}
    >
      <Link className="comment-user" to={comment.user.permalink}>
        {comment.user.full_name}
      </Link>
      <div className="comment-headline">{comment.user.headline}</div>
      <div className="comment-text">{comment.text}</div>

      {comment.user.id === userId ? (
        <DropDown
          commentId={comment.id}
          updateComments={props.updateComments}
          toggleShowEditCommentForm={toggleShowEditCommentForm}
        />
      ) : null}
      <CommentFooter
        showCommentReplyForm={showCommentReplyForm}
        likesCount={comment.likes_count}
        commentId={comment.id}
        liked={comment.liked}
        parentId={comment.parent_id}
        {...props}
      />
    </div>
  );
};

export default CommentItem;
