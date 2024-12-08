export interface PostProps {
  id: string;
  url: string;
  description: string;
  first_image: string;
  headline: string;
  created_at: string;
}

export interface PostDetailProps {
  content: string,
  description: string,
  created_at: string,
}
