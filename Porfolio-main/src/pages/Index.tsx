import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, Github, Linkedin, Facebook, Instagram, Mail, Phone, MapPin, ExternalLink, Calendar, User, Briefcase, Code, BookOpen, Download, TrendingUp, BarChart, Star, Award, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ContactForm from "@/components/ContactForm";
import ParticleAnimation from "@/components/ParticleAnimation";
import { getBlogPosts, type BlogPost } from "@/services/firebaseService";

const Index = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) {
        return saved === 'dark';
      }
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const fullText = "Python Developer Intern | Data Enthusiast";

  // Typing animation effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentIndex, fullText]);
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth"
    });
    setIsMenuOpen(false);
  };
  const projectCategories = [{
    name: "All",
    active: true
  }, {
    name: "Data Science",
    active: false
  }, {
    name: "Trading",
    active: false
  }, {
    name: "App",
    active: false
  }];
  const skills = [{
    name: "Python",
    level: 85,
    category: "Programming"
  }, {
    name: "Pandas",
    level: 80,
    category: "Data Analysis"
  }, {
    name: "NumPy",
    level: 75,
    category: "Data Analysis"
  }, {
    name: "Matplotlib",
    level: 70,
    category: "Visualization"
  }, {
    name: "Scikit-learn",
    level: 65,
    category: "Machine Learning"
  }, {
    name: "SQL",
    level: 75,
    category: "Database"
  }, {
    name: "Git",
    level: 80,
    category: "Tools"
  }, {
    name: "Jupyter",
    level: 85,
    category: "Tools"
  }];
  const journey = [{
    year: "2019",
    title: "Started Programming Journey",
    description: "Began exploring programming fundamentals and basic computer science concepts",
    icon: <Code className="h-4 w-4" />
  }, {
    year: "2020",
    title: "Discovered Python",
    description: "Started learning Python programming and fell in love with its simplicity and power",
    icon: <Code className="h-4 w-4" />
  }, {
    year: "2021",
    title: "Data Science Introduction",
    description: "Discovered the field of data science and began learning about data analysis",
    icon: <BarChart className="h-4 w-4" />
  }, {
    year: "2022",
    title: "Advanced Python Skills",
    description: "Deepened Python knowledge with libraries like Pandas, NumPy, and Matplotlib",
    icon: <TrendingUp className="h-4 w-4" />
  }, {
    year: "2023",
    title: "Machine Learning Projects",
    description: "Started working on machine learning projects and exploring AI applications",
    icon: <Star className="h-4 w-4" />
  }, {
    year: "2024",
    title: "Seeking Internship",
    description: "Looking for Python developer internship to apply my skills in real-world projects",
    icon: <Target className="h-4 w-4" />
  }, {
    year: "2025",
    title: "Python Certification",
    description: "Completed Python training course from Technology Channel Pvt Ltd with outstanding track record (Jan-Feb 2025)",
    icon: <Award className="h-4 w-4" />
  }];
  const projects = [{
    title: "Stock Market Analysis Dashboard",
    description: "Interactive dashboard analyzing stock market patterns using Python and machine learning algorithms",
    tech: ["Python", "Pandas", "TensorFlow", "Plotly"],
    icon: <TrendingUp className="h-6 w-6" />,
    category: "Data Science"
  }, {
    title: "Trading Strategy Backtester",
    description: "Comprehensive backtesting system for various trading strategies with risk analysis",
    tech: ["Python", "NumPy", "Matplotlib", "Risk Management"],
    icon: <BarChart className="h-6 w-6" />,
    category: "Trading"
  }, {
    title: "Financial Data Pipeline",
    description: "Automated data pipeline for collecting and processing financial market data in real-time",
    tech: ["Python", "SQL", "Data Engineering", "APIs"],
    icon: <Code className="h-6 w-6" />,
    category: "Data Science"
  }, {
    title: "Portfolio Management App",
    description: "Web application for tracking investment portfolios with real-time data visualization",
    tech: ["React", "TypeScript", "Charts.js", "REST API"],
    icon: <Briefcase className="h-6 w-6" />,
    category: "App"
  }, {
    title: "Cryptocurrency Tracker",
    description: "Real-time cryptocurrency price tracking with technical analysis indicators",
    tech: ["Python", "WebSocket", "Technical Analysis", "React"],
    icon: <TrendingUp className="h-6 w-6" />,
    category: "Trading"
  }, {
    title: "ML Trading Bot",
    description: "Automated trading bot using machine learning for market prediction and execution",
    tech: ["Python", "Scikit-Learn", "Trading APIs", "Docker"],
    icon: <Code className="h-6 w-6" />,
    category: "App"
  }];
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Unknown date";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  // Fetch blog posts from Firebase
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const posts = await getBlogPosts();
        setBlogPosts(posts.slice(0, 3)); // Show only latest 3 posts
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        // Fallback to default posts if Firebase fails
        setBlogPosts([
          {
            id: "1",
            title: "Python for Financial Analysis",
            excerpt: "A comprehensive guide to using Python libraries for analyzing financial data and market trends.",
            createdAt: new Date("2024-05-15") as any,
            coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop",
            content: "",
            updatedAt: new Date() as any,
            published: true
          },
          {
            id: "2",
            title: "Machine Learning in Trading",
            excerpt: "Exploring how machine learning algorithms can improve trading strategies and risk management.",
            createdAt: new Date("2024-05-10") as any,
            coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop",
            content: "",
            updatedAt: new Date() as any,
            published: true
          },
          {
            id: "3",
            title: "Data Visualization Best Practices",
            excerpt: "Creating effective visualizations for financial data using Python and modern charting libraries.",
            createdAt: new Date("2024-05-05") as any,
            coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop",
            content: "",
            updatedAt: new Date() as any,
            published: true
          }
        ]);
      } finally {
        setIsLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, []);

  return <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${isDark ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <ParticleAnimation />
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md ${isDark ? 'bg-gray-900/80' : 'bg-white/80'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-blue-600">
                Subin Thapa
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {["About", "Projects", "Blog", "Contact"].map(item => <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                    {item}
                  </button>)}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              {/* Mobile menu button */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className={`md:hidden ${isDark ? 'bg-gray-800' : 'bg-white'} border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} animate-fade-in`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {["About", "Projects", "Blog", "Contact"].map(item => <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  {item}
                </button>)}
            </div>
          </div>}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Profile and Text Content */}
            <div className="text-center lg:text-left">
              {/* Profile Photo - Better positioned at top */}
              <div className="mb-8 animate-scale-in flex justify-center lg:justify-start">
                <img 
                  src="/lovable-uploads/9fab9916-e7cc-4577-9966-cc1b70a48b1d.png" 
                  alt="Profile" 
                  className="w-40 h-40 rounded-full object-cover border-4 border-blue-200 shadow-2xl hover:scale-105 transition-transform duration-300" 
                />
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-600 animate-fade-in">
                {displayText}
                {!isTypingComplete && <span className="animate-pulse">|</span>}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto lg:mx-0 animate-fade-in">
                Aspiring Python developer with a passion for data science and financial analysis. 
                Recently certified in Python programming with outstanding track record.
                Currently seeking internship opportunities to apply my programming skills and contribute 
                to innovative projects while learning from experienced professionals.
              </p>
              
              {/* Social Links */}
              <div className="flex justify-center lg:justify-start space-x-6 mb-8 animate-fade-in">
                <a href="https://github.com/Subinthapa2092/" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                  <Github className="h-6 w-6" />
                </a>
                <a href="https://www.linkedin.com/in/subin-thapa-a19799344/" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="https://www.facebook.com/subin.thapa.961011" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="https://www.instagram.com/subinthapa04/" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                  <Instagram className="h-6 w-6" />
                </a>
              </div>

              {/* Resume Download Button */}
              <div className="flex justify-center lg:justify-start animate-fade-in">
                <Button 
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <a href="/resume.pdf" download="Subin_Thapa_Resume.pdf">
                    <Download className="h-5 w-5 mr-2" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Column - Certificate */}
            <div className="animate-fade-in">
              <div className="max-w-lg mx-auto">
                <img 
                  src="/lovable-uploads/99976960-fd19-4fe8-a8c7-84f869bcd413.png" 
                  alt="Python Certification - Technology Channel Pvt Ltd" 
                  className="w-full h-auto rounded-lg shadow-xl border-2 border-blue-200 hover:scale-105 transition-transform duration-300" 
                />
                <div className="mt-4 text-center">
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
                    <Award className="h-4 w-4 mr-2" />
                    Python Certified - Feb 2025
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">About Me</h2>
            <p className="text-lg max-w-3xl mx-auto animate-fade-in">
              Discover my background, skills, and journey in Python development and data science.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* About Content */}
            <Card className={`animate-fade-in glass-card shadow-glow ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  My Background
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-lg leading-relaxed">
                  I'm an aspiring Python developer with a growing passion for data science and financial analysis. 
                  My journey began with curiosity about programming and has evolved into a dedicated pursuit of technical excellence.
                </p>
                <p className="mb-4 text-lg leading-relaxed">
                  Currently seeking an internship opportunity where I can apply my Python skills, learn from experienced developers, 
                  and contribute to meaningful projects that make a real impact.
                </p>
                <p className="mb-6 text-lg leading-relaxed">
                  I'm particularly interested in data analysis, machine learning, and financial technology, 
                  always eager to learn new technologies and solve complex problems.
                </p>
                <div className="grid md:grid-cols-1 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span>Open to remote/hybrid internships</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span>Available for immediate start</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className={`animate-fade-in glass-card shadow-glow ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skills.map((skill, index) => <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {skill.category}
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out" style={{
                      width: `${skill.level}%`,
                      animationDelay: `${index * 0.1}s`
                    }} />
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Journey Timeline */}
          <Card className={`mt-8 max-w-4xl mx-auto animate-fade-in glass-card shadow-glow ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                My Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {journey.map((item, index) => <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="p-2 bg-blue-600 rounded-full text-white">
                        {item.icon}
                      </div>
                      {index < journey.length - 1 && <div className="w-px h-12 bg-gray-300 dark:bg-gray-600 mt-2" />}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {item.year}
                        </Badge>
                        <h3 className="font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-16 px-4 sm:px-6 lg:px-8 relative z-10 ${isDark ? 'bg-gray-800/30' : 'bg-white/30'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Featured Projects</h2>
            <p className="text-lg animate-fade-in">Data science and trading projects that showcase my expertise</p>
          </div>
          
          {/* Project Categories */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {projectCategories.map((category, index) => <Button key={category.name} variant={category.active ? "default" : "ghost"} size="sm" className={`px-6 ${category.active ? 'bg-blue-600 text-white' : ''}`}>
                  {category.name}
                </Button>)}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => <Card key={index} className={`hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in glass-card shadow-glow ${isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-white/50'}`} style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-lg text-white">
                      {project.icon}
                    </div>
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(tech => <Badge key={tech} variant="secondary" className="text-xs hover:scale-105 transition-transform">
                        {tech}
                      </Badge>)}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {project.category}
                  </Badge>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Latest Blog Posts</h2>
            <p className="text-lg animate-fade-in">Insights about data science, trading, and technology</p>
          </div>
          
          {isLoadingBlogs ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => <Card key={index} className={`hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in glass-card shadow-glow ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50'}`} style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  {post.coverImage && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-500" />
                      {post.title}
                    </CardTitle>
                    <CardDescription>
                      <div className="flex justify-between text-sm">
                        <span>{formatDate(post.createdAt)}</span>
                        <span>{post.readTime || getReadTime(post.content || post.excerpt)}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{post.excerpt}</p>
                    <Button variant="outline" size="sm" onClick={() => window.location.href = `/blog/${post.id}`} className="w-full">
                      Read More
                    </Button>
                  </CardContent>
                </Card>)}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-16 px-4 sm:px-6 lg:px-8 relative z-10 ${isDark ? 'bg-gray-800/30' : 'bg-white/30'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Get In Touch</h2>
            <p className="text-lg animate-fade-in">Let's discuss internship opportunities and how I can contribute to your team</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <Card className={`hover:shadow-lg transition-all duration-300 animate-fade-in glass-card shadow-glow ${isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-white/50'}`}>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Feel free to reach out through any of these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 hover:scale-105 transition-transform">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <span>subinthapa2092@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 hover:scale-105 transition-transform">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span>+977 9761875043</span>
                </div>
                <div className="flex items-center gap-4 hover:scale-105 transition-transform">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span>Available for remote internships</span>
                </div>
                
                <Separator />
                
                <div>
                  <p className="mb-4">Connect with me on social media:</p>
                  <div className="flex gap-4">
                    <a href="https://www.linkedin.com/in/subin-thapa-a19799344/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 hover:scale-105">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                    <a href="https://www.facebook.com/subin.thapa.961011" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 hover:scale-105">
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 sm:px-6 lg:px-8 relative z-10 ${isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-gray-100/50 border-gray-200'} border-t backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Subin Thapa</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Aspiring Python developer and data science enthusiast seeking internship opportunities to grow and contribute to innovative projects.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/Subinthapa2092/" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/subin-thapa-a19799344/" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://www.facebook.com/subin.thapa.961011" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('about')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">About</button></li>
                <li><button onClick={() => scrollToSection('projects')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Projects</button></li>
                <li><button onClick={() => scrollToSection('blog')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Blog</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Skills</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>Python Development</li>
                <li>Data Analysis</li>
                <li>Machine Learning</li>
                <li>Web Development</li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="text-center text-sm text-gray-600 dark:text-gray-300">
            <p>© 2024 Subin Thapa. Built with React, TypeScript, and Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;
