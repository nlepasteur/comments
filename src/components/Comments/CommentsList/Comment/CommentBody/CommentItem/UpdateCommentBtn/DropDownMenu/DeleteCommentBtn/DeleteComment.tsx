import type { PostComment, EditComment, DeleteComment } from 'types';

type Props = {
  commentId: number;
  comment(args: PostComment | EditComment | DeleteComment): Promise<void>;
};

const DeleteCommentBtn = ({ commentId, comment }: Props) => (
  <button
    className="comment-dropdown-item"
    onClick={() => comment({ commentId })}
  >
    Delete comment
  </button>
);

export default DeleteCommentBtn;
