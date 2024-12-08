import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostDetail } from '../../services/getPost';
import { PostDetailProps } from '../../types/post';

export default function Post() {
  const [post, setPost] = useState<PostDetailProps>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!id) return;

      try {
        const response = await getPostDetail(id);
        setPost(response);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetail();
  }, []);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{post.description}</h1>
      {post.content && (
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      )}
    </div>
  );
}
