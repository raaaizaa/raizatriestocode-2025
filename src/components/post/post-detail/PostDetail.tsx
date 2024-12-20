import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostDetail } from '../../../services/getPost';
import { PostDetailProps } from '../../../types/post';
import PacmanLoading from '../../shared/loading/PacmanLoading';

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
        <PacmanLoading />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div dangerouslySetInnerHTML={{ __html: data.content }} className={styles.content} />
      <div className={styles.divider}/>
      <div className={styles.infoContainer}>
        <p className={styles.date}>
          {`Posted on `}
          {new Date(data.created_at).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </p>
        <p className={styles.posted}>- Raiza</p>
      </div>
    </div>
  );
}
