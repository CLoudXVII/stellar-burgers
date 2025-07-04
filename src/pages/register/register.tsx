import { FC, SyntheticEvent, useState } from 'react';

import { Preloader } from '@ui';
import { TRegisterData } from '@api';
import { RegisterUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import {
  getUserRequestStatus,
  userSignUp
} from '../../services/slices/UserSlice';
import { useForm } from '../../hooks/useForm';

export const Register: FC = () => {
  const [values, onChange] = useForm<TRegisterData>({
    name: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();

  const isLoading = useSelector(getUserRequestStatus);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const user: TRegisterData = { ...values };

    dispatch(userSignUp(user));
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText=''
      email={values.email}
      userName={values.name}
      password={values.password}
      onChange={onChange}
      handleSubmit={handleSubmit}
    />
  );
};
