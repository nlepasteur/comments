type Props = {
  follow(userId: number): Promise<void>;
  followed: boolean;
  userId: number;
};

const FollowBtn = ({ userId, followed, follow }: Props) => (
  <button onClick={() => follow(userId)}>
    <i></i>
    {followed ? 'Following' : 'Follow'}
  </button>
);

export default FollowBtn;
