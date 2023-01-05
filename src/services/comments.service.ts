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

export const addReply = (newComment: Comment) => (comments: Comment[]) => {
  const updatedComments = [];

  for (const comment of comments) {
    if (comments.find((comment) => newComment.parent_id === comment.id)) {
      if (comment.id === newComment.parent_id) {
        const updatedComment = {
          ...comment,
          child_comments: [...comment.child_comments!, newComment],
        };
        updatedComments.push(updatedComment);
      } else {
        updatedComments.push(comment);
      }
    } else {
      if (
        comment.child_comments!.find(
          (childComment) => childComment.id === newComment.parent_id
        )
      ) {
        updatedComments.push({
          ...comment,
          child_comments: [...comment.child_comments!, newComment],
        });
      } else {
        updatedComments.push(comment);
      }
    }
  }
  return updatedComments;
};

export const replaceComment =
  (editedComment: Comment) => (comments: Comment[]) => {
    const updatedComments = [];
    if (editedComment.parent_id === null) {
      for (const comment of comments) {
        if (comment.id === editedComment.id) {
          updatedComments.push(editedComment);
        } else {
          updatedComments.push(comment);
        }
      }
      return updatedComments;
    } else {
      for (const comment of comments) {
        const updatedChildComments = [];
        for (const childComment of comment.child_comments!) {
          if (childComment.id === editedComment.id) {
            updatedChildComments.push(editedComment);
          } else {
            updatedChildComments.push(childComment);
          }
        }
        updatedComments.push({
          ...comment,
          child_comments: updatedChildComments,
        });
      }
    }
    return updatedComments;
  };

export const deleteComment = (oldComment: Comment) => (comments: Comment[]) => {
  if (comments.find((comment) => comment.id === oldComment.id)) {
    return comments.filter((comment) => comment.id !== oldComment.id);
  }
  const updatedComments = [];
  for (const comment of comments) {
    const updatedChildComments = [];
    for (const childComment of comment.child_comments!) {
      if (childComment.id !== oldComment.id) {
        updatedChildComments.push(childComment);
      }
    }
    updatedComments.push({ ...comment, child_comments: updatedChildComments });
  }
  return updatedComments;
};
