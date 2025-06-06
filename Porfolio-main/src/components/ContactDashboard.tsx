
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, Trash2, RefreshCw } from "lucide-react";
import { getContactMessages, type ContactMessage } from "@/services/firebaseService";
import { useToast } from "@/hooks/use-toast";

const ContactDashboard = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const fetchedMessages = await getContactMessages();
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Failed to load messages. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
    toast({
      title: "Message deleted",
      description: "The message has been removed from your dashboard.",
    });
  };

  const handleStatusChange = (id: string, status: ContactMessage["status"]) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, status } : msg
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-green-500";
      case "read": return "bg-yellow-500";
      case "replied": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Unknown";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 animate-fade-in">Contact Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 animate-fade-in">
              Manage contact messages and inquiries ({messages.length} total)
            </p>
          </div>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={fetchMessages}
              className="animate-fade-in"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="animate-fade-in"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
          </div>
        </div>

        {messages.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
              <p className="text-gray-600 dark:text-gray-300">
                When people contact you through your portfolio, their messages will appear here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {messages.map((message, index) => (
              <Card key={message.id} className="hover:shadow-lg transition-all duration-300 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{message.subject}</CardTitle>
                        <Badge className={`${getStatusColor(message.status)} text-white`}>
                          {message.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-base mb-3">
                        From: {message.name} ({message.email})
                      </CardDescription>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(message.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <select 
                        value={message.status} 
                        onChange={(e) => handleStatusChange(message.id!, e.target.value as ContactMessage["status"])}
                        className="px-3 py-1 border rounded text-sm"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteMessage(message.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {message.message}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactDashboard;
