import { FC, useEffect } from 'react';
import cn from 'classnames';
import styles from './MenuLayout.module.css';
import { MenuLayoutProps } from './MenuLayout.props';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, userActions } from '../../store/user.slice';
import { AppDispatch, RootState } from '../../store/store';

const MenuLayout: FC<MenuLayoutProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((s: RootState) => s.user.profile);
  const cartItems = useSelector((s: RootState) => s.cart.items);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const logout = () => {
    dispatch(userActions.logout());
    navigate('/auth/login');
  };

  return (
    <div className={cn(styles.MenuLayout)}>
      <div className={cn(styles.Sidebar)}>
        <div className={styles.User}>
          <img
            className={styles.Avatar}
            src="/avatar.png"
            alt="Avatar"
          />
          <div className={styles.Username}>{profile?.name}</div>
          <div className={styles.Email}>{profile?.email}</div>
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
              src="/menu-icon.svg"
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
              src="/cart-icon.svg"
              alt="Cart icon"
            ></img>
            Cart
            {cartItems.length > 0 && (
              <span className={styles.CartCount}>{cartItems.reduce((acc, item) => (acc += item.count), 0)}</span>
            )}
          </NavLink>
        </div>
        <Button
          className={styles.Exit}
          onClick={logout}
        >
          <img
            src="/exit-icon.svg"
            alt="Exit icon"
          />
          Exit
        </Button>
      </div>
      <div className={styles.Content}>
        <Outlet />
      </div>
    </div>
  );
};

export default MenuLayout;
