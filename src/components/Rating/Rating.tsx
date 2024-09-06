import { FC } from 'react';
import styles from './Rating.module.css';
import { RatingProps } from './Rating.props';
import cn from 'classnames';

const Rating: FC<RatingProps> = ({ rating, className, ...props }) => {
  return (
    <div
      {...props}
      className={cn(styles.Rating, className)}
    >
      {rating}&nbsp;
      <img
        src="/star-icon.svg"
        alt="Star icon"
      />
    </div>
  );
};

export default Rating;
