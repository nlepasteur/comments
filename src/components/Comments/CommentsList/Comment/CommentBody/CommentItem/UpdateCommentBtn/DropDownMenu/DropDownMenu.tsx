import type { PostComment, EditComment, DeleteComment } from 'types';

import DeleteCommentBtn from './DeleteCommentBtn/DeleteComment';

type Props = {
  commentId: number;
  comment(args: PostComment | EditComment | DeleteComment): Promise<void>; // pour delete
  showEditComment(): void;
};

const DropDownMenu = ({ showEditComment, ...props }: Props) => (
  <ul className="comment-dropdown">
    <li>
      <button className="comment-dropdown-item" onClick={showEditComment}>
        Edit comment
      </button>
    </li>
    <li>
      <DeleteCommentBtn {...props} />
    </li>
  </ul>
);

export default DropDownMenu;
