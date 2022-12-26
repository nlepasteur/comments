// unit of code under test
describe('CommentLikeBtn', () => {
  // scenarios
  describe('the user is logged', () => {
    describe('the user did not like the comment', () => {
      // assertions
      it.todo('should display "Like"', () => {
        // arrange
        // act
        // assert
      });

      it.todo('should trigger a post request on click');
    });

    describe('the user liked the comment', () => {
      it.todo('should display "Liked"');
      it.todo('should trigger a delete request on click');
    });

    it.todo('it should embed votable_id as payload when triggering a request');
  });
});
