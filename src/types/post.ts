export interface PostProps {
  id: string;
  url: string;
  tag: string; // This one is unused. I don't know whether I will use this field or not in the future...
  cutted_description: string;
  first_image: string;
  headline: string;
  created_at: string;
}

export interface PostDetailProps {
  content: string;
  description: string;
  created_at: string;
}
