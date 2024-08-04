import { FC } from 'react';
import cn from 'classnames';
import styles from './Cart.module.css';
import { CartProps } from './Cart.props';

const Cart: FC<CartProps> = () => {
  return (
    <>
      <div className={cn(styles.Cart)}>Cart</div>
    </>
  );
};

export default Cart;
