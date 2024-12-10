import { prisma } from './prisma';
import { BlogPost } from './types';

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return posts;
};

export const createBlogPost = async (data: Omit<BlogPost, 'id'>, authorId: string) => {
  const post = await prisma.post.create({
    data: {
      ...data,
      authorId,
    },
  });

  return post;
};

export const deleteBlogPost = async (id: string) => {
  await prisma.post.delete({
    where: { id },
  });
};