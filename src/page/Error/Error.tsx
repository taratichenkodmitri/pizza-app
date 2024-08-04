import { FC } from 'react';
import cn from 'classnames';
import styles from './Error.module.css';
import { ErrorProps } from './Error.props';

const Error: FC<ErrorProps> = () => {
  return (
    <>
      <div className={cn(styles.Error)}>Error</div>
    </>
  );
};

export default Error;
