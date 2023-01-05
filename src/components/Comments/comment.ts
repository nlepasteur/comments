import type { Comment } from 'types';

export type PostComment = {
  text: string;
  commentId: number;
  parentId: null | number;
  userId: number;
  source: 'direct';
};

export type EditComment = {
  text: string;
  commentId: number;
  parentId: null | number;
  userId: number;
};

export type DeleteComment = {
  commentId: number;
};

const isPost = (args: unknown): args is PostComment =>
  args instanceof Object && 'source' in args;

const isEdit = (args: unknown): args is EditComment =>
  args instanceof Object && Object.keys(args).length === 4;

const isDelete = (args: unknown): args is DeleteComment =>
  args instanceof Object && Object.keys(args).length === 1;

function comment(
  args: PostComment
): (onSuccessCallback: (comment: Comment) => void) => Promise<void>;
function comment(
  args: EditComment
): (onSuccessCallback: (comment: Comment) => void) => Promise<void>;
function comment(
  args: DeleteComment
): (onSuccessCallback: (comment: Comment) => void) => Promise<void>;
function comment(args: Partial<PostComment> & { commentId: number }) {
  //
  if (isPost(args)) {
    return async (onSuccessCallback: (comment: Comment) => void) => {
      // post request
      onSuccessCallback(
        makeStubComment(args.text, args.parentId, args.userId, args.commentId)
      );
    };
  }
  if (isEdit(args)) {
    return async (onSuccessCallback: (comment: Comment) => void) => {
      // patch request
      onSuccessCallback(
        makeStubComment(args.text, args.parentId, args.userId, args.commentId)
      );
    };
  }
  if (isDelete(args)) {
    return async (onSuccessCallback: (comment: Comment) => void) => {
      // delete request
      onSuccessCallback(makeStubComment('', null, 10, args.commentId));
    };
  }
}

export { comment };

function makeStubComment(
  text: string,
  parentId: null | number,
  userId: number,
  commentId: number
) {
  const commentBase = {
    id: commentId,
    commentable_id: 100,
    parent_id: parentId,
    created_at: '',
    liked: false,
    likes_count: 0,
    text,
    user: {
      id: userId,
      followed: false,
      full_name: '',
      username: '',
      headline: '',
      medium_avatar_url:
        'https://via.placeholder.com/32x32.png?text=User+Avatar',
      small_cover_url: '',
      permalink: '',
    },
  };
  if (parentId === null) {
    return commentBase;
  }
  return { ...commentBase, child_comments: [] };
}
