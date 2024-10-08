import { FC, MouseEvent } from 'react';
import cn from 'classnames';
import styles from './DishCard.module.css';
import { DishCardProps } from './DishCard.props';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
import Rating from '../Rating/Rating';

const DishCard: FC<DishCardProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const addToCart = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
  };

  return (
    <Link
      to={`dish/${props.id}`}
      className={styles.Link}
    >
      <div className={cn(styles.DishCard)}>
        <div
          className={styles.DishCardHeader}
          style={{ backgroundImage: `url(${props.image})` }}
        >
          <div className={styles.DishCardPrice}>
            {props.price}&nbsp;
            <span className={styles.Currency}>₽</span>
          </div>
          <button
            className={styles.DishCardToCart}
            onClick={addToCart}
          >
            <img
              src="/to-cart-icon.svg"
              alt="To cart icon"
            />
          </button>
          <Rating
            rating={props.rating}
            className={styles.DishCardRatio}
          />
        </div>
        <div className={styles.DishCardFooter}>
          <div className={styles.DishCardFooterTitle}>{props.name}</div>
          <div className={styles.DishCardFooterIngredients}>{props.ingredients}</div>
        </div>
      </div>
    </Link>
  );
};

export default DishCard;
