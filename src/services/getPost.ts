import MarkdownIt from 'markdown-it';

const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export async function getPost() {
  try {
    const response = await fetch(
      'https://api.github.com/users/raaaizaa/gists',
      {
        method: 'GET',
        headers: {
          Authorization: `token ${TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch the posts!');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error();
  }
}

export async function getHeadline() {
  try {
    const post = await getPost();
    const headlines = await Promise.all(
      post.map(async (item: any) => {
        const response = await fetch(item.files['index.md'].raw_url);
        const textContent = await response.text();

        // To be honest, for the image part I am completely using the ChatGPT :/
        const md = new MarkdownIt();
        const htmlContent = md.render(textContent);

        const imageMatch = htmlContent.match(/<img [^>]*src="([^"]+)"/);
        const firstImage = imageMatch ? imageMatch[1] : null;

        const firstLine = textContent.split('\n')[0];

        return {
          url: item.files['index.md'].raw_url,
          headline: firstLine,
          description: item.description,
          created_at: item.created_at,
          first_image: firstImage,
        };
      })
    );

    return headlines;
  } catch (error) {
    console.error(error);
  }
}
