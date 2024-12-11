import React from 'react';
import { Link } from 'react-router-dom';
import { PostProps } from '../../../types/post';

import styles from './PostCard.module.css';

interface PostCardProps {
  post: PostProps;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  const { headline, first_image, tag, created_at, id, cutted_description } =
    post;
  const formatted_created_at = new Date(created_at).toLocaleDateString(
    'en-US',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }
  );

  return (
    <Link to={`/post/${id}`} className={styles.wrapper}>
      <div key={index} className={styles.container}>
        <div className={styles.textContainer}>
          <p
            className={styles.label}
            dangerouslySetInnerHTML={{ __html: headline }}
          />
          <div className={styles.textInfoContainer}>
            <p className={styles.description}>{cutted_description}</p>
            <p className={styles.date}>{formatted_created_at}</p>
          </div>
        </div>
        {first_image ? (
          <div className={styles.imageContainer}>
            <img src={first_image} alt="Post image" className={styles.image} />
          </div>
        ) : null}
      </div>
      <div className={styles.divider} />
    </Link>
  );
}