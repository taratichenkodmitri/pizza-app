import { FC } from 'react';
import cn from 'classnames';
import styles from './SuccessOrder.module.css';
import { SuccessOrderProps } from './SuccessOrder.props';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

const SuccessOrder: FC<SuccessOrderProps> = () => {
  const navigate = useNavigate();

  const makeNewOrder = () => {
    navigate('/');
  };

  return (
    <div className={cn(styles.SuccessOrder)}>
      <img
        src="/pizza.png"
        alt="Pizza image"
      ></img>
      <div className={styles.Text}>Order created successfully</div>
      <Button
        appearance="big"
        onClick={makeNewOrder}
      >
        Make new order
      </Button>
    </div>
  );
};

export default SuccessOrder;
