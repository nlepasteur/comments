import type { Comment } from 'types';

import ChildCommentsList from './ChildCommentsList/ChildCommentsList';

import useToggle from 'hooks/useToggle';

type Props = {
  isLogged: boolean;
  userId: null | number;
  userAvatarUrl: string;
  comments: Comment[];
  showCommentReplyForm: boolean;
  updateComments(commentUpdater: (comments: Comment[]) => Comment[]): void;
  toggleShowReplyCommentForm(): void; // !!!
  attachParentIdToReplyCommentForm: (
    parentId: null | number
  ) => (toggleShowReplyCommentForm: () => void) => void;
};

const CommentNested = (props: Props) => {
  const [show, toggle] = useToggle(false);
  if (!props.comments.length) {
    return null;
  }
  return (
    <div>
      {show ? (
        <ChildCommentsList {...props} />
      ) : (
        <button className="show-more-btn" onClick={toggle}>
          <i></i>Show more replies
        </button>
      )}
    </div>
  );
};

export default CommentNested;
