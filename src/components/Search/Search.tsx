import { FC } from 'react';
import cn from 'classnames';
import styles from './Search.module.css';
import { SearchProps } from './Search.props';

const Search: FC<SearchProps> = ({ ...props }) => {
  return (
    <div className={cn(styles.Search)}>
      <input
        {...props}
        className={styles.SearchInput}
      />
      <img
        className={styles.SearchIcon}
        src="/search-icon.svg"
        alt="Search icon"
      />
    </div>
  );
};

export default Search;
