
import { BookOpen, Mic, Users, PenTool, Volume2, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Poetry Library",
      description: "Explore thousands of poems from classic to contemporary poets",
      link: "/library"
    },
    {
      icon: PenTool,
      title: "Writing Studio",
      description: "Create and craft your own poetry with advanced writing tools",
      link: "/write"
    },
    {
      icon: Volume2,
      title: "Audio Library",
      description: "Listen to beautifully narrated poems and spoken word",
      link: "/audio"
    },
    {
      icon: Mic,
      title: "Recitation Practice",
      description: "Practice your poetry recitation with interactive tools",
      link: "/recite"
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with fellow poetry enthusiasts and share your work",
      link: "/community"
    },
    {
      icon: Calendar,
      title: "Daily Poetry",
      description: "Discover new poems curated for you every day",
      link: "/daily"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Poetria
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/library" className="text-gray-600 hover:text-purple-600 transition-colors">Library</Link>
              <Link to="/write" className="text-gray-600 hover:text-purple-600 transition-colors">Write</Link>
              <Link to="/audio" className="text-gray-600 hover:text-purple-600 transition-colors">Listen</Link>
              <Link to="/community" className="text-gray-600 hover:text-purple-600 transition-colors">Community</Link>
              <Button className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-700 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Your Complete Poetry Companion
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover, create, listen, and share poetry like never before. Join a vibrant community of poetry lovers 
            and explore the world's most beautiful verses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8">
              Start Exploring
            </Button>
            <Button size="lg" variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 text-lg px-8">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Everything You Need for Poetry
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-purple-100 hover:border-purple-200">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-center leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
              <div className="text-gray-600">Poems</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">5K+</div>
              <div className="text-gray-600">Audio Recordings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-gray-600">Community Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">1K+</div>
              <div className="text-gray-600">Poets Featured</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <BookOpen className="w-6 h-6" />
            <span className="text-xl font-bold">Poetria</span>
          </div>
          <p className="text-gray-400 mb-6">
            Bringing poetry to life through technology and community
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
