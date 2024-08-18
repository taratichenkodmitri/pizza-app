import { FC } from 'react';
import cn from 'classnames';
import styles from './DishList.module.css';
import { DishListProps } from './DishList.props';
import DishCard from '../DishCard/DishCard';

const DishList: FC<DishListProps> = ({ dishes }) => {
  return (
    <div className={cn(styles.DishList)}>
      {dishes.map((dish) => (
        <DishCard
          key={dish.id}
          id={dish.id}
          price={dish.price}
          image={dish.image}
          ingredients={dish.ingredients.join(', ')}
          rating={dish.rating}
          name={dish.name}
        />
      ))}
    </div>
  );
};

export default DishList;
