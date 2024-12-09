'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { getBlogPosts } from '@/lib/blogUtils';
import { BlogPost } from '@/lib/types';
import { Timestamp } from 'firebase/firestore';

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
      <p className="text-xl mb-8">Ryan Safarzadeh</p>
      
      <div className="flex space-x-4 mb-12">
        <Link 
          href="/blog" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          View Blog Posts
        </Link>
        
        {user ? (
          <>
            <Link 
              href="/admin/create-post" 
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Create New Post
            </Link>
            <button 
              onClick={() => logout()}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link 
            href="/admin/login" 
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
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
        {loading ? (
          <div className="text-gray-600">Loading latest posts...</div>
        ) : latestPosts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <div 
                key={post.id} 
                className="border rounded-lg p-6 shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {formatDate(post.createdAt)}
                </p>
                <p className="text-gray-700 mb-4">
                  {post.content.slice(0, 100)}...
                </p>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No blog posts yet.</p>
        )}

        {latestPosts.length > 0 && (
          <div className="mt-8 text-center">
            <Link 
              href="/blog"
              className="text-blue-500 hover:underline"
            >
              View All Posts →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}