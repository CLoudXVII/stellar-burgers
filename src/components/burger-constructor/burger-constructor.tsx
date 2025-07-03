import { FC, useMemo } from 'react';

import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';

import { useSelector } from '../../services/store';
import {
  getConstructorItems,
  getOrderModalData,
  getOrderRequest
} from '../../services/slices/ConstructorSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  // TODO: Добавить проверку на авторизацию и возможность заказа/сброса

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

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
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
