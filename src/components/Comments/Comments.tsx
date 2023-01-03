import type { Comment } from 'types';

// import CommentsCount from './CommentsCount/CommentsCount';
import CommentsList from './CommentsList/CommentsList';
import PostComment from './PostComment';
import ShowMoreCommentsBtn from './ShowMoreCommentsBtn/ShowMoreCommentsBtn';

type Props = {
  isLogged: boolean;
  userId: number;
  comments: Comment[];
  commentsTotalCount: number;
  updateComments(commentsUpdater: (comments: Comment[]) => Comment[]): void;
  getNextComments(): void;
};

const Comments = ({
  comments,
  userId,
  commentsTotalCount,
  getNextComments,
  ...props
}: Props) => (
  <div>
    <CommentsList comments={comments} {...props} />
    <PostComment userId={userId} parentId={null} {...props} />
    <ShowMoreCommentsBtn
      restComments={commentsTotalCount > comments.length}
      getNextComments={getNextComments}
    />
  </div>
);

export default Comments;
