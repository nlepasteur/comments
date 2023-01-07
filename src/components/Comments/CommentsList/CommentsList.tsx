import type { Comment as CommentType } from 'types';

import { useState, useCallback } from 'react';

import Toggleable from 'components/Toggleable/Toggleable';
import Comment from '../Comment/Comment';
import CommentNested from '../Comment/CommentBody/CommentNested/CommentNested';
import CommentForm from 'components/Comments/CommentForm/CommentFormContainer';

import { addComment } from 'services/comments.service1';

type Props = {
  isLogged: boolean;
  userAvatarUrl: string;
  comments: CommentType[];
  userId: null | number;

  updateComments(
    commentUpdater: (comments: CommentType[]) => CommentType[]
  ): void;
};

const CommentsList = ({ comments, isLogged, userId, ...props }: Props) => {
  const [parentId, setParentId] = useState<null | number>(null);

  const attachParentIdToReplyCommentForm = useCallback(
    (parentId: null | number) => (toggleShowReplyCommentForm: () => void) => {
      setParentId(parentId);
      toggleShowReplyCommentForm();
    },
    []
  );

  return (
    <ul className="comments">
      {comments.map((comment) => (
        <li key={comment.id}>
          {
            <Toggleable
              render={(showReplyCommentForm, toggleShowReplyCommentForm) => (
                // n'est pas réutilisé ce composant pour la liste de child-comments pour ne pas que soit créer une nouvelle instance de toggle pour chaque
                <Comment
                  attachParentIdToReplyCommentForm={
                    attachParentIdToReplyCommentForm
                  }
                  isLogged={isLogged}
                  comment={comment}
                  userId={userId}
                  toggleShowReplyCommentForm={toggleShowReplyCommentForm}
                  {...props}
                >
                  <>
                    <CommentNested
                      attachParentIdToReplyCommentForm={
                        attachParentIdToReplyCommentForm
                      }
                      isLogged={isLogged}
                      userId={userId}
                      comments={comment.child_comments!}
                      toggleShowReplyCommentForm={toggleShowReplyCommentForm}
                      {...props}
                    />
                    {showReplyCommentForm ? (
                      <CommentForm
                        toggleShowCommentForm={toggleShowReplyCommentForm}
                        userId={userId!}
                        commentUpdater={addComment}
                        {...props}
                        btnText="Post comment"
                        url="/comments"
                        parentId={parentId === null ? comment.id : parentId}
                      >
                        <button onClick={toggleShowReplyCommentForm}>
                          <i></i>Cancel
                        </button>
                      </CommentForm>
                    ) : null}
                  </>
                </Comment>
              )}
            />
          }
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
