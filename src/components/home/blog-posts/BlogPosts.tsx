import React, { useEffect, useState } from 'react';
import { getHeadline, getPost } from '../../../services/getPost';

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
          {post.map((item: any, index: number) => (
            <div key={index}>
              <p dangerouslySetInnerHTML={{ __html: item.headline }} />{' '}
              {item.first_image ? <img src={item.first_image} /> : null}
              <p>{item.description}</p>
              <p>
                {new Date(item.created_at).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
