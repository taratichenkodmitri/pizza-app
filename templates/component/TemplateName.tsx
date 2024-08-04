import { FC } from 'react';
import cn from 'classnames';
import styles from './TemplateName.module.css';
import { TemplateNameProps } from './TemplateName.props';

const TemplateName: FC<TemplateNameProps> = () => {
  return (
    <>
      <div className={cn(styles.TemplateName)}></div>;
    </>
  );
};

export default TemplateName;
