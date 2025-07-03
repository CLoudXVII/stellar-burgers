import { FC, useEffect } from 'react';

import { Preloader } from '@ui';
import { TOrder } from '@utils-types';
import { ProfileOrdersUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import {
  ordersHistory,
  getOrderLoadingStatus,
  getOrderHistory
} from '../../services/slices/OrderHistorySlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getOrderLoadingStatus);

  const orders: TOrder[] = useSelector(getOrderHistory);

  useEffect(() => {
    dispatch(ordersHistory());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
