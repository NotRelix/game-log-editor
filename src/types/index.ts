export interface RegisterType {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginType {
  username: string;
  password: string;
}

export interface PostType {
  id: number;
  title: string;
  body: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
}

export interface CreatePostType {
  title: string;
  body: string;
  published: boolean;
  headerImg?: File | null;
}
