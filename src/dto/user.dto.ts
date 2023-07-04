export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export type PatchUserDto = Partial<CreateUserDto>;

export interface UserInfoDTO extends CreateUserDto {
  id: number;
  createdAt: Date;
}
