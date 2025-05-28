
import { useState } from "react";
import { Calendar, BookOpen, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DailyPoetry = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const dailyPoem = {
    title: "Hope is the thing with feathers",
    author: "Emily Dickinson",
    category: "Classic",
    year: 1861,
    content: `Hope is the thing with feathers
That perches in the soul,
And sings the tune without the words,
And never stops at all,

And sweetest in the gale is heard;
And sore must be the storm
That could abash the little bird
That kept so many warm.

I've heard it in the chillest land,
And on the strangest sea;
Yet, never, in extremity,
It asked a crumb of me.`,
    theme: "Hope and resilience",
    background: "Written during a period of personal struggle, this poem captures Dickinson's profound understanding of hope as an enduring force.",
    likes: 2847,
    shares: 456
  };

  const weeklyPoems = [
    { day: "Mon", title: "The Road Not Taken", author: "Robert Frost" },
    { day: "Tue", title: "Still I Rise", author: "Maya Angelou" },
    { day: "Wed", title: "Hope is the thing...", author: "Emily Dickinson" },
    { day: "Thu", title: "If—", author: "Rudyard Kipling" },
    { day: "Fri", title: "The Guest House", author: "Rumi" },
    { day: "Sat", title: "Phenomenal Woman", author: "Maya Angelou" },
    { day: "Sun", title: "Do not go gentle...", author: "Dylan Thomas" }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Daily Poetry
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium px-3">
                {formatDate(currentDate)}
              </span>
              <Button variant="outline" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Poetry Content */}
          <div className="lg:col-span-2">
            {/* Featured Poem */}
            <Card className="mb-8 border-purple-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">{dailyPoem.title}</CardTitle>
                    <p className="text-purple-100 text-lg">by {dailyPoem.author}</p>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Today's Pick
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                {/* Poem Text */}
                <div className="mb-8">
                  <pre className="font-serif text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
                    {dailyPoem.content}
                  </pre>
                </div>

                {/* Poem Details */}
                <div className="bg-purple-50 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">About this poem</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Theme:</span>
                      <p className="text-gray-800">{dailyPoem.theme}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Year:</span>
                      <p className="text-gray-800">{dailyPoem.year}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="font-medium text-gray-600">Background:</span>
                    <p className="text-gray-800 mt-1">{dailyPoem.background}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      <span>{dailyPoem.likes}</span>
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Share2 className="w-5 h-5" />
                      <span>{dailyPoem.shares}</span>
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Read Aloud
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Save to Collection
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Reflection */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  Daily Reflection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Today's Question</h3>
                  <p className="text-gray-700 mb-4">
                    How does Dickinson's metaphor of hope as a bird resonate with your own experiences of hope during difficult times?
                  </p>
                  <Button variant="outline" className="w-full">
                    Share Your Reflection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* This Week's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>This Week's Poetry</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyPoems.map((poem, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${
                        index === 2 
                          ? "bg-purple-100 border-purple-200" 
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                          index === 2 
                            ? "bg-purple-600 text-white" 
                            : "bg-gray-200 text-gray-600"
                        }`}>
                          {poem.day}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{poem.title}</div>
                          <div className="text-xs text-gray-500">{poem.author}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Poetry Streak */}
            <Card>
              <CardHeader>
                <CardTitle>Your Reading Streak</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">7</div>
                <div className="text-sm text-gray-500 mb-4">days in a row</div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <p className="text-sm text-purple-800">
                    Keep it up! You're building a beautiful habit of daily poetry appreciation.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Personalization */}
            <Card>
              <CardHeader>
                <CardTitle>Customize Your Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Poetry Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Reading History
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">47</div>
                    <div className="text-xs text-gray-500">Poems Read</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">12</div>
                    <div className="text-xs text-gray-500">Favorites</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyPoetry;
