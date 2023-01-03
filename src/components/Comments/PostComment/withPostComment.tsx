import type { ComponentType } from 'react';

import type { Comment } from 'types';

import { useCallback } from 'react';

import { addComment } from 'services/comments.service';

type UnwrappedComponentProps<T> = {
  postComment(
    text: string,
    parentId: null | number,
    userId: number
  ): Promise<void>;
} & T;

const makeStubComment = (
  text: string,
  parentId: null | number,
  userId: number
) => {
  const commentBase = {
    id: 1000000,
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
  if (parentId === null) {
    return commentBase;
  }
  return { ...commentBase, child_comments: [] };
};

type Props<T> = {
  updateComments(commentsUpdater: (comments: Comment[]) => Comment[]): void;
} & T;

function withPostComment<T>(
  UnwrappedComponentProps: ComponentType<UnwrappedComponentProps<T>>
) {
  const WithPostComment = ({
    updateComments,
    ...props
  }: Omit<Props<T>, 'postComment'>) => {
    const onSuccessCallback = useCallback((comment: Comment) => {
      updateComments(addComment(comment));
    }, []);

    const postComment = useCallback(
      async (text: string, parentId: null | number, userId: number) => {
        // normalement userId retrouvé depuis serveur et le récupère depuis réponse
        try {
          // normalement :
          // const response = await fetch('', {
          //   method: 'POST',
          //   body: JSON.stringify({
          //     commentable_id: parentId,
          //     text,
          //   }),
          // });
          // const parsed = await response.json();
          // if (!response.ok){
          //     throw new Error('')
          // }

          onSuccessCallback(makeStubComment(text, parentId, userId));
        } catch (e) {
          // handle errors
        }
      },
      []
    );

    return (
      <UnwrappedComponentProps
        postComment={postComment}
        {...(props as Props<T>)}
      />
    );
  };
  return WithPostComment;
}

export default withPostComment;
