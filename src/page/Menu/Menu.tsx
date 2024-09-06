import { ChangeEvent, FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './Menu.module.css';
import { MenuProps } from './Menu.props';
import Search from '../../components/Search/Search';
import Header from '../../components/Header/Header';
import { DishIface } from '../../interfaces/dish.interface';
import { API_PREFIX } from '../../helpers/constants';
import axios, { AxiosError } from 'axios';
import DishList from '../../components/DishList/DishList';

const Menu: FC<MenuProps> = () => {
  const [dishes, setDishes] = useState<DishIface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>('');

  const onChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const getDishes = async (name?: string) => {
    try {
      setIsLoading(true);
      setError(undefined);
      const { data } = await axios.get<DishIface[]>(`${API_PREFIX}/products`, {
        params: {
          name: name,
        },
      });
      setDishes(data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      if (e instanceof AxiosError) setError(e.message);
      console.error(e);
    }
  };

  useEffect(() => {
    getDishes(filter);
  }, [filter]);

  return (
    <div className={styles.Menu}>
      <div className={cn(styles.Head)}>
        <Header>Menu</Header>
        <Search
          placeholder="Enter dish or ingredients"
          onChange={onChangeFilter}
        />
      </div>
      <div>
        {error && <>{error}</>}
        {isLoading && <>Loading ...</>}
        {!isLoading && <DishList dishes={dishes} />}
      </div>
    </div>
  );
};

export default Menu;
