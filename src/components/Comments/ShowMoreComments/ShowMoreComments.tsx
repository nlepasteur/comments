type Props = {
  restComments: boolean;
  getNextComments(): void;
};

const ShowMoreComments = ({ restComments, getNextComments }: Props) => {
  return restComments ? (
    <button className="show-more-btn" onClick={getNextComments}>
      <i></i>Show more comments
    </button>
  ) : null;
};

export default ShowMoreComments;
