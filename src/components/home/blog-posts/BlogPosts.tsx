import React, { useEffect, useState } from 'react';
import { getHeadline, getPost } from '../../../services/getPost';
import PostCard from '../post-card/PostCard';

export default function BlogPosts() {
  const [post, setPost] = useState<any | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getHeadline();
        setPost(data);
      } catch (error) {
        console.error('Error fetching posts or Markdown!', error);
      }
    };

    fetchPost();
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {post ? (
        <div>
          {post.map((post: any, index: number) => (
            <PostCard post={post} index={index} />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
