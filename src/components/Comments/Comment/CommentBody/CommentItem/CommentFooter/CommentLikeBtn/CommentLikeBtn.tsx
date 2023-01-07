import type { ComponentType } from 'react';

type Props = {
  isLogged: boolean;
  commentId: number;
  parentId: null | number;
  liked: boolean;
  like(commentId: number, parentId: null | number): Promise<void>;
};

const CommentLikeBtn: ComponentType<Props> = ({
  isLogged,
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
