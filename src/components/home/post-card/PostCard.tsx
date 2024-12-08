import React from 'react';
import { Link } from 'react-router-dom';
import { PostProps } from '../../../types/post';

interface PostCardProps {
  post: PostProps;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  const { headline, first_image, description, created_at, url, id } = post;

  return (
    <Link to={`/post/${id}`} style={{ textDecoration: 'none', color: 'inherit' }} state={{url}}>
    <div key={index}>
      <p dangerouslySetInnerHTML={{ __html: headline }} />
      {first_image ? <img src={first_image} alt="Post image" /> : null}
      <p>{description}</p>
      <p>
        {new Date(created_at).toLocaleDateString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
    </div>
    </Link>
  );
}
