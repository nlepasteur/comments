import type { Comment } from 'types';

import { useCallback } from 'react';

import { deleteComment } from 'services/comments.service1';

import { makeStubComment } from 'utils/makeStubComment';

type Props = {
  commentId: number;
  //   commentsUpdater(comments: Comment[]): Comment[];
  updateComments(commentsUpdater: (comments: Comment[]) => Comment[]): void;
};

const DeleteCommentBtn = ({ commentId, updateComments }: Props) => {
  const deleteCommentRequest = useCallback(async (commentId: number) => {
    //
    updateComments(deleteComment(makeStubComment({ commentId })));
  }, []);
  return (
    <button onClick={() => deleteCommentRequest(commentId)}>
      Delete comment
    </button>
  );
};

export default DeleteCommentBtn;
