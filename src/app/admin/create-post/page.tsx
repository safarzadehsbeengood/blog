'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBlogPost } from '@/lib/blogUtils';
import { useAuth } from '@/contexts/AuthContext';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';

const editorStyles = `
  .ProseMirror {
    min-height: 300px;
    font-family: inherit;
  }
  
  .ProseMirror:focus {
    outline: none;
  }

  .ProseMirror p {
    margin: 1em 0;
  }

  .ProseMirror strong {
    font-weight: 700 !important;
    color: inherit !important;
  }

  .ProseMirror em {
    font-style: italic !important;
    color: inherit !important;
  }

  .ProseMirror s {
    text-decoration: line-through;
  }

  .ProseMirror h2 {
    font-size: 1.5em;
    font-weight: 700;
    margin: 1em 0;
    color: white;
  }

  .ProseMirror h3 {
    font-size: 1.17em;
    font-weight: 700;
    margin: 1em 0;
    color: white;
  }

  .ProseMirror blockquote {
    border-left: 3px solid #ddd;
    padding-left: 1rem;
    margin-left: 0;
    font-style: italic;
    color: lightgray;
  }

  .ProseMirror ul {
    list-style-type: disc;
    padding-left: 1.5em;
    margin: 1em 0;
  }

  .ProseMirror ol {
    list-style-type: decimal;
    padding-left: 1.5em;
    margin: 1em 0;
  }

  .ProseMirror img {
    max-width: 100%;
    height: auto;
    margin: 1em 0;
  }
`;

const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) return null;

  const addImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        editor.chain().focus().setImage({ src: result }).run();
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-gray-900 border-b p-2 mb-4 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-900 ${
          editor.isActive('bold') ? 'bg-gray-800' : ''
        }`}
      >
        <strong className="text-inherit">B</strong>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-900 ${
          editor.isActive('italic') ? 'bg-gray-800' : ''
        }`}
      >
        <span className="italic">I</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-2 rounded hover:bg-gray-900 ${
          editor.isActive('strike') ? 'bg-gray-800' : ''
        }`}
      >
        <span className="line-through">S</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-900 ${
          editor.isActive('heading', { level: 2 }) ? 'bg-gray-800' : ''
        }`}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded hover:bg-gray-900 ${
          editor.isActive('heading', { level: 3 }) ? 'bg-gray-800' : ''
        }`}
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-900 ${
          editor.isActive('bulletList') ? 'bg-gray-800' : ''
        }`}
      >
        • List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-900 ${
          editor.isActive('orderedList') ? 'bg-gray-800' : ''
        }`}
      >
        1. List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-gray-900 ${
          editor.isActive('blockquote') ? 'bg-gray-800' : ''
        }`}
      >
        Quote
      </button>
      <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-900">
        <span>Image</span>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) addImage(file);
          }}
        />
      </label>
    </div>
  );
};

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3]
        },
        bold: {
          HTMLAttributes: {
            class: 'font-bold',
          }
        }
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto',
        },
      })
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose max-w-full focus:outline-none',
      },
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to create a post');
      return;
    }

    if (!editor) {
      alert('Editor not initialized');
      return;
    }

    try {
      const content = editor.getHTML();
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
      <style>{editorStyles}</style>
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="mb-4">
          <label 
            htmlFor="title" 
            className="block text-gray-200 font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSlug(e.target.value.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-'));
            }}
            className="input-field w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label 
            htmlFor="slug" 
            className="block text-gray-200 font-bold mb-2"
          >
            Slug
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="input-field w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 font-bold mb-2">
            Content
          </label>
          <div className="border rounded">
            {editor && <MenuBar editor={editor} />}
            <div className="p-4">
              {editor && <EditorContent editor={editor} />}
            </div>
          </div>
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