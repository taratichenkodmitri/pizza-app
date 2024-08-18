import { FC } from 'react';
import cn from 'classnames';
import styles from './DishCard.module.css';
import { DishCardProps } from './DishCard.props';
import { Link } from 'react-router-dom';

const DishCard: FC<DishCardProps> = (props) => {
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
          <button className={styles.DishCardToCart}>
            <img
              src="/to-cart-icon.svg"
              alt="To cart icon"
            />
          </button>
          <div className={styles.DishCardRatio}>
            {props.rating}&nbsp;
            <img
              src="/star-icon.svg"
              alt="Star icon"
            />
          </div>
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
