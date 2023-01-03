import type { ComponentType } from 'react';

import type { Comment as CommentType } from 'types';

import Toggleable from 'components/Toggleable/Toggleable';
import CommentItem from './CommentItem/CommentItem';
import ChildComments from './ChildComments/ChildComments';

type Props = {
  isLogged: boolean;
  comment: CommentType;
  updateComments(
    commentsUpdater: (comments: CommentType[]) => CommentType[]
  ): void;
};

const CommentBody: ComponentType<Props> = ({ comment, ...props }: Props) => (
  <div className="comment_body">
    <CommentItem comment={comment} {...props} />
    {comment.child_comments && comment.child_comments.length ? (
      <Toggleable
        render={(show, toggle) => (
          <>
            {show ? (
              <ChildComments comments={comment.child_comments!} {...props} />
            ) : (
              <button onClick={toggle}>Show more replies</button>
            )}
          </>
        )}
      />
    ) : null}
  </div>
);

export default CommentBody;
