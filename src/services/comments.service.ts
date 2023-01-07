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

export const deleteComment =
  (deletedComment: Comment) => (comments: Comment[]) => {
    return deletedComment.parent_id === null
      ? comments.filter((comment) => comment.id !== deletedComment.id)
      : comments.reduce((accumulator, currentValue) => {
          return currentValue.id === deletedComment.parent_id
            ? [
                ...accumulator,
                {
                  ...currentValue,
                  child_comments: currentValue.child_comments!.filter(
                    (comment) => comment.id !== deletedComment.id
                  ),
                },
              ]
            : accumulator.concat(currentValue);
        }, [] as Comment[]);
  };

export const addComment = (newComment: Comment) => (comments: Comment[]) => {
  return newComment.parent_id === null
    ? comments.concat(newComment)
    : comments.reduce((accumulator, currentValue) => {
        return currentValue.id === newComment.parent_id
          ? [
              ...accumulator,
              {
                ...currentValue,
                child_comments: [...currentValue.child_comments!, newComment],
              },
            ]
          : accumulator.concat(newComment);
      }, [] as Comment[]);
};
