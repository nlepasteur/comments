import withPagination from 'HOC/withPagination';
import withComments from './withComments';
import Comments from './Comments';

export default withPagination(withComments(Comments));
