import { FC, FormEvent, useEffect } from 'react';
import cn from 'classnames';
import styles from './Login.module.css';
import { LoginForm, LoginProps } from './Login.props';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { login, userActions } from '../../store/user.slice';

const Login: FC<LoginProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) navigate('/');
  }, [jwt, navigate]);

  const onLogin = (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearError());
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    loginRequest(email.value, password.value);
  };

  const loginRequest = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  return (
    <div className={styles.Login}>
      <Header>Sign in</Header>
      {loginErrorMessage && <div className={styles.Error}>{loginErrorMessage}</div>}
      <form
        className={cn(styles.Form)}
        onSubmit={onLogin}
      >
        <div className={cn(styles.Field)}>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            placeholder="email"
            name="email"
          />
        </div>
        <div className={cn(styles.Field)}>
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            placeholder="password"
            name="password"
            type="password"
          />
        </div>
        <Button appearance="big">Sign in</Button>
      </form>
      <div className={styles.Links}>
        <div>no account?</div>
        <Link to="auth/register">sign up</Link>
      </div>
    </div>
  );
};

export default Login;
