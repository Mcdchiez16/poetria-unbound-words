
import { useState, useEffect } from "react";
import { Mic, Play, Pause, Square, Volume2, Save, Share2, BookOpen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNavigation from "@/components/BottomNavigation";
import LoginButton from "@/components/LoginButton";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const RecitationStudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedPoem, setSelectedPoem] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordingInterval, setRecordingInterval] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  
  const { toast } = useToast();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();

  // Fetch user's saved audio recordings
  const { data: savedAudios = [], refetch } = useQuery({
    queryKey: ["userAudios", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('poems')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_audio', true)
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching audio recordings:', error);
        return [];
      }
      
      return data || [];
    },
    enabled: !!user,
  });

  // Fetch practice poems from database instead of hardcoded
  const { data: practicePoems = [] } = useQuery({
    queryKey: ["practicePoems"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('poems')
        .select('*')
        .eq('category', 'classic')
        .limit(10);
      
      if (error) {
        console.error('Error fetching practice poems:', error);
        // Fallback to sample data if database is empty
        return [
          {
            id: 1,
            title: "The Road Not Taken",
            content: "Two roads diverged in a yellow wood,\nAnd sorry I could not travel both\nAnd be one traveler, long I stood\nAnd looked down one as far as I could\nTo where it bent in the undergrowth;",
            category: "classic"
          },
          {
            id: 2,
            title: "If—",
            content: "If you can keep your head when all about you\nAre losing theirs and blaming it on you,\nIf you can trust yourself when all men doubt you,\nBut make allowance for their doubting too;",
            category: "classic"
          }
        ];
      }
      
      return data?.length > 0 ? data : [
        {
          id: 1,
          title: "The Road Not Taken",
          content: "Two roads diverged in a yellow wood,\nAnd sorry I could not travel both\nAnd be one traveler, long I stood\nAnd looked down one as far as I could\nTo where it bent in the undergrowth;",
          category: "classic"
        },
        {
          id: 2,
          title: "If—",
          content: "If you can keep your head when all about you\nAre losing theirs and blaming it on you,\nIf you can trust yourself when all men doubt you,\nBut make allowance for their doubting too;",
          category: "classic"
        }
      ];
    },
  });

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
      };
      
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      const interval = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      setRecordingInterval(interval);
      
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone",
      });
    } catch (err) {
      console.error('Error accessing microphone:', err);
      toast({
        title: "Microphone access failed",
        description: "Please allow microphone access to record",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      // Stop all audio tracks
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
    
    // Clear interval
    if (recordingInterval) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }
    
    toast({
      title: "Recording completed",
      description: `Duration: ${formatTime(recordingTime)}`,
    });
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const saveRecording = async (isDraft = true) => {
    if (!audioBlob || !user) {
      toast({
        title: "Cannot save recording",
        description: !user ? "Please sign in first" : "No recording to save",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);

    try {
      const selectedPoemData = practicePoems[selectedPoem];
      const poemTitle = selectedPoemData?.title + (isDraft ? " (Draft Recording)" : " (Recording)");
      
      const { error } = await supabase
        .from('poems')
        .insert({
          user_id: user.id,
          title: poemTitle,
          content: selectedPoemData?.content || "Custom recording",
          category: "recitation",
          is_audio: true
        });

      if (error) throw error;

      toast({
        title: isDraft ? "Recording saved as draft!" : "Recording published!",
        description: isDraft ? "Your recording has been saved to your collection" : "Your recording is now available in the audio library",
      });

      refetch();
      queryClient.invalidateQueries({ queryKey: ["audioPoems"] });
      
      // Clear the current recording
      setAudioBlob(null);
      setRecordingTime(0);
    } catch (err) {
      console.error('Error saving recording:', err);
      toast({
        title: "Failed to save recording",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
      setPublishing(false);
    }
  };

  const publishRecording = async () => {
    setPublishing(true);
    await saveRecording(false);
  };

  const deleteRecording = async (recordingId: string) => {
    if (!confirm("Are you sure you want to delete this recording?")) return;

    try {
      const { error } = await supabase
        .from('poems')
        .delete()
        .eq('id', recordingId);

      if (error) throw error;

      toast({
        title: "Recording deleted",
        description: "Your recording has been deleted successfully.",
      });

      refetch();
      queryClient.invalidateQueries({ queryKey: ["audioPoems"] });
    } catch (error: any) {
      toast({
        title: "Error deleting recording",
        description: error.message || "Failed to delete recording.",
        variant: "destructive",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const switchToRecordTab = () => {
    const recordTab = document.querySelector('[data-state="inactive"][value="record"]') as HTMLElement;
    if (recordTab) {
      recordTab.click();
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (recordingInterval) {
        clearInterval(recordingInterval);
      }
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaRecorder, recordingInterval]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mic className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Recitation Studio
              </h1>
            </div>
            <div className="hidden md:block">
              <LoginButton />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Tabs defaultValue="practice" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="record">Record</TabsTrigger>
            {user && <TabsTrigger value="saved">My Recordings</TabsTrigger>}
          </TabsList>

          <TabsContent value="practice" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Poem Selection */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Practice Poems</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {practicePoems.map((poem, index) => (
                      <Button
                        key={poem.id}
                        variant={selectedPoem === index ? "default" : "outline"}
                        className={`w-full text-left justify-start h-auto p-4 ${
                          selectedPoem === index ? "bg-purple-600 hover:bg-purple-700" : ""
                        }`}
                        onClick={() => setSelectedPoem(index)}
                      >
                        <div>
                          <div className="font-medium">{poem.title}</div>
                          <Badge 
                            variant="secondary" 
                            className="mt-1 text-xs"
                          >
                            {poem.category}
                          </Badge>
                        </div>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Poem Display */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>{practicePoems[selectedPoem]?.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-4 sm:p-6 rounded-lg mb-6">
                      <pre className="text-base sm:text-lg leading-relaxed font-serif whitespace-pre-wrap">
                        {practicePoems[selectedPoem]?.content}
                      </pre>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                      <Button className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
                        <Volume2 className="w-4 h-4 mr-2" />
                        Listen to Example
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full sm:w-auto"
                        onClick={switchToRecordTab}
                      >
                        Start Recording
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="record" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Record Your Recitation</CardTitle>
                  <p className="text-gray-600">
                    Practice and record your poetry recitation
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Recording Interface */}
                  <div className="text-center">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Button
                        size="lg"
                        variant="ghost"
                        onClick={toggleRecording}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white text-purple-600 hover:bg-gray-50"
                      >
                        {isRecording ? (
                          <Square className="w-6 h-6 sm:w-8 sm:h-8" />
                        ) : (
                          <Mic className="w-6 h-6 sm:w-8 sm:h-8" />
                        )}
                      </Button>
                    </div>
                    
                    {isRecording && (
                      <div className="space-y-2">
                        <div className="text-xl sm:text-2xl font-bold text-purple-600">
                          {formatTime(recordingTime)}
                        </div>
                        <div className="text-sm text-gray-500">Recording...</div>
                        <div className="flex justify-center">
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className="w-1 h-6 sm:h-8 bg-purple-500 animate-pulse"
                                style={{ animationDelay: `${i * 0.1}s` }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {!isRecording && audioBlob && (
                      <div className="space-y-4">
                        <div className="text-lg font-medium">
                          Recording complete: {formatTime(recordingTime)}
                        </div>
                        <div className="flex flex-wrap gap-3 justify-center">
                          <Button
                            variant="outline"
                            onClick={() => setIsPlaying(!isPlaying)}
                          >
                            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                            {isPlaying ? "Pause" : "Play"}
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => saveRecording(true)}
                            disabled={saving || publishing}
                          >
                            <Save className="w-4 h-4 mr-2" />
                            {saving ? "Saving..." : "Save Draft"}
                          </Button>
                          <Button 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={publishRecording}
                            disabled={saving || publishing}
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            {publishing ? "Publishing..." : "Publish"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Select Poem to Recite */}
                  {!isRecording && !audioBlob && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Select a poem to recite:</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {practicePoems.map((poem, index) => (
                          <Button
                            key={poem.id}
                            variant="outline"
                            size="sm"
                            className={selectedPoem === index ? "border-purple-600" : ""}
                            onClick={() => setSelectedPoem(index)}
                          >
                            {poem.title}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recording Tips */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Recording Tips:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Find a quiet space for best audio quality</li>
                      <li>• Speak clearly and at a steady pace</li>
                      <li>• Pay attention to rhythm and emphasis</li>
                      <li>• Take your time with pauses and breathing</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {user && (
            <TabsContent value="saved" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                      My Audio Recordings ({savedAudios.length})
                    </CardTitle>
                    <p className="text-gray-600">
                      Your saved and published audio recordings
                    </p>
                  </CardHeader>
                  <CardContent>
                    {savedAudios.length > 0 ? (
                      <div className="space-y-4">
                        {savedAudios.map((audio) => (
                          <Card key={audio.id} className="hover:shadow-md transition-all duration-300">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-gray-800 truncate">{audio.title}</h3>
                                  <p className="text-purple-600 text-sm">Category: {audio.category}</p>
                                  <p className="text-gray-500 text-sm">
                                    Recorded: {new Date(audio.created_at).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => deleteRecording(audio.id)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Mic className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">No recordings yet</p>
                        <Button 
                          onClick={switchToRecordTab}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          Make Your First Recording
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default RecitationStudio;
