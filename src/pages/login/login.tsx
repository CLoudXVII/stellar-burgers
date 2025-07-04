import { FC, FormEvent } from 'react';

import { TLoginData } from '@api';
import { LoginUI } from '@ui-pages';

import { useForm } from '../../hooks/useForm';

import { useDispatch } from '../../services/store';
import { userSignIn } from '../../services/slices/UserSlice';

export const Login: FC = () => {
  const [values, onChange] = useForm<TLoginData>({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userLoginData: TLoginData = { ...values };

    dispatch(userSignIn(userLoginData));
  };

  return (
    <LoginUI
      errorText=''
      email={values.email}
      password={values.password}
      onChange={onChange}
      handleSubmit={handleSubmit}
    />
  );
};
