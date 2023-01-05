import type { Comment } from 'types';

// import CommentsCount from './CommentsCount/CommentsCount';
import CommentsList from './CommentsList/CommentsList';
import ShowMoreCommentsBtn from './ShowMoreCommentsBtn/ShowMoreCommentsBtn';
import PostCommentForm from 'components/Comments/PostComment';
import { addComment } from 'services/comments.service';

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
  <div className="col-lg-3 col-xl-4">
    <CommentsList userId={userId} comments={comments} {...props} />
    <ShowMoreCommentsBtn
      restComments={commentsTotalCount > comments.length}
      getNextComments={getNextComments}
    />

    <PostCommentForm
      {...props}
      userId={userId}
      parentId={null}
      commentId={70}
      commentsUpdater={addComment}
    />
  </div>
);

export default Comments;
