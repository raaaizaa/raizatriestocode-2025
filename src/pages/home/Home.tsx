import React from 'react';
import MessageForm from '../../components/home/message-form/MessageForm';
import BlogPosts from '../../components/home/blog-posts/BlogPosts';
import About from '../../components/home/about/About';
import NowPlaying from '../../components/home/now-playing/NowPlaying';

import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <BlogPosts />
      <div className={styles.divider}>
        <div className={styles.aboutContainer}>
          <About />
          <div className={styles.aboutDivider}/>
          <NowPlaying />
        </div>
        <div className={styles.messageDivider}/>
        <MessageForm />
      </div>
    </div>
  );
}
