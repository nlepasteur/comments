type Props = {
  restComments: boolean;
  getNextComments(): void;
};

const ShowMoreCommentsBtn = ({ restComments, getNextComments }: Props) => {
  return restComments ? (
    <button onClick={getNextComments}>
      <i></i>Show more comments
    </button>
  ) : null;
};

export default ShowMoreCommentsBtn;
