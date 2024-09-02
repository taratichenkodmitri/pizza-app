import { LoginForm } from '../Login/Login.props';

export interface RegisterProps {}
export interface RegisterForm extends LoginForm {
  name: {
    value: string;
  };
}
