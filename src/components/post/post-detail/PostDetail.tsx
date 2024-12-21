import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostDetail } from '../../../services/getPost';
import { PostDetailProps, PostSEOProps } from '../../../types/post';
import PacmanLoading from '../../shared/loading/PacmanLoading';
import { Helmet } from 'react-helmet';

import styles from './PostDetail.module.css';

export default function PostDetail() {
  const [postDetails, setPostDetails] = useState<PostDetailProps | null>(null);
  const [postSEO, setPostSEO] = useState<PostSEOProps | null>(null); // Separate state for postSEO
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

  if (!postDetails || !postSEO) {
    return (
      <div className={styles.fallbackContainer}>
        <PacmanLoading />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{postSEO.headline || 'Default Title'}</title>
        <meta name="description" content={postSEO.description} />
        <meta property="og:title" content={postSEO.headline} />
        <meta property="og:description" content={postSEO.description} />
        <meta property="og:image" content={postSEO.image || ''} />
        <meta property="og:url" content={postSEO.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={postSEO.headline} />
        <meta name="twitter:description" content={postSEO.description} />
        <meta name="twitter:image" content={postSEO.image || ''} />
      </Helmet>

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
    </>
  );
}
