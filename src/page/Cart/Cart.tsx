import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './Cart.module.css';
import { CartProps } from './Cart.props';
import Header from '../../components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { DishIface } from '../../interfaces/dish.interface';
import axios from 'axios';
import { API_PREFIX } from '../../helpers/constants';
import CartItem from '../../components/CartItem/CartItem';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart.slice';

const DELIVERY_FEE = 169;

const Cart: FC<CartProps> = () => {
  const [cartDishes, setCartDishes] = useState<DishIface[]>([]);
  const cartItems = useSelector((s: RootState) => s.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const jwt = useSelector((s: RootState) => s.user.jwt);
  const navigate = useNavigate();
  const price = cartItems
    .map((i) => {
      const dish = cartDishes.find((dish) => dish.id === i.id);
      if (!dish) return 0;
      return dish.price * i.count;
    })
    .reduce((acc, item) => (acc += item), 0);

  const getDish = async (id: number) => {
    const { data } = await axios.get<DishIface>(`${API_PREFIX}/products/${id}`);
    return data;
  };

  const getAllDishes = async () => {
    const dishes = await Promise.all(cartItems.map((i) => getDish(i.id)));
    setCartDishes(dishes);
  };

  const makeOrder = async () => {
    await axios.post(
      `${API_PREFIX}/order`,
      {
        products: cartItems,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
    dispatch(cartActions.clean());
    navigate('/success');
  };

  useEffect(() => {
    getAllDishes();
  }, [cartItems]);

  if (cartItems.length === 0) return <div>Cart is empty</div>;
  return (
    <div className={cn(styles.Cart)}>
      <Header className={styles.Head}>Cart</Header>
      {cartItems.map((i) => {
        const dish = cartDishes.find((dish) => dish.id === i.id);
        if (!dish) return;
        return (
          <CartItem
            key={i.id}
            count={i.count}
            {...dish}
          />
        );
      })}
      <div className={styles.Line}>
        <div className={styles.Text}>Price</div>
        <div className={styles.Price}>
          {price}&nbsp;
          <span>₽</span>
        </div>
      </div>
      <hr className={styles.Hr} />
      <div className={styles.Line}>
        <div className={styles.Text}>Delivery</div>
        <div className={styles.Price}>
          {DELIVERY_FEE}&nbsp;
          <span>₽</span>
        </div>
      </div>
      <hr className={styles.Hr} />
      <div className={styles.Line}>
        <div className={styles.Text}>Total</div>
        <div className={styles.Price}>
          {price + DELIVERY_FEE}&nbsp;
          <span>₽</span>
        </div>
      </div>
      <div className={styles.makeOrder}>
        <Button
          appearance="big"
          onClick={makeOrder}
        >
          Make order
        </Button>
      </div>
    </div>
  );
};

export default Cart;
