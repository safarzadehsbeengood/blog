import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col justify-center">
      <div className="flex space-y-4">
        <Link
          href="/admin/login"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Login
        </Link>
      </div>
      <h1 className="text-4xl font-bold mb-6">Ryan Safarzadeh</h1>
      <h1 className="text-3xl mb-6">Welcome to My Blog!</h1>
      <p className="text-xl mb-4"></p>
      <div className="flex space-x-4">
        <Link 
          href="/blog" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          View Blog Posts
        </Link>
        <Link 
          href="/admin/create-post" 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Create New Post
        </Link>
      </div>
    </div>
  );
}