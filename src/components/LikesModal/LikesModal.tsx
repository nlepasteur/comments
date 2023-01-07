import type { Like } from 'types';

import Modal from 'components/Modal/Modal';
import LikesList from './LikesList/LikesList';

type Props = {
  error: null | string;
  status: 'init' | 'fetching' | 'failure' | 'success';
  likes: Like[];
  close(): void;
  updateLikes(likesUpdater: (likes: Like[]) => Like[]): void;
  observeElement(ref: HTMLElement): void;
};

const LikesModal = ({ close, ...props }: Props) => (
  <Modal title="People Who Like This" close={close}>
    <LikesList {...props} />
  </Modal>
);

export default LikesModal;
