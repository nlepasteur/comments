type Props = {
  text: string;
};

const CommentText = (props: Props) => (
  <div className="comment-text">
    <p>{props.text}</p>
  </div>
);

export default CommentText;
