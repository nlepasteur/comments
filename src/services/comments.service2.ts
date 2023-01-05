import type { Comment } from 'types';

export const replaceComment =
  (comment: Comment) =>
  (comments: Comment[]): Comment[] => {
    return comments.reduce((accumulator, currentValue) => {
      return currentValue.id === comment.id
        ? [...accumulator, Object.assign(currentValue, comment)]
        : currentValue.child_comments
        ? [
            ...accumulator,
            {
              ...currentValue,
              child_comments: [
                ...replaceComment(comment)(currentValue.child_comments),
              ],
            },
          ]
        : [...accumulator, currentValue];
    }, [] as Comment[]);
  };

export const deleteComment = (comment: Comment) => (comments: Comment[]) => {
  return comments.filter((c) => c.id !== comment.id);
};

export const addComment = (newComment: Comment) => (comments: Comment[]) => {
  return [...comments, newComment];
};
