import { BookOpen, Mic, PenTool, Volume2, Calendar, Sparkles, Heart, Users, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BottomNavigation from "@/components/BottomNavigation";

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Poetry Library",
      description: "Explore thousands of poems from classic to contemporary poets",
      link: "/library",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      icon: PenTool,
      title: "Writing Studio",
      description: "Create and craft your own poetry with advanced writing tools",
      link: "/write",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: Volume2,
      title: "Audio Library",
      description: "Listen to beautifully narrated poems and spoken word",
      link: "/audio",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Mic,
      title: "Recitation Practice",
      description: "Practice your poetry recitation with interactive tools",
      link: "/recite",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Calendar,
      title: "Daily Poetry",
      description: "Discover new poems curated for you every day",
      link: "/daily",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  const todaysPoem = {
    title: "The Road Not Taken",
    author: "Robert Frost",
    excerpt: "Two roads diverged in a yellow wood,\nAnd sorry I could not travel both..."
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Poetria
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/library" className="text-gray-600 hover:text-purple-600 transition-colors">Library</Link>
              <Link to="/write" className="text-gray-600 hover:text-purple-600 transition-colors">Write</Link>
              <Link to="/audio" className="text-gray-600 hover:text-purple-600 transition-colors">Listen</Link>
              <Link to="/daily" className="text-gray-600 hover:text-purple-600 transition-colors">Daily</Link>
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
                <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-700 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
            Your Complete Poetry Companion
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Discover, create, listen, and share poetry like never before. Join a vibrant community of poetry lovers 
            and explore the world's most beautiful verses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-12 px-4">
            <Link to="/signup">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                Start Exploring
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
              Watch Demo
            </Button>
          </div>

          {/* Today's Featured Poem */}
          <div className="max-w-2xl mx-auto px-4">
            <Card className="bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Quote className="w-5 h-5 text-purple-600" />
                  <CardTitle className="text-lg sm:text-xl text-purple-800">Today's Featured Poem</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">{todaysPoem.title}</h3>
                <p className="text-sm text-purple-600 mb-4">by {todaysPoem.author}</p>
                <blockquote className="italic text-gray-700 leading-relaxed text-sm sm:text-base">
                  "{todaysPoem.excerpt}"
                </blockquote>
                <Link to="/daily">
                  <Button className="mt-4 bg-purple-600 hover:bg-purple-700" size="sm">
                    Read Full Poem
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
            Everything You Need for Poetry
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link} className="group">
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-purple-100 hover:border-purple-200 group-hover:scale-105">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-center leading-relaxed text-sm sm:text-base">
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
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center max-w-4xl mx-auto">
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2 group-hover:text-purple-700">10K+</div>
              <div className="text-gray-600 text-sm sm:text-base">Poems</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2 group-hover:text-purple-700">5K+</div>
              <div className="text-gray-600 text-sm sm:text-base">Audio Recordings</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2 group-hover:text-purple-700">50K+</div>
              <div className="text-gray-600 text-sm sm:text-base">Active Users</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2 group-hover:text-purple-700">1K+</div>
              <div className="text-gray-600 text-sm sm:text-base">Poets Featured</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
              Ready to Begin Your Poetry Journey?
            </h3>
            <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
              Whether you're a seasoned poet or just starting out, Poetria has everything you need to explore, create, and share beautiful poetry.
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4 sm:px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold">Poetria</span>
          </div>
          <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
            Bringing poetry to life through technology and inspiration
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-400">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
