import { FC } from 'react';

import { TOrder } from '@utils-types';

import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import {
  getFeedOrders,
  getOrdersAmountTotal,
  getOrdersAmountToday
} from '../../services/slices/FeedSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(getFeedOrders);

  const totalAmount = useSelector(getOrdersAmountTotal);
  const totalAmountToday = useSelector(getOrdersAmountToday);

  const feed = {
    total: totalAmount,
    totalToday: totalAmountToday
  };

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
