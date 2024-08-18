import { FC } from 'react';
import cn from 'classnames';
import styles from './Dish.module.css';
import { DishProps } from './Dish.props';
import { useParams } from 'react-router-dom';

const Dish: FC<DishProps> = () => {
  const { id } = useParams();
  return (
    <>
      <div className={cn(styles.Dish)}> Dish - {id} </div>
    </>
  );
};

export default Dish;
