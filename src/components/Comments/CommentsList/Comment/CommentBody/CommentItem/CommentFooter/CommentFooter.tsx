import type { ComponentType } from 'react';

import type { Comment } from 'types';

import classnames from 'classnames';

import CommentLikeBtn from './CommentLikeBtn';
import CommentLikesCountBtn from './CommentLikesCountBtn/CommentLikesCountBtn';
import CommentPublication from './CommentPublication/CommentPublication';
// import ReplyComment from './ReplyComment/ReplyComment';

type Props = {
  isLogged: boolean;
  comment: Comment;
  updateComments(commentsUpdater: (comments: Comment[]) => Comment[]): void;
  showReplyComment(): void;
};

const CommentFooter: ComponentType<Props> = ({
  comment,
  showReplyComment,
  ...props
}) => (
  <ul className="d-flex flex-wrap comment-footer">
    <li>
      <CommentLikeBtn
        liked={comment.liked}
        commentId={comment.id}
        parentId={comment.parent_id}
        {...props}
      />
    </li>
    {comment.likes_count ? (
      <li>
        <CommentLikesCountBtn
          commentId={comment.id}
          likesCount={comment.likes_count}
          {...props}
        />
      </li>
    ) : null}
    <li>
      <CommentPublication publication={comment.created_at} />
    </li>
    {props.isLogged ? (
      <li>
        <button onClick={showReplyComment}>Reply</button>
      </li>
    ) : null}
  </ul>
);

export default CommentFooter;
