import React, { useEffect, useState } from 'react';
import { getHeadline, getPost } from '../../../services/getPost';
import PostCard from '../post-card/PostCard';

import styles from './BlogPosts.module.css';

export default function BlogPosts() {
  const [post, setPost] = useState<any | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getHeadline();
        setPost(data);
      } catch (error) {
        console.error('Error fetching posts or Markdown!', error);
      }
    };

    fetchPost();
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.title}>
          A personal blog that consists of his thoughts over time.
        </p>
        <p className={styles.subtitle}>
          Karena biasanya banyak hal yang dipikirin tapi gatau mau ditaro dimana.
        </p>
      </div>
      {post ? (
        <div className={styles.postContainer}>
          {post.map((post: any, index: number) => (
            <PostCard post={post} index={index} />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
