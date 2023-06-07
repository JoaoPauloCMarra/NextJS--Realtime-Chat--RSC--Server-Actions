import { FC } from 'react';
import styles from './Loading.module.css';

type Props = {
  full?: boolean;
};

export const testID = {
  container: 'Loading',
  spinner: 'Loading--Spinner',
};

const Loading: FC<Props> = ({ full }) => (
  <div className={`${styles.container}${full ? ` ${styles.containerFull}` : ''}`} data-testid={testID.container}>
    <div className={styles.spinner} data-testid={testID.spinner}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loading;
