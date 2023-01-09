import type { Comment } from 'types';

import classnames from 'classnames';

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
  const [isOpen, toggleIsOpen] = useToggle(false);

  const handleClick = () => {
    toggleShowDropDownMenu();
    toggleIsOpen();
  };
  return (
    <div className={classnames('comment-dropdown', { 'is-open': isOpen })}>
      <button onClick={handleClick}>
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
