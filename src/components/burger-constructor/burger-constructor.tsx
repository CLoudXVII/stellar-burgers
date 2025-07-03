import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';

import { useSelector, useDispatch } from '../../services/store';
import { getAuthStatus } from '../../services/slices/UserSlice';
import {
  getConstructorItems,
  getOrderRequestStatus,
  getOrderModalData,
  createOrder,
  resetOrder
} from '../../services/slices/ConstructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(getConstructorItems);
  const orderModalData = useSelector(getOrderModalData);

  const isRequesting = useSelector(getOrderRequestStatus);
  const isAuthorized = useSelector(getAuthStatus);

  const onOrderClick = () => {
    if (!isAuthorized) {
      return navigate('/login');
    }
    if (!constructorItems.bun || isRequesting) return;

    const order = [
      constructorItems.bun?._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun?._id
    ].filter(Boolean);

    dispatch(createOrder(order));
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={isRequesting}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
