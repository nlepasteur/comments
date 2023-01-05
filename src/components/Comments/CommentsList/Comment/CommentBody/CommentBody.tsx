import type { ComponentType, ReactNode } from 'react';

import type { Comment as CommentType } from 'types';

import Toggleable from 'components/Toggleable/Toggleable';
import CommentItem from './CommentItem/CommentItem';
import ReplyComment from 'components/Comments/PostComment';

import { addReply } from 'services/comments.service';

type Props = {
  isLogged: boolean;
  userId: null | number;
  comment: CommentType;
  updateComments(
    commentsUpdater: (comments: CommentType[]) => CommentType[]
  ): void;
  showEditComment(): void;
  children?: ReactNode;
};

const CommentBody: ComponentType<Props> = ({
  comment,
  children,
  ...props
}: Props) => (
  <div className="comment-body">
    <Toggleable
      render={(show, toggle) => (
        <>
          <CommentItem comment={comment} showReplyComment={toggle} {...props} />
          {comment.child_comments && comment.child_comments.length ? (
            <Toggleable
              render={(show, toggle) => (
                <>
                  {show ? (
                    //
                    children
                  ) : (
                    <button
                      className="show-more show-more-replies"
                      onClick={toggle}
                    >
                      Show more replies
                    </button>
                  )}
                </>
              )}
            />
          ) : null}
          {show ? (
            <ReplyComment
              close={toggle}
              {...props}
              parentId={comment.id}
              commentId={comment.user.id}
              commentsUpdater={addReply}
            />
          ) : null}
        </>
      )}
    />
  </div>
);

export default CommentBody;
