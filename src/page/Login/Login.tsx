import { FC, FormEvent, useState } from 'react';
import cn from 'classnames';
import styles from './Login.module.css';
import { LoginForm, LoginProps } from './Login.props';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { API_PREFIX } from '../../helpers/constants';
import { LoginResponse } from '../../interfaces/auth.intetfacer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { userActions } from '../../store/user.slice';

const Login: FC<LoginProps> = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onLogin = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    loginRequest(email.value, password.value);
  };

  const loginRequest = async (email: string, password: string) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${API_PREFIX}/auth/login`, {
        email,
        password,
      });
      dispatch(userActions.setJwt(data.access_token));
      navigate('/');
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data.message);
      }
    }
  };

  return (
    <div className={styles.Login}>
      <Header>Sign in</Header>
      {error && <div className={styles.Error}>{error}</div>}
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
