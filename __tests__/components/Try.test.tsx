import { render, fireEvent } from '@testing-library/react';

import { useState, useCallback } from 'react';

import Toggleable from '../../src/components/Toggleable/Toggleable';

const Comment = (props: { commentText: string }) => {
  // const cancelCommentEditing = useCallback(() => (), [])
  return (
    <Toggleable
      render={(show, toggle) =>
        show ? (
          <CommentBody />
        ) : (
          <CommentEditing
            commentText={props.commentText}
            cancelCommentEditing={toggle}
          />
        )
      }
    />
  );
};
type CBP = {};
const CommentBody = () => {
  return <div>body</div>;
};

type CEP = {
  commentText: string;
  cancelCommentEditing(): void;
  // updateComments(): void;
};
const CommentEditing = (props: CEP) => {
  return (
    <div>
      <CommentEditingForm {...props} comment={async () => console.log('')} />
      <button onClick={props.cancelCommentEditing}>Cancel</button>
    </div>
  );
};

const CommentEditingForm = (props: {
  commentText: string;
  cancelCommentEditing(): void;
  comment(): Promise<void>;
}) => {
  const [text, setText] = useState(props.commentText);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.comment();
    props.cancelCommentEditing();
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button>Update Comment</button>
    </form>
  );
};

describe('', () => {
  it('', () => {
    const stubProps = { commentText: 'It rocks!!!' };
    const { getByRole, getByText, queryByRole } = render(
      <Comment {...stubProps} />
    );
    expect(getByText(stubProps.commentText)).toBeInTheDocument();
    fireEvent.click(getByRole('button', { name: /update/i }));
    expect(getByText('body')).toBeInTheDocument();
    expect(queryByRole('button')).not.toBeInTheDocument();

    //
  });

  it('', () => {
    const stubProps = { commentText: 'It rocks!!!' };
    const { getByRole, getByText, queryByRole } = render(
      <Comment {...stubProps} />
    );
    expect(getByRole('button', { name: /update/i })).toBeInTheDocument();
  });
});
