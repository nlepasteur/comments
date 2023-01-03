import type { Comment as CommentType } from 'types';

import Comment from './Comment/Comment';

type Props = {
  isLogged: boolean;
  comments: CommentType[];
  updateComments(
    commentsUpdater: (comments: CommentType[]) => CommentType[]
  ): void;
};

const CommentsList = ({ comments, ...props }: Props) => (
  <ul>
    {comments.map((comment) => (
      <li key={comment.id}>
        <Comment {...props} comment={comment} />
      </li>
    ))}
  </ul>
);

export default CommentsList;
