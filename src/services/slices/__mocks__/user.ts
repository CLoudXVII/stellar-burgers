import { TUser } from '@utils-types';

export const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Username'
};

export const mockUpdatedUser = {
  success: true,
  user: {
    email: 'test@example.com',
    name: 'UpdatedUsername'
  }
};

export const mockRegisterData = {
  email: 'test@example.com',
  name: 'Username',
  password: 'ExamplePassword'
};

export const mockLoginData = {
  email: 'test@example.com',
  password: 'ExamplePassword'
};
