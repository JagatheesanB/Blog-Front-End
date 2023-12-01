import { Post } from './post';

export interface Comment {
  id: number;
  comment: string;
  user_id: number;
  post_id: number;
  title?: Post;
}
