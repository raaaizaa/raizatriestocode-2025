import MarkdownIt from 'markdown-it';

const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

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
        const htmlContent = md.render(textContent);

        const imageMatch = htmlContent.match(/<img [^>]*src="([^"]+)"/);
        const firstImage = imageMatch ? imageMatch[1] : null;

        const splittedLine = textContent.split('\n');
        const firstLine = splittedLine[0];
        const remainingText = splittedLine.slice(1).join('\n');

        return {
          id: item.id,
          url: item.files['index.md'].raw_url,
          headline: firstLine,
          tag: item.description,
          cutted_description: `${remainingText.substring(0, 100)}...`,
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

export async function getPostDetail(id: string) {
  try {
    const response = await fetch(`https://api.github.com/gists/${id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const data = await response.json();

    const formattedContent = md.render(data.files['index.md'].content);

    return {
      content: formattedContent,
      description: data.description,
      created_at: data.created_at,
    };
  } catch (error) {
    console.error();
  }
}
