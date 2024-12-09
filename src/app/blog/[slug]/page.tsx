import { getBlogPosts } from '@/lib/blogUtils';
import { notFound } from 'next/navigation';

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

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
        <div className="text-gray-600 mb-6">
          Published on {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <div className="prose lg:prose-xl">
          {post.content}
        </div>
      </article>
    </div>
  );
}

// Generate static params for SEO and performance
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug
  }));
}