import { OutputData } from '@editorjs/editorjs';

export type CreateUserDto = {
  fullName: string;
} & LoginDto;

export type LoginDto = {
  email: string;
  password: string;
};

export type ResponseUser = {
  createdAt: string;
  email: string;
  commentsCount?: number;
  fullName: string;
  id: number;
  token: string;
  updatedAt: string;
};

export type PostItem = {
  title: string;
  body: OutputData["blocks"];
  tags: null | string;
  id: number;
  user: ResponseUser;
  views: number;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type CommentItem = {
  id: number;
  text: string;
  post: PostItem;
  user: ResponseUser;
  createdAt: string;
  updatedAt: string;
};
