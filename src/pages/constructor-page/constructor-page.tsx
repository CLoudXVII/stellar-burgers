import { FC } from 'react';

import styles from './constructor-page.module.css';

import { Preloader } from '../../components/ui';
import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';

import { useSelector } from '../../services/store';
import { getLoadingStatus } from '../../services/slices/IngredientSlice';

export const ConstructorPage: FC = () => {
  const isLoading = useSelector(getLoadingStatus);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
