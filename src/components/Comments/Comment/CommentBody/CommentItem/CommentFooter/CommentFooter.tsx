import type { Comment } from 'types';

import ReplyBtn from './CommentReplyBtn/CommentReplyBtn';
import CommentLikeBtn from './CommentLikeBtn';
import CommentLikesCountBtn from './CommentLikesCountBtn/CommentLikesCountBtn';

type Props = {
  isLogged: boolean;
  commentId: number;
  liked: boolean;
  likesCount: number;
  parentId: null | number;
  showCommentReplyForm: boolean;
  toggleShowReplyCommentForm(): void;
  updateComments(commentUpdater: (comments: Comment[]) => Comment[]): void;
  attachParentIdToReplyCommentForm: (
    parentId: null | number
  ) => (toggleShowReplyCommentForm: () => void) => void;
};

const CommentFooter = ({
  isLogged,
  likesCount,
  updateComments,
  ...props
}: Props) => (
  <ul className="comment-footer d-flex">
    <li>
      <CommentLikeBtn
        isLogged={isLogged}
        liked={props.liked}
        commentId={props.commentId}
        parentId={props.parentId}
        updateComments={updateComments}
      />
    </li>
    {likesCount ? (
      <li>
        <CommentLikesCountBtn
          isLogged={isLogged}
          likesCount={likesCount}
          commentId={props.commentId}
        />
      </li>
    ) : null}
    {isLogged ? (
      <li>
        <ReplyBtn {...props} />
      </li>
    ) : null}
  </ul>
);

export default CommentFooter;
