import { FC } from 'react';
import styles from './CartItem.module.css';
import { CartItemProps } from './CartItem.props';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

const CartItem: FC<CartItemProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const increment = () => {
    dispatch(cartActions.add(props.id));
  };

  const decrement = () => {
    dispatch(cartActions.delete(props.id));
  };

  const deleteAll = () => {
    dispatch(cartActions.removeAll(props.id));
  };

  return (
    <div className={styles.CartItem}>
      <div
        className={styles.Image}
        style={{ backgroundImage: `url(${props.image})` }}
      />
      <div className={styles.Description}>
        <div className={styles.Name}>{props.name}</div>
        <div className={styles.Currency}>{props.price}&nbsp;₽</div>
      </div>
      <div className={styles.Actions}>
        <button
          className={styles.Minus}
          onClick={decrement}
        >
          <img
            src="/minus-icon.svg"
            alt="Remove to cart"
          />
        </button>
        <div className={styles.Count}>{props.count}</div>
        <button
          className={styles.Plus}
          onClick={increment}
        >
          <img
            src="/plus-icon.svg"
            alt="Add to cart"
          />
        </button>
        <button
          className={styles.DeleteAll}
          onClick={deleteAll}
        >
          <img
            src="/delete-icon.svg"
            alt="Delete all"
          />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
