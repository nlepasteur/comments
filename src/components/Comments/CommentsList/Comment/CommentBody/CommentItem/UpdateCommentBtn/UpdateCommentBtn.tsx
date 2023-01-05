import type { PostComment, EditComment, DeleteComment } from 'types';

import Toggleable from 'components/Toggleable/Toggleable';
import DropDownMenu from './DropDownMenu/DropDownMenu';

type Props = {
  isLogged: boolean;
  userId: null | number;
  commentUserId: number;
  commentId: number;
  comment(args: PostComment | EditComment | DeleteComment): Promise<void>;
  showEditComment(): void;
};

const UpdateCommentBtn = ({
  isLogged,
  commentUserId,
  userId,
  ...props
}: Props) => {
  if ((!isLogged && userId === null) || commentUserId !== userId) {
    return null;
  }

  return (
    <Toggleable
      render={(show, toggle) => (
        <>
          <button className="comment-owner" onClick={toggle}>
            <i></i>
          </button>
          {show && <DropDownMenu {...props} />}
        </>
      )}
    />
  );
};

export default UpdateCommentBtn;
