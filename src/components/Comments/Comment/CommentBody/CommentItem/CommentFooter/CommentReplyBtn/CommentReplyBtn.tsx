type Props = {
  parentId: null | number;
  toggleShowReplyCommentForm(): void;
  attachParentIdToReplyCommentForm: (
    parentId: null | number
  ) => (toggleShowReplyCommentForm: () => void) => void;
};

const CommentReplyBtn = ({
  parentId,
  toggleShowReplyCommentForm,
  attachParentIdToReplyCommentForm,
}: Props) => (
  <button
    onClick={() =>
      attachParentIdToReplyCommentForm(parentId)(toggleShowReplyCommentForm)
    }
  >
    <i></i>Reply
  </button>
);

export default CommentReplyBtn;
