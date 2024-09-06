import { FC, Suspense } from 'react';
import styles from './Dish.module.css';
import { DishProps } from './Dish.props';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { DishIface } from '../../interfaces/dish.interface';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Rating from '../../components/Rating/Rating';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

const Dish: FC<DishProps> = () => {
  const data = useLoaderData() as { data: DishIface };
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const addToCart = (id: number) => {
    return () => dispatch(cartActions.add(id));
  };

  return (
    <Suspense fallback={<>Loading ...</>}>
      <Await resolve={data.data}>
        {({ data }: { data: DishIface }) => (
          <div className={styles.Dish}>
            <div className={styles.Head}>
              <button
                className={styles.Back}
                onClick={() => navigate('/')}
              >
                <img
                  src="/back-icon.svg"
                  alt="Back icon"
                />
              </button>
              <Header>{data.name}</Header>
              <Button
                className={styles.ToCart}
                onClick={addToCart(data.id)}
              >
                <div className={styles.ToCartContent}>
                  <img
                    src="/to-cart-icon.svg"
                    alt="To cart icon"
                  />
                  <div>To cart</div>
                </div>
              </Button>
            </div>
            <div className={styles.Description}>
              <div
                style={{ backgroundImage: `url(${data.image})` }}
                className={styles.DescriptionImage}
              />
              <div className={styles.DescriptionContent}>
                <div>
                  <div className={styles.DescriptionProp}>
                    <div className={styles.DescriptionText}>Price</div>
                    <div className={styles.DescriptionPrice}>
                      {data.price}&nbsp;
                      <span className={styles.DescriptionCurrency}>₽</span>
                    </div>
                  </div>
                  <hr className={styles.DescriptionHr} />
                </div>
                <div className={styles.DescriptionProp}>
                  <div className={styles.DescriptionText}>Rating</div>
                  <Rating rating={data.rating} />
                </div>
                <div className={styles.DescriptionIngredients}>
                  <div>Ingredients: </div>
                  <ul>
                    {data.ingredients.map((i) => (
                      <li>{i}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default Dish;
