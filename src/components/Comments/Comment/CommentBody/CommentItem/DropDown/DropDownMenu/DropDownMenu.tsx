import type { Comment } from 'types';

import DeleteCommentBtn from './DeleteCommentBtn/DeleteCommentBtn';

type Props = {
  commentId: number;
  toggleShowEditCommentForm(): void;
  updateComments(commentUpdater: (comments: Comment[]) => Comment[]): void;
};

const DropDownMenu = ({ toggleShowEditCommentForm, ...props }: Props) => (
  <ul className="comment-dropdown-menu">
    <li>
      <DeleteCommentBtn {...props} />
    </li>
    <li>
      <button onClick={toggleShowEditCommentForm}>Edit comment</button>
    </li>
  </ul>
);

export default DropDownMenu;
