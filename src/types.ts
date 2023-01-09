export type {
  PostComment,
  EditComment,
  DeleteComment,
} from 'src/componentsv1/Comments/comment';

export type User = {
  id: number;
  followed: boolean;
  full_name: string;
  username: string;
  headline: string;
  medium_avatar_url: string;
  small_cover_url: string;
  permalink: string;
};

type ChildComment = {
  id: number;
  commentable_id: number;
  parent_id: null | number;
  created_at: string;
  liked: boolean;
  likes_count: number;
  text: string;
  user: User;
};

export type Comment = {
  child_comments?: ChildComment[];
} & ChildComment;

export type Like = {
  user: {
    projects_count: number;
    followers_count: number;
    followed: boolean;
    plus_member: boolean;
    id: number;
    username: string;
    full_name: string;
    headline: string;
    medium_avatar_url: string;
    pro_member: boolean;
    permalink: string;
  };
  id: number;
  user_id: number;
  votable_id: number;
  created_at: string;
};
