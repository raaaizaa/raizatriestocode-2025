import React, { useState, useEffect } from 'react';
import { getHeadline } from '../../../services/getPost';
import { PostProps } from '../../../types/post';
import LoadingPostCard from '../../shared/post-card/LoadingPostCard';
import PostCard from '../../shared/post-card/PostCard';

import styles from './OtherPosts.module.css';

const POST_COUNT = 4;

export default function OtherPosts() {
  const [data, setData] = useState<PostProps[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const data = await getHeadline();
        setData(data);
      } catch (error) {
        console.error('Error fetching posts or Markdown!', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (!data || data?.length < 4) {
    return null;
  }

  const displayedPosts = data?.slice(0, 4);
  
  return (
    <div className={styles.container}>
      <p className={styles.title}>See other posts here</p>
      {isLoading ? (
        <div className={styles.dataContainer}>
          {Array.from({ length: POST_COUNT }).map((_, index) => (
            <LoadingPostCard />
          ))}
        </div>
      ) : (
        <div className={styles.dataContainer}>
          {displayedPosts?.map((post, index) => (
            <PostCard post={post} key={`${post.id}-${index}`} />
          ))}
        </div>
      )}
    </div>
  );
}
