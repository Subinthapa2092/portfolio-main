import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Edit, Trash2, Calendar, User, ArrowLeft, Image, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createBlogPost, getBlogPosts, BlogPost as FirestoreBlogPost } from "@/services/firebaseService";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  coverImage: string;
}

const BlogsDashboard = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editPostId, setEditPostId] = useState<string | null>(null);

  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    readTime: "",
    tags: "",
    coverImage: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isDialogOpen) {
      setNewPost({
        title: "",
        excerpt: "",
        content: "",
        readTime: "",
        tags: "",
        coverImage: ""
      });
      setIsEditing(false);
      setEditPostId(null);
    }
  }, [isDialogOpen]);

  // Fetch blog posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const firestorePosts = await getBlogPosts();
        const formattedPosts = firestorePosts.map((post: FirestoreBlogPost) => ({
          id: post.id || "",
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          date: format(post.createdAt.toDate(), 'yyyy-MM-dd'),
          readTime: post.readTime || "5 min read",
          tags: post.tags || [],
          coverImage: post.coverImage || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop"
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast({
          title: "Error",
          description: "Failed to fetch blog posts",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (newPost.title && newPost.excerpt && newPost.content) {
      try {
        setProcessing(true);
        const tagsArray = newPost.tags.split(',').map(tag => tag.trim()).filter(Boolean);
        
        // Create post in Firestore
        await createBlogPost({
          title: newPost.title,
          excerpt: newPost.excerpt,
          content: newPost.content,
          readTime: newPost.readTime || "5 min read",
          tags: tagsArray,
          coverImage: newPost.coverImage || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop",
          published: true
        });
        
        // Refresh posts
        const firestorePosts = await getBlogPosts();
        const formattedPosts = firestorePosts.map((post: FirestoreBlogPost) => ({
          id: post.id || "",
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          date: format(post.createdAt.toDate(), 'yyyy-MM-dd'),
          readTime: post.readTime || "5 min read",
          tags: post.tags || [],
          coverImage: post.coverImage || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop"
        }));
        setPosts(formattedPosts);
        
        // Reset form and close dialog
        setNewPost({ title: "", excerpt: "", content: "", readTime: "", tags: "", coverImage: "" });
        setIsDialogOpen(false);
        
        toast({
          title: "Success",
          description: "Blog post created successfully",
        });
      } catch (error) {
        console.error("Error creating post:", error);
        toast({
          title: "Error",
          description: "Failed to create blog post",
          variant: "destructive"
        });
      } finally {
        setProcessing(false);
      }
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setIsEditing(true);
    setEditPostId(post.id);
    setNewPost({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      readTime: post.readTime,
      tags: post.tags.join(', '),
      coverImage: post.coverImage
    });
    setIsDialogOpen(true);
  };

  const handleUpdatePost = async () => {
    if (!editPostId || !newPost.title || !newPost.excerpt || !newPost.content) return;
    
    try {
      setProcessing(true);
      const tagsArray = newPost.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      
      // Update post in Firestore
      const postRef = doc(db, "blogPosts", editPostId);
      await updateDoc(postRef, {
        title: newPost.title,
        excerpt: newPost.excerpt,
        content: newPost.content,
        readTime: newPost.readTime || "5 min read",
        tags: tagsArray,
        coverImage: newPost.coverImage || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop",
        updatedAt: new Date()
      });
      
      // Update local state
      setPosts(posts.map(post => 
        post.id === editPostId
          ? {
              ...post,
              title: newPost.title,
              excerpt: newPost.excerpt,
              content: newPost.content,
              readTime: newPost.readTime || "5 min read",
              tags: tagsArray,
              coverImage: newPost.coverImage || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop"
            }
          : post
      ));
      
      // Reset form and close dialog
      setNewPost({ title: "", excerpt: "", content: "", readTime: "", tags: "", coverImage: "" });
      setIsEditing(false);
      setEditPostId(null);
      setIsDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
    } catch (error) {
      console.error("Error updating post:", error);
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      setProcessing(true);
      // Delete post from Firestore
      await deleteDoc(doc(db, "blogPosts", id));
      
      // Update local state
      setPosts(posts.filter(post => post.id !== id));
      
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 animate-fade-in">Blog Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 animate-fade-in">
              Manage your blog posts and content
            </p>
          </div>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="animate-fade-in"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 animate-fade-in" disabled={processing}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Post title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  />
                  <Input
                    placeholder="Post excerpt"
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                  />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Image className="h-4 w-4" />
                      <span className="text-sm font-medium">Cover Image URL</span>
                    </div>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={newPost.coverImage}
                      onChange={(e) => setNewPost({...newPost, coverImage: e.target.value})}
                    />
                  </div>
                  <textarea
                    placeholder="Post content"
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    className="w-full h-32 p-3 border rounded-md resize-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Read time (e.g., 5 min read)"
                      value={newPost.readTime}
                      onChange={(e) => setNewPost({...newPost, readTime: e.target.value})}
                    />
                    <Input
                      placeholder="Tags (comma separated)"
                      value={newPost.tags}
                      onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                    />
                  </div>
                  <Button 
                    onClick={isEditing ? handleUpdatePost : handleCreatePost} 
                    className="w-full" 
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {isEditing ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      isEditing ? 'Update Post' : 'Create Post'
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2">Loading posts...</span>
          </div>
        ) : posts.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-lg mb-4">No blog posts yet</p>
            <p className="text-gray-500 mb-6">Create your first blog post to get started</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create First Post
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6">
            {posts.map((post, index) => (
              <Card key={post.id} className="hover:shadow-lg transition-all duration-300 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex gap-6">
                  <div className="w-48 h-32 flex-shrink-0">
                    <img 
                      src={post.coverImage} 
                      alt={post.title}
                      className="w-full h-full object-cover rounded-l-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                          <CardDescription className="text-base mb-3">{post.excerpt}</CardDescription>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {post.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {post.readTime}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditPost(post)}
                            disabled={processing}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeletePost(post.id)}
                            disabled={processing}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      <Separator className="mb-4" />
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                        {post.content}
                      </p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsDashboard;
