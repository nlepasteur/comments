import classnames from 'classnames';

type Props = {
  parentId: null | number;
  showCommentReplyForm: boolean;
  toggleShowReplyCommentForm(): void;
  attachParentIdToReplyCommentForm: (
    parentId: null | number
  ) => (toggleShowReplyCommentForm: () => void) => void;
};

const CommentReplyBtn = ({
  parentId,
  showCommentReplyForm,
  toggleShowReplyCommentForm,
  attachParentIdToReplyCommentForm,
}: Props) => (
  <button
    className={classnames('comment-reply', { active: showCommentReplyForm })}
    onClick={() =>
      attachParentIdToReplyCommentForm(parentId)(toggleShowReplyCommentForm)
    }
  >
    <i></i>Reply
  </button>
);

export default CommentReplyBtn;
