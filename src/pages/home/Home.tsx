import React from 'react';
import Title from '../../components/home/title/Title';
import Header from '../../components/home/Header';
import MessageForm from '../../components/home/message-form/MessageForm';
import BlogPosts from '../../components/home/blog-posts/BlogPosts';

export default function Home() {
  return (
    <>
      <Header />
      <MessageForm />
      <BlogPosts />
    </>
  );
}
