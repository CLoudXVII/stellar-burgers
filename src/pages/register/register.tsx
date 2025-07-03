import { FC, SyntheticEvent, useState } from 'react';

import { Preloader } from '@ui';
import { TRegisterData } from '@api';
import { RegisterUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import {
  getUserRequestStatus,
  userSignUp
} from '../../services/slices/UserSlice';

export const Register: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const dispatch = useDispatch();

  const isLoading = useSelector(getUserRequestStatus);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const user: TRegisterData = {
      name: userName,
      email: email,
      password: password
    };

    dispatch(userSignUp(user));
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
