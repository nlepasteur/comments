import type { Like as LikeType } from 'types';

import Like from './Like/Like';

type Props = {
  error: null | string;
  status: 'init' | 'fetching' | 'failure' | 'success';
  likes: LikeType[];
  updateLikes(likesUpdater: (likes: LikeType[]) => LikeType[]): void;
  observeElement(ref: HTMLElement): void;
};

const LikesList = ({
  error,
  status,
  likes,
  observeElement,
  ...props
}: Props) => (
  <>
    {status === 'init' || status === 'fetching' ? (
      <div>spinner</div>
    ) : (
      <ul>
        {likes.map((like) => (
          <li key={like.id} className="modal-item">
            <Like {...props} like={like} />
          </li>
        ))}
      </ul>
    )}
  </>
);

export default LikesList;
