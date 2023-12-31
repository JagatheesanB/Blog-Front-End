import { User } from './user';

export interface Post {
  id: number;
  title: string;
  content: string;
  user_id: number;
  user?: User;
}
