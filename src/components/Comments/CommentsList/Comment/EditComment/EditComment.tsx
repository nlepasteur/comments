import type {
  PostComment,
  EditComment as EditCommentType,
  DeleteComment,
} from 'types';

import { useState } from 'react';

import Btn from 'components/Btn/Btn';

type Props = {
  source?: 'direct';
  parentId: null | number;
  commentText: string;
  commentId: number;
  userId: number;
  showEditComment(): void;
  comment(args: PostComment | EditCommentType | DeleteComment): Promise<void>;
};

const EditComment = ({
  // source,
  parentId,
  userId,
  commentText,
  commentId,
  showEditComment,
  comment,
  ...props
}: Props) => {
  const [text, setText] = useState(commentText);
  const changeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const args = props.source
      ? { text, commentId, userId, parentId, source: props.source }
      : { text, commentId, userId, parentId };
    comment(args);
    showEditComment();
  };

  return (
    <div>
      <form onSubmit={submit}>
        <textarea value={text} onChange={(e) => changeText(e)} />
        <button>
          <i></i>Update Comment
        </button>
      </form>
      <Btn onClick={showEditComment}>Cancel</Btn>
    </div>
  );
};

export default EditComment;
