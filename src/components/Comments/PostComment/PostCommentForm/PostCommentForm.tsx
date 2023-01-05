import { useState } from 'react';

import type { PostComment, EditComment, DeleteComment } from 'types';

type Props = {
  commentId: number;
  isLogged: boolean;
  userId: null | number;
  parentId: null | number;
  // commentableId: number;
  comment(args: PostComment | EditComment | DeleteComment): Promise<void>;
  close?(): void;
};

const PostCommentForm = ({
  close,
  isLogged,
  userId,
  parentId,
  comment,
  commentId,
}: Props) => {
  const [text, setText] = useState('');

  if (!isLogged && userId === null) {
    return null;
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    comment({
      text,
      userId,
      commentId,
      parentId,
      source: 'direct',
    } as Omit<Props, 'comment' | 'isLogged' | 'close'> & { userId: number });
    setText('');
    if (close) {
      close();
    }
  };

  return (
    <form onSubmit={(e) => submit(e)}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button>Post comment</button>
    </form>
  );
};

export default PostCommentForm;
