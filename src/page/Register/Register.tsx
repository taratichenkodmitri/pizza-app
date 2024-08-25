import { FC } from 'react';
import cn from 'classnames';
import styles from './Register.module.css';
import { RegisterProps } from './Register.props';

const Register: FC<RegisterProps> = () => {
  return (
    <>
      <div className={cn(styles.Register)}>Register</div>
    </>
  );
};

export default Register;
