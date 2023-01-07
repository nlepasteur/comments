import type { Comment } from 'types';

import ChildCommentsList from './ChildCommentsList/ChildCommentsList';

import useToggle from 'hooks/useToggle';

type Props = {
  isLogged: boolean;
  userId: null | number;
  userAvatarUrl: string;
  comments: Comment[];
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
    <div className="comment-nested">
      {show ? (
        <ChildCommentsList {...props} />
      ) : (
        <button onClick={toggle}>
          <i></i>Show more replies
        </button>
      )}
    </div>
  );
};

export default CommentNested;
