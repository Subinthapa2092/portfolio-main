
import { useState } from "react";
import AuthForm from "@/components/AuthForm";
import ContactDashboard from "@/components/ContactDashboard";

const ContactAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    return <ContactDashboard />;
  }

  return (
    <AuthForm
      title="Contact Management"
      description="Access your contact dashboard to view messages and inquiries"
      onLogin={handleLogin}
    />
  );
};

export default ContactAuth;
