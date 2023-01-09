import type { ReactNode } from 'react';
import type { Comment } from 'types';

import { useCallback } from 'react';

import { makeStubComment } from 'utils/makeStubComment';

import CommentForm from './CommentForm';

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

type CommentRequestArgs =
  | (PatchCommentArgs & { text: string })
  | (PostCommentArgs & { text: string });

type Props = {
  children?: ReactNode;
  removeAvatar?: boolean;
  toggleShowCommentForm?(): void;
  userAvatarUrl: string;
  initialText?: string;
  placeholder?: string;
  btnText: 'Post comment' | 'Update comment';
  url: string;
  commentUpdater(comment: Comment): (comments: Comment[]) => Comment[];
  updateComments(commentsUpdater: (comments: Comment[]) => Comment[]): void;
} & (
  | (PatchCommentArgs & { btnText: 'Update comment' })
  | (PostCommentArgs & { btnText: 'Post comment' })
);

const arePostCommentArgs = (args: unknown): args is PostCommentArgs => {
  return args instanceof Object && !('commentId' in args);
};

const arePatchCommentArgs = (args: unknown): args is PatchCommentArgs => {
  return args instanceof Object && 'commentId' in args;
};

const CommentFormContainer = ({
  url,
  updateComments,
  commentUpdater,
  ...props
}: Props) => {
  const commentRequest = useCallback(async (args: CommentRequestArgs) => {
    updateComments(commentUpdater(makeStubComment(args)));
  }, []);

  return <CommentForm commentRequest={commentRequest} {...props} />;
};

export default CommentFormContainer;
