import type { ComponentType } from 'react';

import type { Like } from 'types';

import { useReducer, useCallback, useEffect } from 'react';

type LikesState = {
  error: null | string;
  status: 'init' | 'fetching' | 'failure' | 'success';
  likesTotalCount: null | number;
  likes: Like[];
};

const likesInitialState = {
  error: null,
  status: 'init',
  likes: [],
  likesTotalCount: null,
} as LikesState;

const likesFetchFetching = () => ({ type: 'FETCHING' } as const);
const likesFetchFailure = (payload: string) =>
  ({ type: 'FAILURE', payload } as const);
const likesFetchSuccess = (payload: {
  likes: Like[];
  likesTotalCount: number;
}) => ({ type: 'SUCCESS', payload } as const);
const updateLikes = (likesUpdater: (likes: Like[]) => Like[]) =>
  ({ type: 'UPDATE_LIKES', payload: likesUpdater } as const);

type LikesActionCreator =
  | ReturnType<typeof likesFetchFetching>
  | ReturnType<typeof likesFetchFailure>
  | ReturnType<typeof likesFetchSuccess>
  | ReturnType<typeof updateLikes>;

const likesReducer = (
  state: LikesState,
  action: LikesActionCreator
): LikesState => {
  switch (action.type) {
    case 'FETCHING': {
      return { ...state, error: null, status: 'fetching' };
    }
    case 'FAILURE':
      return { ...state, error: action.payload, status: 'failure' };
    case 'SUCCESS':
      return {
        error: null,
        status: 'success',
        likes: [...state.likes, ...action.payload.likes],
        likesTotalCount: action.payload.likesTotalCount,
      };
    case 'UPDATE_LIKES':
      return { ...state, likes: action.payload(state.likes) };
    default:
      return state;
  }
};

type UnwrappedComponentProps<T> = Omit<LikesState, 'likesTotalCount'> & {
  getNextData(): void;
  updateLikes(likesUpdater: (likes: Like[]) => Like[]): void;
} & T;

type Props<T> = {
  page: number;
  commentId: number;
  incrementPage(currentCount: number, totalCount: number): void;
} & T;

function withLikes<T>(
  UnwrappedComponent: ComponentType<UnwrappedComponentProps<T>>
) {
  const WithLikes = ({
    page,
    incrementPage,
    ...props
  }: Omit<
    Props<T>,
    'error' | 'status' | 'likes' | 'getNextData' | 'updateLikes'
  >) => {
    const [{ likes, likesTotalCount, ...rest }, dispatch] = useReducer(
      likesReducer,
      likesInitialState
    );

    useEffect(() => {
      (async function () {
        try {
          dispatch(likesFetchFetching());
          const response = await fetch(`http://localhost:3000/likes`);
          const parsed = await response.json();
          if (!response.ok) {
            throw new Error('');
          }
          dispatch(
            likesFetchSuccess({
              likes: parsed.data,
              likesTotalCount: parsed.total_count,
            })
          );
        } catch (e) {
          // handle errors
        }
      })();
    }, [page]);

    const getNextData = useCallback(() => {
      if (likesTotalCount) {
        incrementPage(likes.length, likesTotalCount);
      }
    }, [likesTotalCount]);

    const updateLikes = useCallback(
      (likesUpdater: (likes: Like[]) => Like[]) => {
        dispatch({ type: 'UPDATE_LIKES', payload: likesUpdater });
      },
      []
    );
    console.log(rest);
    return (
      <UnwrappedComponent
        updateLikes={updateLikes}
        likes={likes}
        getNextData={getNextData}
        {...rest}
        {...(props as Props<T>)}
      />
    );
  };
  return WithLikes;
}

export default withLikes;
