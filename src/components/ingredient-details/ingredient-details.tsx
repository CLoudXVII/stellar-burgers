import { FC } from 'react';
import { useParams } from 'react-router-dom';

import styles from '../app/app.module.css';

import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

import { useSelector } from '../../services/store';
import { getIngredientsSelector } from '../../services/slices/IngredientSlice';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(getIngredientsSelector);

  const { id } = useParams();

  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <div className={styles.detailPageWrap}>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </div>
  );
};
