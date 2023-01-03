import type { ComponentType } from 'react';

import type { Comment } from 'types';

import CommentLikeBtn from './CommentLikeBtn';
import CommentLikesCountBtn from './CommentLikesCountBtn/CommentLikesCountBtn';
import CommentPublication from './CommentPublication/CommentPublication';
// import ReplyComment from './ReplyComment/ReplyComment';

type Props = {
  isLogged: boolean;
  comment: Comment;
  updateComments(commentsUpdater: (comments: Comment[]) => Comment[]): void;
};

const CommentFooter: ComponentType<Props> = ({ comment, ...props }) => (
  <ul className="comment-footer">
    <li>
      <CommentLikeBtn
        liked={comment.liked}
        commentId={comment.id}
        parentId={comment.parent_id}
        {...props}
      />
    </li>
    <li>
      <CommentLikesCountBtn
        commentId={comment.id}
        likesCount={comment.likes_count}
        {...props}
      />
    </li>
    <li>
      <CommentPublication publication={comment.created_at} />
    </li>
    <li>{/* ReplyComment */}</li>
  </ul>
);

export default CommentFooter;
