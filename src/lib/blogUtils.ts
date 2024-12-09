import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    getDocs, 
    query, 
    where, 
    orderBy,
    serverTimestamp
  } from 'firebase/firestore';
  import { db } from './firebase';
  import { BlogPost } from './types';
  
  export const createBlogPost = async (post: BlogPost) => {
    try {
      const postsCollection = collection(db, 'posts');
      const docRef = await addDoc(postsCollection, {
        ...post,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating blog post", error);
      throw error;
    }
  };
  
  export const getBlogPosts = async (published = true) => {
    const postsCollection = collection(db, 'posts');
    const q = query(
      postsCollection, 
      where('published', '==', published),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as BlogPost));
  };
  
  export const updateBlogPost = async (postId: string, updates: Partial<BlogPost>) => {
    const postDoc = doc(db, 'posts', postId);
    await updateDoc(postDoc, {
      ...updates,
      updatedAt: new Date()
    });
  };
  
  export const deleteBlogPost = async (postId: string) => {
    const postDoc = doc(db, 'posts', postId);
    await deleteDoc(postDoc);
  };