import React, { useEffect, useState } from 'react';
import { getHeadline } from '../../../services/getPost';

import Pagination from './Pagination';
import { PostProps } from '../../../types/post';

import styles from './BlogPosts.module.css';
import PostCard from '../../shared/post-card/PostCard';
import LoadingPostCard from '../../shared/post-card/LoadingPostCard';

const POSTS_PER_PAGE = 8;

export default function BlogPosts() {
  const [data, setData] = useState<PostProps[]>();
  const [currentPage, setCurrentPage] = useState(1);
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

  // Calculate the displayed posts for the current page
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const displayedPosts = data?.slice(startIndex, endIndex);

  // Handle pagination controls
  const totalPages = Math.ceil((data?.length || 0) / POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>
          A personal blog that consists of his thoughts over time
        </p>
        <p className={styles.subtitle}>
          Karena biasanya banyak hal yang dipikirin tapi gatau mau ditaro
          dimana.
        </p>
      </div>

      {isLoading ? (
        <div className={styles.dataContainer}>
          {Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
            <LoadingPostCard key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className={styles.dataContainer}>
            {displayedPosts?.map((post, index) => (
              <PostCard post={post} key={`${post.id}-${index}`} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
