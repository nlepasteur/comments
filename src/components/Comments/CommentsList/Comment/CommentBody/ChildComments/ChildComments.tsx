import type { ComponentType } from 'react';

import type { Comment } from 'types';

import CommentsList from 'components/Comments/CommentsList/CommentsList';

type Props = {
  comments: Comment[];
  isLogged: boolean;
  updateComments(commentsUpdater: (comments: Comment[]) => Comment[]): void;
};

const ChildrenComments: ComponentType<Props> = (props) => (
  <CommentsList {...props} />
);

export default ChildrenComments;
