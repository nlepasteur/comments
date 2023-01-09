import type { Comment } from 'types';

const makeRandomId = () => Math.floor(Math.random() * 1000);

export const makeStubComment = ({
  commentId = makeRandomId(),
  parentId = null,
  text = 'some text',
  userId = 0,
}: any): Comment => {
  const base = {
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
      full_name: 'Some name',
      username: '',
      headline: 'Some headline',
      medium_avatar_url:
        'https://via.placeholder.com/32x32.png?text=User+Avatar',
      small_cover_url: '',
      permalink: '',
    },
  };

  const stubComment = !parentId ? { ...base, child_comments: [] } : base;
  console.log('stubComment: ', stubComment);
  return stubComment;
};
