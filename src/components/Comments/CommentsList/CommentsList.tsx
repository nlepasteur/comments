import type { Comment as CommentType } from 'types';

import classnames from 'classnames';

import Comment from './Comment/Comment';

type Props = {
  childComment?: boolean;
  isLogged: boolean;
  userId: null | number;
  comments: CommentType[];
  updateComments(
    commentsUpdater: (comments: CommentType[]) => CommentType[]
  ): void;
};

const CommentsList = ({ comments, ...props }: Props) => (
  <ul
    className={classnames(
      {
        'ps-4 pe-3': comments.every((comment) => comment.parent_id == null),
      },
      {
        'child-comments': comments.every(
          (comment) => comment.parent_id !== null
        ),
      }
    )}
  >
    {comments.map((comment) => (
      <li key={comment.id}>
        <Comment {...props} comment={comment}>
          {comment.child_comments ? (
            <CommentsList
              childComment
              comments={comment.child_comments}
              {...props}
            />
          ) : //
          null}
        </Comment>
      </li>
    ))}
  </ul>
);

export default CommentsList;
