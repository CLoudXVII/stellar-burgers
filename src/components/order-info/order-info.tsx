import { FC, useMemo, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { TIngredient } from '@utils-types';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TOrderInfo } from '../ui/order-info/type';

import { getIngredientsSelector } from '../../services/slices/IngredientSlice';
import { useSelector, useDispatch } from '../../services/store';
import {
  clearChosenOrder,
  getChosenOrder,
  getLoadingStatus,
  getOrderByNumber
} from '../../services/slices/FeedSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams();

  const dispatch = useDispatch();

  const orderData = useSelector(getChosenOrder);
  const isLoading = useSelector(getLoadingStatus);
  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);

  useEffect(() => {
    if (number) {
      dispatch(clearChosenOrder());
      dispatch(getOrderByNumber(+number));
    }
  }, [number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isLoading && !orderData) {
    return <Preloader />;
  }

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
