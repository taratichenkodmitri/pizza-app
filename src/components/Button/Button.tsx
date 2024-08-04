import { FC } from 'react';
import styles from './Button.module.css';
import { ButtonProps } from './Button.props';

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={styles.Button}
    >
      {children}
    </button>
  );
};

export default Button;
