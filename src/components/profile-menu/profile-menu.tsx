import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ProfileMenuUI } from '@ui';

import { useDispatch } from '../../services/store';
import { userSignOut } from '../../services/slices/UserSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(userSignOut()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed: ', error);
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
