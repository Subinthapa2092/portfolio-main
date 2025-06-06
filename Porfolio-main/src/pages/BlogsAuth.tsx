
import { useState } from "react";
import AuthForm from "@/components/AuthForm";
import BlogsDashboard from "@/components/BlogsDashboard";

const BlogsAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    return <BlogsDashboard />;
  }

  return (
    <AuthForm
      title="Blog Management"
      description="Access your blog dashboard to create and manage posts"
      onLogin={handleLogin}
    />
  );
};

export default BlogsAuth;
