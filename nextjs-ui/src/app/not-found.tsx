import styles from './not-found.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>404 - Page not found</h1>
      <p>
        <a href="/">Go back to Home</a>
      </p>
    </div>
  );
};

export default NotFound;
