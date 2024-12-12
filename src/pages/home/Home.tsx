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
        <About />
        <NowPlaying />
        <MessageForm />
      </div>
    </div>
  );
}
