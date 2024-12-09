'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to My Blog</h1>
      <p className="text-xl mb-4">Discover interesting stories and insights.</p>
      
      <div className="flex space-x-4 mb-6">
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
        <p className="text-sm text-gray-600">
          Logged in as: {user.email}
        </p>
      )}
    </div>
  );
}