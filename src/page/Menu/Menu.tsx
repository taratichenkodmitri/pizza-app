import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './Menu.module.css';
import { MenuProps } from './Menu.props';
import Search from '../../components/Search/Search';
import Header from '../../components/Header/Header';
import DishCard from '../../components/DishCard/DishCard';
import { DishIface } from '../../interfaces/dish.interface';
import { API_PREFIX } from '../../helpers/constants';

const Menu: FC<MenuProps> = () => {
  const [dishes, setDishes] = useState<DishIface[]>([]);

  const getDishes = async () => {
    try {
      const res = await fetch(`${API_PREFIX}/products`);
      if (!res.ok) return;

      const data = (await res.json()) as DishIface[];
      setDishes(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getDishes();
  }, []);

  return (
    <div className={styles.Menu}>
      <div className={cn(styles.Head)}>
        <Header>Menu</Header>
        <Search placeholder="Enter dish or ingredients" />
      </div>
      <div>
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
    </div>
  );
};

export default Menu;
