import withInfiniteScroll from 'HOC/withInfiniteScroll';
import withPagination from 'HOC/withPagination';
import withLikes from './withLikes';
import LikesModal from './LikesModal';

export default withPagination(withLikes(withInfiniteScroll(LikesModal)));
