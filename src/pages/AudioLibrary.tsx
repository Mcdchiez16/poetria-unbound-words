
import { useState } from "react";
import { Play, Pause, Volume2, Download, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import BottomNavigation from "@/components/BottomNavigation";
import LoginButton from "@/components/LoginButton";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const AudioLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Fetch all poems (user poems, external poems, and daily featured poems)
  const { data: allPoems = [], isLoading } = useQuery({
    queryKey: ["allPoems"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('all_poems')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching poems:", error);
        toast({
          title: "Error loading poems",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }
      
      return data || [];
    },
  });

  // Transform poems for audio display
  const audioPoems = allPoems.map(poem => ({
    id: poem.id,
    title: poem.title,
    author: poem.external_author || (user?.user_metadata?.full_name) || "Unknown Author",
    narrator: poem.source_type === 'user' ? (user?.user_metadata?.full_name || "You") : "AI Narrator",
    duration: "3:45", // Placeholder duration
    category: poem.category || "general",
    likes: Math.floor(Math.random() * 1000),
    downloads: Math.floor(Math.random() * 500),
    content: poem.content,
    audio_url: poem.audio_url,
    source_type: poem.source_type
  }));

  const filteredAudio = audioPoems.filter(poem =>
    poem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    poem.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (poem.narrator && poem.narrator.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      setProgress(Math.random() * 100); // Simulate progress
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Audio Library
              </h1>
            </div>
            <LoginButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search audio poems..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : filteredAudio.length === 0 ? (
          <div className="text-center py-12">
            <Volume2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Audio Poems Found</h3>
            <p className="text-gray-500">Try adjusting your search or check back later for new content.</p>
          </div>
        ) : (
          <>
            {/* Featured Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Featured Narrations</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAudio.slice(0, 3).map((poem) => (
                  <Card key={poem.id} className="hover:shadow-lg transition-all duration-300 border-purple-100">
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit bg-purple-100 text-purple-700">
                        {poem.category}
                      </Badge>
                      <CardTitle className="text-lg font-semibold text-gray-800">
                        {poem.title}
                      </CardTitle>
                      <p className="text-purple-600 font-medium">by {poem.author}</p>
                      <p className="text-sm text-gray-500">Narrated by {poem.narrator}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Audio Player */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => togglePlay(poem.id)}
                              className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white"
                            >
                              {playingId === poem.id ? (
                                <Pause className="w-5 h-5" />
                              ) : (
                                <Play className="w-5 h-5 ml-1" />
                              )}
                            </Button>
                            <span className="text-sm text-gray-500">{poem.duration}</span>
                          </div>
                          {playingId === poem.id && (
                            <Progress value={progress} className="w-full" />
                          )}
                        </div>

                        {/* Stats and Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {poem.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <Download className="w-4 h-4" />
                              {poem.downloads}
                            </span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* All Audio List */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">All Audio Poems</h2>
              <div className="space-y-4">
                {filteredAudio.map((poem) => (
                  <Card key={poem.id} className="hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePlay(poem.id)}
                          className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex-shrink-0"
                        >
                          {playingId === poem.id ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5 ml-1" />
                          )}
                        </Button>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 truncate">{poem.title}</h3>
                          <p className="text-purple-600 text-sm">by {poem.author}</p>
                          <p className="text-gray-500 text-sm">Narrated by {poem.narrator}</p>
                          {playingId === poem.id && (
                            <Progress value={progress} className="w-full mt-2" />
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{poem.duration}</span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {poem.likes}
                          </span>
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Audio
              </Button>
            </div>
          </>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default AudioLibrary;
