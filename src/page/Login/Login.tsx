import { FC } from 'react';
import cn from 'classnames';
import styles from './Login.module.css';
import { LoginProps } from './Login.props';

const Login: FC<LoginProps> = () => {
  return (
    <>
      <div className={cn(styles.Login)}>Login</div>
    </>
  );
};

export default Login;
