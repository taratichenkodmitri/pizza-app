import { FC } from 'react';
import cn from 'classnames';
import styles from './MenuLayout.module.css';
import { MenuLayoutProps } from './MenuLayout.props';
import { Link, Outlet } from 'react-router-dom';

const MenuLayout: FC<MenuLayoutProps> = () => {
  return (
    <div className={cn(styles.MenuLayout)}>
      <div>
        <Link to="/">Menu</Link>
        <Link to="/cart">Cart</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MenuLayout;
