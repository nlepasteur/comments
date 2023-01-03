import { useState } from 'react';

type Props = {
  isLogged: boolean;
  userId: number;
  parentId: null | number;
  postComment(
    text: string,
    parentId: null | number,
    userId: number
  ): Promise<void>;
};

const PostCommentForm = ({
  isLogged,
  userId,
  parentId,
  postComment,
}: Props) => {
  const [text, setText] = useState('');

  const submit = () => {
    postComment(text, parentId, userId);
    setText('');
  };

  return (
    <>
      {isLogged ? (
        <form onSubmit={submit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button>Post comment</button>
        </form>
      ) : null}
    </>
  );
};

export default PostCommentForm;
