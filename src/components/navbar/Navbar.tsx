import React from 'react';

import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <div className={styles.container}>
      <a href="/" className={styles.title}>
        itsnotquitemidnight
      </a>
    </div>
  );
}
