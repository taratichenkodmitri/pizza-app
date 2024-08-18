import { FC, Suspense } from 'react';
import cn from 'classnames';
import styles from './Dish.module.css';
import { DishProps } from './Dish.props';
import { Await, useLoaderData } from 'react-router-dom';
import { DishIface } from '../../interfaces/dish.interface';

const Dish: FC<DishProps> = () => {
  const data = useLoaderData() as { data: DishIface };
  return (
    <Suspense fallback={<>Loading ...</>}>
      <Await resolve={data.data}>
        {({ data }: { data: DishIface }) => (
          <>
            <div className={cn(styles.Dish)}> Dish - {data.name} </div>
          </>
        )}
      </Await>
    </Suspense>
  );
};

export default Dish;
