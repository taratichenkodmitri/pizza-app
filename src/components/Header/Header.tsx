import { FC } from 'react';
import cn from 'classnames';
import styles from './Header.module.css';
import { HeaderProps } from './Header.props';

const Header: FC<HeaderProps> = ({ children, className, ...props }) => {
  return (
    <>
      <h1
        {...props}
        className={cn(styles.Header, className)}
      >
        {children}
      </h1>
    </>
  );
};

export default Header;
