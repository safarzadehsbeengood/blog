'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBlogPost } from '@/lib/blogUtils';
import { useAuth } from '@/contexts/AuthContext';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to create a post');
      return;
    }

    try {
      await createBlogPost({
        title,
        content,
        slug,
        published: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      router.push('/blog');
    } catch (error) {
      console.error('Error creating post', error);
      alert('Failed to create post');
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Please log in to create a post.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      <form onSubmit={handleSubmit} className="max-w-xl">
        <div className="mb-4">
          <label 
            htmlFor="title" 
            className="block font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              // Auto-generate slug
              setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
            }}
            className="input-field w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label 
            htmlFor="content" 
            className="block text-gray-300 font-bold mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border text-black rounded h-64"
            required
          />
        </div>
        <div className="mb-4">
          <label 
            htmlFor="slug" 
            className="block text-gray-300 font-bold mb-2"
          >
            Slug
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-3 py-2 text-black border rounded"
            required
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}