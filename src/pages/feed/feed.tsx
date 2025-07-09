import { FC, useEffect } from 'react';

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';

import { useDispatch, useSelector } from '../../services/store';
import {
  getFeed,
  getFeedOrders,
  getLoadingStatus
} from '../../services/slices/FeedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getLoadingStatus);

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(getFeedOrders);

  if (!orders.length || isLoading) {
    return <Preloader />;
  }

  const handleGetAllOrders = () => {
    dispatch(getFeed());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetAllOrders} />;
};
