import type { ComponentType } from 'react';

import type { Comment } from 'types';

import { useCallback } from 'react';

import { comment as commentRequest } from './comment';

import type { PostComment, EditComment, DeleteComment } from 'types';

type UnwrappedComponentProps<T> = {
  comment(args: PostComment | EditComment | DeleteComment): Promise<void>;
} & T;

type Props<T> = {
  commentsUpdater(comment: Comment): (comments: Comment[]) => Comment[];
  updateComments(commentsUpdater: (comments: Comment[]) => Comment[]): void;
} & T;

function withPostComment<T>(
  UnwrappedComponentProps: ComponentType<UnwrappedComponentProps<T>>
) {
  const WithPostComment = ({
    commentsUpdater,
    updateComments,
    ...props
  }: Omit<Props<T>, 'comment'>) => {
    const onSuccessCallback = (comment: Comment) => {
      console.log('ONSUCCESS BLOCK: ');
      updateComments(commentsUpdater(comment));
    };

    const comment = useCallback(
      async (args: PostComment | EditComment | DeleteComment) => {
        commentRequest(args)(onSuccessCallback);
      },
      []
    );

    return (
      <UnwrappedComponentProps comment={comment} {...(props as Props<T>)} />
    );
  };
  return WithPostComment;
}

export default withPostComment;
