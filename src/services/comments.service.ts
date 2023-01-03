import { Comment } from 'types';

export const updateComments =
  (update: (comment: Comment) => Comment) =>
  (commentId: number, parentId: null | number) =>
  (comments: Comment[]) => {
    const updatedComments = [];
    for (const comment of comments) {
      if (parentId !== null) {
        if (comment.id !== parentId) {
          updatedComments.push(comment);
        } else {
          const updatedChildComments = [];
          for (const childComment of comment.child_comments!) {
            if (childComment.id === commentId) {
              const updatedChildComment = update(childComment);
              updatedChildComments.push(updatedChildComment);
            } else {
              updatedChildComments.push(childComment);
            }
          }
          const updatedComment = {
            ...comment,
            child_comments: updatedChildComments,
          };
          updatedComments.push(updatedComment);
        }
      } else if (comment.id === commentId) {
        const updatedComment = update(comment);
        updatedComments.push(updatedComment);
      } else {
        updatedComments.push(comment);
      }
    }
    return updatedComments;
  };

export const addComment = (newComment: Comment) => (comments: Comment[]) => {
  if (newComment.parent_id === null) {
    return [...comments, newComment];
  }
  const updatedComments = [];
  for (const comment of comments) {
    if (comment.id === newComment.parent_id) {
      const updatedComment = {
        ...comment,
        child_comments: [...comment.child_comments!, newComment],
      };
      updatedComments.push(updatedComment);
    } else {
      updatedComments.push(comment);
    }
  }
  return updatedComments;
};
