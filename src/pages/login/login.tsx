import { Navigate } from 'react-router-dom';
import { FC, SyntheticEvent, useState } from 'react';

import { TLoginData } from '@api';
import { LoginUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import { getAuthStatus, userSignIn } from '../../services/slices/UserSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const isAuthenticated = useSelector(getAuthStatus);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const userLoginData: TLoginData = {
      email: email,
      password: password
    };
    dispatch(userSignIn(userLoginData));
  };

  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
