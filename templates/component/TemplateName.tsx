import { FC } from 'react';
import styles from './TemplateName.module.css';
import { TemplateNameProps } from './TemplateName.props';

const TemplateName: FC<TemplateNameProps> = () => {
  return <div className={styles.TemplateName}></div>;
};

export default TemplateName;
