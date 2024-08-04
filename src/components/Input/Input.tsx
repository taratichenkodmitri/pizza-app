import { forwardRef } from 'react';
import cn from 'classnames';
import styles from './Input.module.css';
import { InputProps } from './Input.props';

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, isValid = true, ...props }, ref) => {
  return (
    <div>
      <input
        {...props}
        ref={ref}
        className={cn(styles.Input, className, {
          [styles.Valid]: isValid,
        })}
      />
    </div>
  );
});

export default Input;
