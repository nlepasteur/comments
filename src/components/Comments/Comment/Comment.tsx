import type { ReactNode } from 'react';
import type { Comment as CommentType } from 'types';

import { useToggle } from 'hooks/useToggle';

import CommentItem from './CommentBody/CommentItem/CommentItem';
import CommentForm from 'components/Comments/CommentForm/CommentFormContainer';

import { replaceComment } from 'services/comments.service';

type Props = {
  isLogged: boolean;
  userId: null | number;
  userAvatarUrl: string;
  comment: CommentType;
  children?: ReactNode;
  showCommentReplyForm: boolean;
  updateComments(
    commentUpdater: (comments: CommentType[]) => CommentType[]
  ): void;
  toggleShowReplyCommentForm(): void;
  attachParentIdToReplyCommentForm: (
    parentId: null | number
  ) => (toggleShowReplyCommentForm: () => void) => void;
};

const Comment = ({
  children,
  isLogged,
  userId,
  userAvatarUrl,
  attachParentIdToReplyCommentForm,
  ...props
}: Props) => {
  const [showEditCommentForm, toggleShowEditCommentForm] = useToggle(false);
  return (
    <div className="comment">
      <div className="d-flex">
        <img
          src={props.comment.user.medium_avatar_url}
          alt="user's avatar"
          className="avatar me-2"
        />
        <div className="comment-body w-100">
          {!showEditCommentForm ? (
            <CommentItem
              {...props}
              userId={userId}
              attachParentIdToReplyCommentForm={
                attachParentIdToReplyCommentForm
              }
              isLogged={isLogged}
              toggleShowEditCommentForm={toggleShowEditCommentForm}
            />
          ) : (
            <CommentForm
              toggleShowCommentForm={toggleShowEditCommentForm}
              initialText={props.comment.text}
              removeAvatar
              userId={userId!}
              userAvatarUrl={userAvatarUrl}
              commentId={props.comment.id}
              btnText="Update comment"
              updateComments={props.updateComments}
              commentUpdater={replaceComment}
              url={`/comments/${props.comment.id}`}
            >
              <button
                className="reply-cancel-btn"
                onClick={toggleShowEditCommentForm}
              >
                <i></i>Cancel
              </button>
            </CommentForm>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Comment;
