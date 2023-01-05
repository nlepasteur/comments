import { Comment } from 'types';

import data from '../../src/data.json';

import {
  replaceComment,
  deleteComment,
  addComment,
} from '../../src/services/comments.service2';

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

// besoin de l'id du commentaire uniquement aussi
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

  // describe('the comment to be deleted is nested at the second level of comments', () => {
  //   it('it should return the comments without the supposedly deleted comment', () => {
  //     const comments: Comment[] = data.comments.data;
  //     const deletedComment: Comment = data.comments.data[0].child_comments[0];
  //     const updatedComments = deleteComment(deletedComment)(comments);
  //     const expectation = updatedComments[0].child_comments!.every(
  //       (comment) => comment.id !== deletedComment.id
  //     );
  //     expect(expectation).toBeFalsy();
  //   });
  // });
});

describe('addComment', () => {
  describe('the comment must be added to the first level of comments', () => {
    it('should add the new comment to the end of the existing comments', () => {
      const comments: Comment[] = data.comments.data;
      const newComment = makeStubComment('', 12345, 45321);
      const updatedComments = addComment(newComment)(comments);
      const expectation =
        updatedComments[updatedComments.length - 1].id === newComment.id;
      expect(expectation).toBeTruthy();
    });
  });
});

function makeStubComment(
  text: string, // nécessaire pour edit
  commentId: number,
  userId: number // également utile faute de backend (pour savoir si le commentaire ajouté ou édité est de l'utilisateur)
  // parentId: null | number, // nécessaire finalement pour créer stub faute de backend (quoi que pas vraiment utile de connaître ça pour modifier les commentaires finalement)
) {
  return {
    id: commentId,
    commentable_id: 100,
    parent_id: 15,
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
