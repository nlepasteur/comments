import type { Comment as CommentType } from 'types';

import Comment from '../../../Comment';

type Props = {
  isLogged: boolean;
  userId: null | number;
  userAvatarUrl: string;
  comments: CommentType[];
  showCommentReplyForm: boolean;
  updateComments(
    commentUpdater: (comments: CommentType[]) => CommentType[]
  ): void;
  toggleShowReplyCommentForm(): void;
  attachParentIdToReplyCommentForm: (
    parentId: null | number
  ) => (toggleShowReplyCommentForm: () => void) => void;
};

const ChildCommentsList = ({ comments, ...props }: Props) => (
  <ul className="child-comments">
    {comments.map((comment) => (
      <li key={comment.id}>
        <Comment comment={comment} {...props} />
      </li>
    ))}
  </ul>
);

export default ChildCommentsList;
