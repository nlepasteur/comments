import type { ComponentType } from 'react';

import type { Like } from 'types';

import { useCallback } from 'react';

import { updateLikes as updateLikesService } from 'services/likes.service';

type UnwrappedComponentProps = {
  follow(userId: number): Promise<void>;
  userId: number;
  followed: boolean;
};

type Props = {
  userId: number;
  followed: boolean;
  updateLikes(likesUpdater: (likes: Like[]) => Like[]): void;
};

function withFollow(
  UnwrappedComponent: ComponentType<UnwrappedComponentProps>
) {
  const WithFollow = ({
    updateLikes,
    userId,
    followed,
  }: Omit<Props, 'follow'>) => {
    const onSuccessCallback = (userId: number) => {
      updateLikes(updateLikesService(userId));
    };

    const postFollow = useCallback(async (userId: number) => {
      try {
        // normalement ressemblerait à :
        // const response = await fetch(``, {
        //     method: 'POST',
        //     body: JSON.stringify({ followee_id: userId })
        // });
        // const parsed = await response.json();
        // if (!response.ok){
        //     throw new Error('');
        // }
        onSuccessCallback(userId);
      } catch (e) {
        // handle errors
      }
    }, []);

    const deleteFollow = useCallback(async (userId: number) => {
      try {
        // normalement ressemblerait à :
        // const response = await fetch('', {
        //   method: 'DELETE',
        // });
        // const parsed = response.json();
        // if (!response.ok) {
        //   throw new Error('');
        // }
        onSuccessCallback(userId);
      } catch (e) {
        // handle errors
      }
    }, []);

    return (
      <UnwrappedComponent
        follow={followed ? deleteFollow : postFollow}
        followed={followed}
        userId={userId}
      />
    );
  };
  return WithFollow;
}

export default withFollow;
