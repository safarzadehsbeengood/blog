'use client';

import { getBlogPosts } from '@/lib/blogUtils';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Timestamp } from 'firebase/firestore';
import { BlogPost } from '@/lib/types';
import PostPreview from '@/components/PostPreview';

export default function BlogPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getBlogPosts();
      const validPosts = fetchedPosts.filter((post): post is BlogPost => {
        return post.id !== undefined && post.id !== null;
      });
      setPosts(validPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const postRef = doc(db, 'posts', postId);
      await deleteDoc(postRef);
      await fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  const formatDate = (date: Date | Timestamp) => {
    if (date instanceof Timestamp) {
      return date.toDate().toLocaleDateString();
    }
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog Posts</h1>
      
      {posts.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>No blog posts found.</p>
          {user && (
            <Link 
              href="/admin/create-post"
              className="text-blue-500 hover:underline block mt-4"
            >
              Create your first post →
            </Link>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="border rounded-lg p-6 shadow-md hover:shadow-lg transition text-center"
            >
              <div className="text-2xl font-semibold mb-3">{post.title}</div>
              <p className="text-gray-200 text-sm mb-3">
                {formatDate(post.createdAt)}
              </p>
              <PostPreview content={post.content}/>
              <div className="flex items-center justify-center gap-4 w-full mt-auto">
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="text-blue-500 hover:underline"
                >
                  Read More
                </Link>
                {user && (
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-500 hover:text-red-700 transition"
                    aria-label="Delete post"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}