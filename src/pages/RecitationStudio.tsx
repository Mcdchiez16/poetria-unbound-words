
import { useState } from "react";
import { Mic, Play, Pause, Square, Volume2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RecitationStudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedPoem, setSelectedPoem] = useState(0);

  const practicePoems = [
    {
      id: 1,
      title: "The Road Not Taken",
      author: "Robert Frost",
      difficulty: "Beginner",
      text: "Two roads diverged in a yellow wood,\nAnd sorry I could not travel both\nAnd be one traveler, long I stood\nAnd looked down one as far as I could\nTo where it bent in the undergrowth;"
    },
    {
      id: 2,
      title: "If—",
      author: "Rudyard Kipling",
      difficulty: "Intermediate",
      text: "If you can keep your head when all about you\nAre losing theirs and blaming it on you,\nIf you can trust yourself when all men doubt you,\nBut make allowance for their doubting too;"
    }
  ];

  const achievements = [
    { name: "First Recording", earned: true, icon: "🎤" },
    { name: "Daily Practice", earned: true, icon: "📅" },
    { name: "Perfect Rhythm", earned: false, icon: "🎵" },
    { name: "Poetry Master", earned: false, icon: "👑" }
  ];

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setRecordingTime(0);
      // Start timer simulation
      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      setTimeout(() => {
        clearInterval(interval);
      }, 10000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mic className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Recitation Studio
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="practice" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="record">Record</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="practice" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-8">
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
                          <div className="text-sm opacity-70">by {poem.author}</div>
                          <Badge 
                            variant="secondary" 
                            className="mt-1 text-xs"
                          >
                            {poem.difficulty}
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
                    <CardTitle>{practicePoems[selectedPoem].title}</CardTitle>
                    <p className="text-purple-600">by {practicePoems[selectedPoem].author}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                      <pre className="text-lg leading-relaxed font-serif whitespace-pre-wrap">
                        {practicePoems[selectedPoem].text}
                      </pre>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <Volume2 className="w-4 h-4 mr-2" />
                        Listen to Example
                      </Button>
                      <Button variant="outline">
                        Start Guided Practice
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
                    <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Button
                        size="lg"
                        variant="ghost"
                        onClick={toggleRecording}
                        className="w-24 h-24 rounded-full bg-white text-purple-600 hover:bg-gray-50"
                      >
                        {isRecording ? (
                          <Square className="w-8 h-8" />
                        ) : (
                          <Mic className="w-8 h-8" />
                        )}
                      </Button>
                    </div>
                    
                    {isRecording && (
                      <div className="space-y-2">
                        <div className="text-2xl font-bold text-purple-600">
                          {formatTime(recordingTime)}
                        </div>
                        <div className="text-sm text-gray-500">Recording...</div>
                        <div className="flex justify-center">
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className="w-1 h-8 bg-purple-500 animate-pulse"
                                style={{ animationDelay: `${i * 0.1}s` }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {!isRecording && recordingTime > 0 && (
                      <div className="space-y-4">
                        <div className="text-lg font-medium">
                          Recording complete: {formatTime(recordingTime)}
                        </div>
                        <div className="flex gap-2 justify-center">
                          <Button
                            variant="outline"
                            onClick={() => setIsPlaying(!isPlaying)}
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            {isPlaying ? "Pause" : "Play"}
                          </Button>
                          <Button className="bg-purple-600 hover:bg-purple-700">
                            Save Recording
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

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

          <TabsContent value="achievements" className="space-y-6">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-6 h-6" />
                    Your Achievements
                  </CardTitle>
                  <p className="text-gray-600">
                    Track your progress and unlock new achievements
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-2 ${
                          achievement.earned
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div>
                            <div className={`font-medium ${
                              achievement.earned ? "text-green-800" : "text-gray-600"
                            }`}>
                              {achievement.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {achievement.earned ? "Completed!" : "In progress..."}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Progress Stats */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
                    <div className="text-sm text-gray-500">Poems Practiced</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">5</div>
                    <div className="text-sm text-gray-500">Recordings Made</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">7</div>
                    <div className="text-sm text-gray-500">Day Streak</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RecitationStudio;
