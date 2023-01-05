import type { ComponentType } from 'react';

type Props = {
  commentId: number;
  parentId: null | number;
  liked: boolean;
  like(commentId: number, parentId: null | number): Promise<void>;
};

const CommentLikeBtn: ComponentType<Props> = ({
  liked,
  like,
  commentId,
  parentId,
}) => (
  <button className="comment-like" onClick={() => like(commentId, parentId)}>
    {liked && <i></i>}
    {liked ? 'Liked' : 'Like'}
  </button>
);

export default CommentLikeBtn;
