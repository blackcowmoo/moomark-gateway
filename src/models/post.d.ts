interface PostInput {
  id?: number;
  title: string;
  content: string;
}

interface Post extends PostInput {
  userId?: string;
  uploadTime?: string;
  recommendCount?: number;
  viewsCount?: number;
  user?: User;
}
