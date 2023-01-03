import type { ComponentType } from 'react';

import type { Comment } from 'types';

import { useState, useCallback, useEffect } from 'react';

type UnwrappedComponentProps<T> = {
  comments: Comment[];
  commentsTotalCount: number;
  updateComments(commentsUpdater: (comments: Comment[]) => Comment[]): void;
  getNextComments(): void;
} & T;

type Props<T> = {
  projectId?: number;
  page: number;
  incrementPage(currentCount: number, totalCount: number): () => void;
} & T;

function withComments<T>(
  UnwrappedComponent: ComponentType<UnwrappedComponentProps<T>>
) {
  const WithComments = ({
    projectId,
    page,
    incrementPage,
    ...props
  }: Omit<
    Props<T>,
    'comments' | 'commentsTotalCount' | 'updateComments' | 'getNextComments'
  >) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentsTotalCount, setCommentsTotalCount] = useState<null | number>(
      null
    );

    useEffect(() => {
      (async function () {
        try {
          const response = await fetch(`http://localhost:3000/comments`);
          const parsed = await response.json();
          if (!response.ok) {
            throw new Error('');
          }
          if (!comments.length) {
            setComments(parsed.data);
            setCommentsTotalCount(parsed.total_count);
          } else {
            setComments((comments) => [...comments, ...parsed.data]);
          }
        } catch (e) {
          // handle errors
        }
      })();
    }, [page, projectId]);

    const getNextComments = useCallback(
      (commentsCurrentCount: number, commentsTotalCount: number) => () => {
        if (commentsTotalCount > commentsCurrentCount) {
          incrementPage(commentsCurrentCount, commentsTotalCount);
        }
      },
      []
    );

    const updateComments = useCallback(
      (commentsUpdater: (comment: Comment[]) => Comment[]) => {
        setComments((previousComments) => commentsUpdater(previousComments));
      },
      []
    );

    if (commentsTotalCount === null) {
      return null;
    }

    return (
      <UnwrappedComponent
        comments={comments}
        commentsTotalCount={commentsTotalCount}
        updateComments={updateComments}
        getNextComments={getNextComments(comments.length, commentsTotalCount)}
        {...(props as Props<T>)}
      />
    );
  };
  return WithComments;
}

export default withComments;
