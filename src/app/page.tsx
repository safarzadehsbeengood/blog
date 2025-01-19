'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { getBlogPosts } from '@/lib/blogUtils';
import { BlogPost } from '@/lib/types';
import { Timestamp } from 'firebase/firestore';
import PostPreview from '@/components/PostPreview';

export default function Home() {
  const { user, logout } = useAuth();
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const posts = await getBlogPosts();
        setLatestPosts(posts.slice(0, 3)); // Get latest 3 posts
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  const formatDate = (date: Date | Timestamp) => {
    if (date instanceof Timestamp) {
      return date.toDate().toLocaleDateString();
    }
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to My Blog!</h1>
      <p className="text-xl mb-8">I will be sharing miscellaneous projects and stuff here.</p>
      
      <div className="flex space-x-4 mb-12">
        <Link 
          href="/blog" 
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          View Blog Posts
        </Link>
        
        {user ? (
          <>
            <Link 
              href="/admin/create-post" 
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Create New Post
            </Link>
            <button 
              onClick={() => logout()}
              className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link 
            href="/admin/login" 
            className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-500 transition"
          >
            Login
          </Link>
        )}
      </div>

      {user && (
        <p className="text-sm text-gray-600 mb-8">
          Logged in as: {user.email}
        </p>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <div key={post.id} className="relative h-[300px]">
              <Link
                href={`/blog/${post.slug}`}
                className="block absolute inset-0 border rounded-lg p-6 shadow-md transition text-center cursor-pointer
                         hover:shadow-xl dark:hover:bg-gray-800 hover:bg-gray-50 overflow-hidden"
              >
                <div className="text-2xl font-semibold mb-3">{post.title}</div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {formatDate(post.createdAt)}
                </p>
                <div className="overflow-hidden">
                  <PostPreview content={post.content} />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {latestPosts.length > 0 && (
          <div className="mt-8 text-center">
            <Link 
              href="/blog"
              className="text-gray-400 hover:text-white hover:underline"
            >
              View All Posts →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}