import type { Comment } from 'types';

import { updateComments } from '../../src/services/comments.service';

const stubComments: Comment[] = [
  {
    id: 0,
    child_comments: [
      {
        id: 2,
        commentable_id: 100,
        parent_id: 0,
        created_at: '',
        liked: false,
        likes_count: 0,
        text: '',
        user: {
          id: 10,
          followed: false,
          full_name: '',
          username: '',
          headline: '',
          medium_avatar_url: '',
          small_cover_url: '',
          permalink: '',
        },
      },
    ],
    commentable_id: 100,
    parent_id: null,
    created_at: '',
    liked: false,
    likes_count: 0,
    text: '',
    user: {
      id: 10,
      followed: false,
      full_name: '',
      username: '',
      headline: '',
      medium_avatar_url: '',
      small_cover_url: '',
      permalink: '',
    },
  },
  {
    id: 1,
    child_comments: [
      {
        id: 3,
        commentable_id: 100,
        parent_id: 1,
        created_at: '',
        liked: false,
        likes_count: 0,
        text: '',
        user: {
          id: 10,
          followed: false,
          full_name: '',
          username: '',
          headline: '',
          medium_avatar_url: '',
          small_cover_url: '',
          permalink: '',
        },
      },
      {
        id: 4,
        commentable_id: 100,
        parent_id: 1,
        created_at: '',
        liked: false,
        likes_count: 0,
        text: '',
        user: {
          id: 10,
          followed: false,
          full_name: '',
          username: '',
          headline: '',
          medium_avatar_url: '',
          small_cover_url: '',
          permalink: '',
        },
      },
    ],
    commentable_id: 100,
    parent_id: null,
    created_at: '',
    liked: false,
    likes_count: 0,
    text: '',
    user: {
      id: 11,
      followed: false,
      full_name: '',
      username: '',
      headline: '',
      medium_avatar_url: '',
      small_cover_url: '',
      permalink: '',
    },
  },
];

describe('updateCommentsService', () => {
  describe('comment to update is at level 1', () => {
    it('should apply the updater function correctly', () => {
      const toggleLiked = (comment: Comment) => ({
        ...comment,
        liked: !comment.liked,
      });
      const result = updateComments(toggleLiked)(1, null)(stubComments);
      expect(result[1].liked).toBeTruthy();
    });

    it('should apply the updater function correctly', () => {
      const toggleFollowed = (comment: Comment) => ({
        ...comment,
        user: { ...comment.user, followed: !comment.user.followed },
      });
      const result = updateComments(toggleFollowed)(0, null)(stubComments);
      expect(result[0].user.followed).toBeTruthy();
    });

    it('should apply the updater function correctly', () => {
      const decrementLikesCount = (comment: Comment) => ({
        ...comment,
        likes_count: comment.likes_count - 1,
      });
      const result = updateComments(decrementLikesCount)(0, null)(stubComments);
      expect(result[0].likes_count).toEqual(stubComments[0].likes_count - 1);
    });
  });

  describe('the comment to update is nested at level 2', () => {
    it('should apply the updater function correctly', () => {
      const toggleLiked = (comment: Comment) => ({
        ...comment,
        liked: !comment.liked,
      });
      const result = updateComments(toggleLiked)(4, 1)(stubComments);
      expect(result[1].child_comments![1].liked).toBeTruthy();
    });
  });
});
