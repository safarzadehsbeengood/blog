import { getBlogPosts } from '@/lib/blogUtils';
import { notFound } from 'next/navigation';
import { Timestamp } from 'firebase/firestore';

const postStyles = `
  .blog-content {
    min-height: 300px;
    font-family: inherit;
  }
  
  .blog-content:focus {
    outline: none;
  }

  .blog-content p {
    margin: 1em 0;
  }

  .blog-content strong {
    font-weight: 700 !important;
    color: inherit !important;
  }

  .blog-content em {
    font-style: italic !important;
    color: inherit !important;
  }

  .blog-content s {
    text-decoration: line-through;
  }

  .blog-content h2 {
    font-size: 1.5em;
    font-weight: 700;
    margin: 1em 0;
    color: white;
  }

  .blog-content h3 {
    font-size: 1.17em;
    font-weight: 700;
    margin: 1em 0;
    color: white;
  }

  .blog-content blockquote {
    border-left: 3px solid #ddd;
    padding-left: 1rem;
    margin-left: 0;
    font-style: italic;
    color: lightgray;
  }

  .blog-content ul {
    list-style-type: disc;
    padding-left: 1.5em;
    margin: 1em 0;
  }

  .blog-content ol {
    list-style-type: decimal;
    padding-left: 1.5em;
    margin: 1em 0;
  }

  .blog-content img {
    max-width: 100%;
    height: auto;
    margin: 1em 0;
  }
`;

export default async function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const posts = await getBlogPosts();
  const post = posts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const publishDate = post.createdAt instanceof Timestamp 
    ? post.createdAt.toDate() 
    : new Date(post.createdAt);

  return (
    <div className="container mx-auto px-4 py-8">
      <style>{postStyles}</style>
      <article className="max-w-2xl mx-auto">
        <p className="text-4xl font-bold mb-6">{post.title}</p>
        <div className="text-gray-600 mb-6">
          Published on {publishDate.toLocaleDateString()}
        </div>
        <div 
          className="prose lg:prose-xl max-w-none blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}