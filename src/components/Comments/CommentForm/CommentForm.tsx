import type { ReactNode } from 'react';
import classnames from 'classnames';

import { useState, useEffect, useRef } from 'react';

type PostCommentArgs = {
  // text: string;
  userId: number; // stub
  parentId: null | number; // stub
  commentId?: never;
};

type PatchCommentArgs = {
  // text: string;
  commentId: number;
  userId: number; //  stub
  parentId?: never;
};

type CommentRequest = PostCommentArgs | PatchCommentArgs;

type CommentRequestArgs =
  | (PatchCommentArgs & { text: string })
  | (PostCommentArgs & { text: string });

const arePostCommentArgs = (args: unknown): args is PostCommentArgs => {
  return args instanceof Object && !('commentId' in args);
};

const arePatchCommentArgs = (args: unknown): args is PatchCommentArgs => {
  return args instanceof Object && 'commentId' in args;
};

type Props = {
  children?: ReactNode;
  removeAvatar?: boolean;
  toggleShowCommentForm?(): void;
  userAvatarUrl: string;
  initialText?: string;
  placeholder?: string;
  btnText: 'Post comment' | 'Update comment';
  commentRequest(args: CommentRequestArgs): Promise<void>;
} & CommentRequest;

let initialRender = true;

const CommentForm = ({
  children,
  removeAvatar,
  initialText = '',
  placeholder = '',
  userAvatarUrl,
  btnText,
  commentRequest,
  toggleShowCommentForm,
  ...args
}: Props) => {
  const [text, setText] = useState(initialText);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    commentRequest({ ...args, text });

    setText('');
    if (toggleShowCommentForm) {
      toggleShowCommentForm();
    }
  };

  useEffect(() => {
    if (initialRender) {
      initialRender = false;
      return;
    }
    if (text.length === 0) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [text]);

  return (
    <div className="d-flex comment-form">
      {!removeAvatar ? (
        <img src={userAvatarUrl} alt="user's avatar" className="avatar me-2" />
      ) : null}
      <form
        className={classnames('comment-form d-flex flex-column flex-grow-1', {
          'has-error': hasError,
        })}
        onSubmit={handleSubmit}
      >
        <textarea
          className="mb-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
        />
        <button className="reply-btn" type="submit" disabled={!text.length}>
          <i>{btnText}</i>
        </button>
        {children}
      </form>
    </div>
  );
};

export default CommentForm;
