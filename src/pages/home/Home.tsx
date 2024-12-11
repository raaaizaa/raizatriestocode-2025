import React from 'react';
import Title from '../../components/home/title/Title';
import Header from '../../components/home/Header';
import MessageForm from '../../components/home/message-form/MessageForm';
import BlogPosts from '../../components/home/blog-posts/BlogPosts';
import About from '../../components/home/about/About';

import styles from './Home.module.css';
import NowPlaying from '../../components/home/now-playing/NowPlaying';

export default function Home() {
  return (
    // <>
    //   <Header />
    //   <div className={styles.subHeaderContainer}>
    //     <div className={styles.postsContainer}>
    //       <BlogPosts />
    //     </div>
    //     <div className={styles.aboutContainer}>
    //       <About />
    //       <hr className={styles.divider}/>
    //       <NowPlaying />
    //       <hr className={styles.divider}/>
    //       <MessageForm />
    //     </div>
    //   </div>
    // </>
    <>
      <Header />
      <div className={styles.subHeaderContainer}>
        <div className={styles.postsContainer}>
          <BlogPosts />
        </div>
        <div className={styles.aboutContainer}>
          <About />
          <hr className={styles.divider} />
          <NowPlaying />
          <hr className={styles.divider} />
          <MessageForm />
        </div>
      </div>
    </>
  );
}
