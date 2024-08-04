import { FC } from 'react';
import cn from 'classnames';
import styles from './Button.module.css';
import { ButtonProps } from './Button.props';

const Button: FC<ButtonProps> = ({ children, appearance = 'small', ...props }) => {
  return (
    <button
      {...props}
      className={cn(styles.Button, styles.Accent, {
        [styles.Small]: appearance === 'small',
        [styles.Big]: appearance === 'big',
      })}
    >
      {children}
    </button>
  );
};

export default Button;
