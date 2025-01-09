import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostDetail } from '../../../services/getPost';
import { PostDetailProps, PostSEOProps } from '../../../types/post';
import PacmanLoading from '../../shared/loading/PacmanLoading';
import { Helmet } from 'react-helmet';

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

  if (!postDetails || !postSEO) {
    return (
      <div className={styles.fallbackContainer}>
        <PacmanLoading />
      </div>
    );
  }

  return (
    <>
      {/* TODO: this shit need a backend service to get right metadata for social media sharing. i will work on it, later. */}
      <Helmet>
        <title>{`${postSEO?.headline} | It's Not Quite Midnight`}</title>
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
        </div>
      </div>
    </>
  );
}
