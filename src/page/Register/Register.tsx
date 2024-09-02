import { FC, FormEvent, useEffect } from 'react';
import cn from 'classnames';
import styles from './Register.module.css';
import { RegisterForm, RegisterProps } from './Register.props';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { register, userActions } from '../../store/user.slice';

const Register: FC<RegisterProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { jwt, errorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) navigate('/');
  }, [jwt, navigate]);

  useEffect(() => {
    dispatch(userActions.clearError());
  }, [dispatch]);

  const onRegister = (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearError());
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password, name } = target;
    registerRequest(email.value, password.value, name.value);
  };

  const registerRequest = (email: string, password: string, name: string) => {
    dispatch(register({ email, password, name }));
  };

  return (
    <div className={cn(styles.Register)}>
      <Header>Sign up</Header>
      {errorMessage && <div className={styles.Error}>{errorMessage}</div>}
      <form
        className={cn(styles.Form)}
        onSubmit={onRegister}
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
        <div className={cn(styles.Field)}>
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            placeholder="name"
            name="name"
          />
        </div>
        <Button appearance="big">Sign up</Button>
      </form>
      <div className={styles.Links}>
        <div>do you have an account?</div>
        <Link to="/auth/login">sign in</Link>
      </div>
    </div>
  );
};

export default Register;
