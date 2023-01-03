import type { Like } from 'types';

export const updateLikes = (userId: number) => (likes: Like[]) => {
  const updatedLikes = [];
  for (const like of likes) {
    if (like.user.id === userId) {
      const updatedLike = {
        ...like,
        user: { ...like.user, followed: !like.user.followed },
      };
      updatedLikes.push(updatedLike);
    } else {
      updatedLikes.push(like);
    }
  }
  return updatedLikes;
};
