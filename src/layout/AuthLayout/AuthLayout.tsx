import { FC } from 'react';
import cn from 'classnames';
import styles from './AuthLayout.module.css';
import { AuthLayoutProps } from './AuthLayout.props';
import { Outlet } from 'react-router-dom';

const AuthLayout: FC<AuthLayoutProps> = () => {
  return (
    <div className={cn(styles.AuthLayout)}>
      <div className={cn(styles.Logo)}>
        <img
          src="/logo.svg"
          alt="Logo icon"
        />
      </div>
      <div className={cn(styles.Content)}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
