import { collection, addDoc, getDocs, query, orderBy, Timestamp, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  readTime?: string;
  tags?: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  published: boolean;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Timestamp;
  status: "new" | "read" | "replied";
}

// Blog Functions
export const createBlogPost = async (blogPost: Omit<BlogPost, "id" | "createdAt" | "updatedAt">) => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, "blogPosts"), {
      ...blogPost,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const q = query(collection(db, "blogPosts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as BlogPost));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
};

export const updateBlogPost = async (id: string, blogPost: Partial<Omit<BlogPost, "id" | "createdAt">>) => {
  try {
    const postRef = doc(db, "blogPosts", id);
    await updateDoc(postRef, {
      ...blogPost,
      updatedAt: Timestamp.now()
    });
    return id;
  } catch (error) {
    console.error("Error updating blog post:", error);
    throw error;
  }
};

export const deleteBlogPost = async (id: string) => {
  try {
    await deleteDoc(doc(db, "blogPosts", id));
    return true;
  } catch (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }
};

export const getBlogPostById = async (id: string) => {
  try {
    const postRef = doc(db, "blogPosts", id);
    const postSnap = await getDoc(postRef);
    
    if (postSnap.exists()) {
      return {
        id: postSnap.id,
        ...postSnap.data()
      } as BlogPost;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching blog post:", error);
    throw error;
  }
};

// Contact Functions
export const submitContactMessage = async (contactData: Omit<ContactMessage, "id" | "createdAt" | "status">) => {
  try {
    const docRef = await addDoc(collection(db, "contactMessages"), {
      ...contactData,
      createdAt: Timestamp.now(),
      status: "new",
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting contact message:", error);
    throw error;
  }
};

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  try {
    const q = query(collection(db, "contactMessages"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ContactMessage));
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    throw error;
  }
};
