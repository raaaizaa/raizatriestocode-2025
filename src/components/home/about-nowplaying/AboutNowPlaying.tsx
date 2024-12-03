import React from 'react';
import About from '../about/About';
import NowPlaying from '../now-playing/NowPlaying';
import styles from './AboutNowPlaying.module.css';

export default function AboutNowPlaying() {
  return (
    <div className={styles.container}>
      <About />
      <div className={styles.separateBorder} />
      <NowPlaying />
    </div>
  );
}
