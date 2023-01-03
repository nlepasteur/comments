import type { ComponentType } from 'react';

import type { Comment } from 'types';

import { useCallback } from 'react';

import { updateComments as updateCommentsService } from 'services/comments.service';

const toggleLiked = (comment: Comment) => ({
  ...comment,
  likes_count: comment.liked
    ? comment.likes_count - 1
    : comment.likes_count + 1,
  liked: !comment.liked,
});

type UnwrappedComponentProps<T> = {
  like(commentid: number, parentId: number): Promise<void>;
  liked: boolean;
} & T;

type Props<T> = {
  liked: boolean;
  isLogged: boolean;
  updateComments(commentUpdater: (Comments: Comment[]) => Comment[]): void;
} & T;

function withLike<T>(
  UnwrappedComponent: ComponentType<UnwrappedComponentProps<T>>
) {
  const WithLike = ({ updateComments, ...props }: Omit<Props<T>, 'like'>) => {
    const onSuccessCallback = useCallback(
      (commentId: number, parentId: null | number) => {
        updateComments(updateCommentsService(toggleLiked)(commentId, parentId));
      },
      []
    );

    const postLike = useCallback(
      async (commentId: number, parentId: number) => {
        onSuccessCallback(commentId, parentId);
      },
      []
    );
    return <UnwrappedComponent like={postLike} {...(props as Props<T>)} />;
  };
  return WithLike;
}

export default withLike;
