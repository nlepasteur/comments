type Props = {
  userHeadline: string;
};

const UserHeadline = (props: Props) => (
  <div className="comment-headline">{props.userHeadline}</div>
);

export default UserHeadline;
