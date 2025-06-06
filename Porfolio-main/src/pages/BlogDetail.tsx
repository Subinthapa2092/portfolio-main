import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Clock, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  readTime: string;
  tags: string[];
  createdAt: {
    toDate: () => Date;
  };
}

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch blog post from Firestore
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        navigate('/');
        return;
      }

      try {
        setLoading(true);
        const postRef = doc(db, "blogPosts", id);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
          const postData = postSnap.data() as Omit<BlogPost, "id">;
          setPost({
            id: postSnap.id,
            ...postData,
            coverImage: postData.coverImage || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
            readTime: postData.readTime || "5 min read",
            tags: postData.tags || []
          });
        } else {
          toast({
            title: "Error",
            description: "Blog post not found",
            variant: "destructive"
          });
          navigate('/');
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        toast({
          title: "Error",
          description: "Failed to fetch blog post",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="mt-4">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The blog post you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mb-6 animate-fade-in"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <Card className="animate-fade-in">
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
              {post.title}
            </CardTitle>
            
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.createdAt ? format(post.createdAt.toDate(), 'yyyy-MM-dd') : ''}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Subin Thapa
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>
          
          <CardContent>
            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogDetail;
