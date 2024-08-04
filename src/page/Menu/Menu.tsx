import { FC } from 'react';
import cn from 'classnames';
import styles from './Menu.module.css';
import { MenuProps } from './Menu.props';

const Menu: FC<MenuProps> = () => {
  return (
    <>
      <div className={cn(styles.Menu)}>Menu</div>
    </>
  );
};

export default Menu;
