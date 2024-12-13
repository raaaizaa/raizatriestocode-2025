import React from 'react';

import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  handlePageChange,
}: PaginationProps) {
  return (
    <div className={styles.pagination}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        {`<`}
      </button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={currentPage === index + 1 ? styles.activePage : ''}
          onClick={() => handlePageChange(index + 1)}>
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        {`>`}
      </button>
    </div>
  );
}
