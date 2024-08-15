import { FC } from 'react';
import cn from 'classnames';
import styles from './Menu.module.css';
import { MenuProps } from './Menu.props';
import Search from '../../components/Search/Search';
import Header from '../../components/Header/Header';
import DishCard from '../../components/DishCard/DishCard';

const Menu: FC<MenuProps> = () => {
  return (
    <div className={styles.Menu}>
      <div className={cn(styles.Head)}>
        <Header>Menu</Header>
        <Search placeholder="Enter dish or ingredients" />
      </div>
      <div>
        <DishCard
          id={1}
          src="dish.png"
          price={300}
          ratio={4.7}
          title={'Наслаждение'}
          ingredients="Салями, руккола, помидоры, оливки"
        />
      </div>
    </div>
  );
};

export default Menu;
