import { FC } from 'react';
import cn from 'classnames';
import styles from './MenuLayout.module.css';
import { MenuLayoutProps } from './MenuLayout.props';
import { NavLink, Outlet } from 'react-router-dom';
import Button from '../../components/Button/Button';

const MenuLayout: FC<MenuLayoutProps> = () => {
  return (
    <div className={cn(styles.MenuLayout)}>
      <div className={cn(styles.Sidebar)}>
        <div className={styles.User}>
          <img
            className={styles.Avatar}
            src="avatar.png"
            alt="Avatar"
          />
          <div className={styles.Username}>User name</div>
          <div className={styles.Email}>user@user.com</div>
        </div>
        <div className={styles.Menu}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(styles.Link, {
                [styles.Active]: isActive,
              })
            }
          >
            <img
              src="menu-icon.svg"
              alt="Menu icon"
            ></img>
            Menu
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn(styles.Link, {
                [styles.Active]: isActive,
              })
            }
          >
            <img
              src="cart-icon.svg"
              alt="Cart icon"
            ></img>
            Cart
          </NavLink>
        </div>
        <Button className={styles.Exit}>
          <img
            src="exit-icon.svg"
            alt="Exit icon"
          />
          Exit
        </Button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MenuLayout;
