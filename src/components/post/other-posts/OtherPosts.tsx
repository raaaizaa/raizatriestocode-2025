import React, { useState, useEffect } from 'react';
import { getHeadline } from '../../../services/getPost';
import { PostProps } from '../../../types/post';
import { shuffle } from '../../../utils/shuffle';
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
        let data = await getHeadline();
        if (data) {
          data = shuffle(data);
        }
        setData(data);
      } catch (error) {
        console.error('Error fetching posts or Markdown!', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, []);

  const displayedPosts = data?.slice(0, POST_COUNT);
  return (
    <div className={styles.container}>
      <p className={styles.title}>See other posts here</p>
      {isLoading ? (
        <div className={styles.dataContainer}>
          {Array.from({ length: POST_COUNT }).map((_, index) => (
            <LoadingPostCard key={index}/>
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
