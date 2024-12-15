import React from 'react';

import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Error 404: Page Not Found</p>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={() => {
            window.location.href = '/';
          }}>
          Take me back to home
        </button>
      </div>
    </div>
  );
}
