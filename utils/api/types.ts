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
  fullName: string;
  id: number;
  token: string;
  updatedAt: string;
};
