import { FC } from 'react';
import styles from './Loading.module.css';

type Props = {
  full?: boolean;
};

const Loading: FC<Props> = ({ full }) => {
  return (
    <div className={`${styles.container}${full ? ` ${styles.containerFull}` : ''}`}>
      <div className={styles.spinner}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loading;
