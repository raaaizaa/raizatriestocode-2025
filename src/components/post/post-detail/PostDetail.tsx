import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostDetail } from '../../../services/getPost';
import { PostDetailProps } from '../../../types/post';

import styles from './PostDetail.module.css';

export default function PostDetail() {
  const [data, setData] = useState<PostDetailProps>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!id) return;

      try {
        const response = await getPostDetail(id);
        setData(response);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetail();
  }, []);

  if (!data) {
    return (
      <div className={styles.fallbackContainer}>
        <p className={styles.loadingText}>Loading post...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
      <div className={styles.infoContainer}>
        <p className={styles.date}>
          {`Updated on `}
          {new Date(data.created_at).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}
