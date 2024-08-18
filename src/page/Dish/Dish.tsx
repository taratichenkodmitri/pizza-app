import { FC } from 'react';
import cn from 'classnames';
import styles from './Dish.module.css';
import { DishProps } from './Dish.props';
import { useLoaderData } from 'react-router-dom';
import { DishIface } from '../../interfaces/dish.interface';

const Dish: FC<DishProps> = () => {
  const data = useLoaderData() as DishIface;
  return (
    <>
      <div className={cn(styles.Dish)}> Dish - {data.name} </div>
    </>
  );
};

export default Dish;
