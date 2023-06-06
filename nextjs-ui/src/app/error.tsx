'use client';

import { FC, useEffect } from 'react';
import styles from './error.module.css';

const Error: FC<{ error: Error; reset: () => void }> = ({ error, reset }) => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <h2>Something went wrong!</h2>
      {error.stack ? (
        <div className={styles.message}>
          <pre>
            <code>{error.stack}</code>
          </pre>
        </div>
      ) : null}
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default Error;
