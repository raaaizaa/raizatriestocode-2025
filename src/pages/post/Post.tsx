import React from 'react';
import OtherPosts from '../../components/post/other-posts/OtherPosts';
import PostDetail from '../../components/post/post-detail/PostDetail';

import styles from './Post.module.css';

export default function Post() {
  return (
    <div className={styles.container}>
      <PostDetail />
      <OtherPosts />
    </div>
  );
}
