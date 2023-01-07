import type { Comment } from 'types';

import { useToggle } from 'hooks/useToggle';

import DropDownMenu from './DropDownMenu/DropDownMenu';

type Props = {
  commentId: number;
  toggleShowEditCommentForm(): void;
  updateComments(commentUpdater: (comments: Comment[]) => Comment[]): void;
};

const DropDown = ({
  commentId,
  toggleShowEditCommentForm,
  updateComments,
}: Props) => {
  const [showDropDownMenu, toggleShowDropDownMenu] = useToggle(false);
  return (
    <div className="comment-dropdown">
      <button onClick={toggleShowDropDownMenu}>
        <i></i>
      </button>
      {showDropDownMenu ? (
        <DropDownMenu
          toggleShowEditCommentForm={toggleShowEditCommentForm}
          updateComments={updateComments}
          commentId={commentId}
        />
      ) : null}
    </div>
  );
};

export default DropDown;
