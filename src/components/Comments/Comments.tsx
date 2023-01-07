import type { Comment } from 'types';

// import CommentsCount from './CommentsCount/CommentsCount';
import CommentsList from './CommentsList/CommentsList';
import CommentForm from 'components/Comments/CommentForm/CommentFormContainer';

import { addComment } from 'services/comments.service';

type Props = {
  isLogged: boolean;
  userId: number;
  userAvatarUrl: string;
  comments: Comment[];
  commentsTotalCount: number;
  updateComments(commentsUpdater: (comments: Comment[]) => Comment[]): void;
  getNextComments(): void;
};

const Comments = ({
  isLogged,
  comments,
  userId,
  commentsTotalCount,
  getNextComments,
  ...props
}: Props) => (
  <div className="comments-container p-3">
    <CommentsList
      isLogged={isLogged}
      userId={userId}
      comments={comments}
      {...props}
    />
    {isLogged ? (
      <CommentForm
        placeholder="Write a comment..."
        url="/comments"
        btnText="Post comment"
        userId={userId}
        parentId={null} // ici ol parent ID AINSI
        commentUpdater={addComment}
        {...props}
      />
    ) : null}
  </div>
);

export default Comments;
