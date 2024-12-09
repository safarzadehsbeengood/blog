import { getBlogPosts } from '@/lib/blogUtils';
import Link from 'next/link';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600">No blog posts found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="border rounded-lg p-6 shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
              <p className="text-gray-600 mb-4">
                {post.content.slice(0, 150)}...
              </p>
              <Link 
                href={`/blog/${post.slug}`} 
                className="text-blue-500 hover:underline"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}