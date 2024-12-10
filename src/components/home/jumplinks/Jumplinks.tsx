import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Jumplinks.module.css';

export default function Jumplinks() {
  return (
    <div>
      <div className={styles.container}>
        <Link className={styles.text} to="/">
          <p>Home</p>
        </Link>
        <Link className={styles.text} to="/about">
          <p>About</p>
        </Link>
        <Link className={styles.text} to="/blog">
          <p>Blog</p>
        </Link>
        <Link className={styles.text} to="/message">
          <p>Message</p>
        </Link>
      </div>
      <hr />
    </div>
  );
}
