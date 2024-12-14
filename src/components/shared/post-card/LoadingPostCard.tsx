import React from 'react';

import styles from './LoadingPostCard.module.css';

export default function LoadingPostCard() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.divider} />
      <div className={styles.contentContainer}>
        <div className={styles.container}>
          <div className={styles.textContainer}>
            <p className={`${styles.label} ${styles.skeleton}`} />
            <div className={styles.textInfoContainer}>
              <p className={`${styles.description} ${styles.skeleton}`} />
              <p className={`${styles.date} ${styles.skeleton}`} />
            </div>
          </div>
          <div className={styles.imageContainer}>
            <div className={`${styles.imagePlaceholder} ${styles.skeleton}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
