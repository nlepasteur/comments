import { Comment } from 'types';

import data from '../../db.json';

import {
  replaceComment,
  deleteComment,
  addComment,
} from '../../src/services/comments.service';

// besoin de l'id du commentaire simplement donc
describe('replaceComment', () => {
  describe('the comment to be replaced is at the first level of comments', () => {
    const comments: Comment[] = data.comments.data;
    const newComment: Comment = {
      ...comments[0],
      text: 'new text',
    };
    const updatedComments = replaceComment(newComment)(comments);
    it('should return the comments with the updated comment', () => {
      const expectation = updatedComments[0].id === newComment.id;
      expect(expectation).toBeTruthy();
    });

    it('the text of the commentary has changed', () => {
      const expectation = updatedComments[0].text === newComment.text;
      expect(expectation).toBeTruthy();
    });

    it('all comments remained in the same order', () => {
      //
    });
  });

  describe('the comment to be replaced is nested at the second level of comments', () => {
    const comments: Comment[] = data.comments.data;
    const newComment: Comment = {
      ...data.comments.data[0].child_comments[0],
      text: 'new text',
    };
    const updatedComments = replaceComment(newComment)(comments);
    it('should return the comments with the updated comment', () => {
      const expectation =
        updatedComments[0].child_comments![0].id === newComment.id;
      expect(expectation).toBeTruthy();
    });

    it('the text of the commentary has changed', () => {
      const expectation =
        updatedComments[0].child_comments![0].text === newComment.text;
      expect(expectation).toBeTruthy();
    });

    it('all comments remained in the same order', () => {
      //
    });
  });
});

// besoin de l'id du commentaire, et de parent_id pour mise à jour du state
describe('DeleteComment', () => {
  describe('the comment to be deleted is at the first level of comments', () => {
    it('it should return the comments without the supposedly deleted comment', () => {
      const comments: Comment[] = data.comments.data;
      const deletedComment: Comment = data.comments.data[0];
      const updatedComments = deleteComment(deletedComment)(comments);
      const expectation = !!updatedComments.find(
        (comment) => comment.id === deletedComment.id
      );
      expect(expectation).toBeFalsy();
    });
  });

  describe('the comment to be deleted is nested at the second level of comments', () => {
    it('it should return the comments without the supposedly deleted comment', () => {
      const comments: Comment[] = data.comments.data;
      const deletedComment: Comment = data.comments.data[0].child_comments[0];
      const updatedComments = deleteComment(deletedComment)(comments);
      const expectation = updatedComments[0].child_comments!.every(
        (comment) => comment.id !== deletedComment.id
      );
      expect(expectation).toBeTruthy();
    });
  });
});

// nécessite text, parent_id, ainsi que user_id pour le stub, et pas comment_id (puisque doit se créer)
describe('addComment', () => {
  describe('the comment must be added to the first level of comments', () => {
    it('should add the new comment to the end of the existing comments', () => {
      const comments: Comment[] = data.comments.data;
      const newComment = makeStubComment('', 12345, 54321, null);
      const updatedComments = addComment(newComment)(comments);
      const expectation =
        updatedComments[updatedComments.length - 1].id === newComment.id;
      expect(expectation).toBeTruthy();
    });

    it('should always be the same number of comments + 1', () => {
      const comments: Comment[] = data.comments.data;
      const newComment = makeStubComment('', 12345, 54321, null);
      const updatedComments = addComment(newComment)(comments);
      const expectation = comments.length + 1 === updatedComments.length;
      expect(expectation).toBeTruthy();
    });
  });

  describe('the comment should be added as a child component', () => {
    it('should add the new comment to the end of the existing child comments', () => {
      const comments: Comment[] = data.comments.data;
      const newComment = makeStubComment('', 12345, 54321, comments[1].id);
      const updatedComments = addComment(newComment)(comments);
      const expectation = updatedComments[1].child_comments!.find(
        (comment) => comment.id === newComment.id
      );
      expect(expectation).toBeTruthy();
    });

    it('should always be the same number of child comments + 1', () => {
      const comments: Comment[] = data.comments.data;
      const newComment = makeStubComment('', 12345, 54321, comments[1].id);
      const updatedComments = addComment(newComment)(comments);
      const expectation =
        comments[1].child_comments!.length + 1 ===
        updatedComments[1].child_comments!.length;
      expect(expectation).toBeTruthy();
    });
  });
});

function makeStubComment(
  text: string, // nécessaire pour edit
  commentId: number,
  userId: number, // également utile faute de backend (pour savoir si le commentaire ajouté ou édité est de l'utilisateur)
  parentId: null | number // nécessaire
) {
  return {
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
      medium_avatar_url: '',
      small_cover_url: '',
      permalink: '',
    },
  };
}
