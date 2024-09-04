import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './Cart.module.css';
import { CartProps } from './Cart.props';
import Header from '../../components/Header/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { DishIface } from '../../interfaces/dish.interface';
import axios from 'axios';
import { API_PREFIX } from '../../helpers/constants';
import CartItem from '../../components/CartItem/CartItem';

const Cart: FC<CartProps> = () => {
  const [cartDishes, setCartDishes] = useState<DishIface[]>([]);
  const cartItems = useSelector((s: RootState) => s.cart.items);

  const getDish = async (id: number) => {
    const { data } = await axios.get<DishIface>(`${API_PREFIX}/products/${id}`);
    return data;
  };

  const getAllDishes = async () => {
    const dishes = await Promise.all(cartItems.map((i) => getDish(i.id)));
    setCartDishes(dishes);
  };

  useEffect(() => {
    getAllDishes();
  }, [cartItems]);

  return (
    <div className={cn(styles.Cart)}>
      <Header className={styles.Header}>Cart</Header>
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
    </div>
  );
};

export default Cart;
