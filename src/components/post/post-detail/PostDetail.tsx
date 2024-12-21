import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostDetail } from '../../../services/getPost';
import { PostDetailProps, PostSEOProps } from '../../../types/post';
import PacmanLoading from '../../shared/loading/PacmanLoading';

import styles from './PostDetail.module.css';

export default function PostDetail() {
  const [postDetails, setPostDetails] = useState<PostDetailProps | null>(null);
  const [postSEO, setPostSEO] = useState<PostSEOProps | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!id) return;

      try {
        const { postDetails, postSEO } = await getPostDetail(id);
        setPostDetails(postDetails);
        setPostSEO(postSEO);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetail();
  }, [id]);

  useEffect(() => {
    document.title = postSEO?.headline || 'Default Title';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', postSEO?.description || '');

    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', postSEO?.headline || '');
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', postSEO?.description || '');
    document
      .querySelector('meta[property="og:image"]')
      ?.setAttribute('content', postSEO?.image || '');

    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute('content', postSEO?.headline || '');
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute('content', postSEO?.description || '');
    document
      .querySelector('meta[name="twitter:image"]')
      ?.setAttribute('content', postSEO?.image || '');
  }, [postSEO]);

  if (!postDetails || !postSEO) {
    return (
      <div className={styles.fallbackContainer}>
        <PacmanLoading />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div
        dangerouslySetInnerHTML={{ __html: postDetails.content }}
        className={styles.content}
      />

      <div className={styles.divider} />

      <div className={styles.infoContainer}>
        <p className={styles.date}>
          {`Posted on `}
          {new Date(postDetails.created_at).toLocaleDateString('en-US', {
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
