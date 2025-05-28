
import { useState } from "react";
import { Save, Share2, Eye, PenTool, Type, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import BottomNavigation from "@/components/BottomNavigation";

const WritingStudio = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fontSize, setFontSize] = useState([16]);
  const [fontFamily, setFontFamily] = useState("serif");

  const fontOptions = [
    { value: "serif", name: "Serif" },
    { value: "sans", name: "Sans Serif" },
    { value: "mono", name: "Monospace" },
    { value: "cursive", name: "Cursive" }
  ];

  const templates = [
    { name: "Sonnet", structure: "14 lines, ABAB CDCD EFEF GG rhyme scheme" },
    { name: "Haiku", structure: "3 lines, 5-7-5 syllable pattern" },
    { name: "Free Verse", structure: "No formal constraints" },
    { name: "Limerick", structure: "5 lines, AABBA rhyme scheme" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PenTool className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Writing Studio
              </h1>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2 text-sm">
                <Eye className="w-4 h-4" />
                <span className="hidden lg:inline">Preview</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 text-sm">
                <Save className="w-4 h-4" />
                <span className="hidden lg:inline">Save</span>
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2 text-sm">
                <Share2 className="w-4 h-4" />
                <span className="hidden lg:inline">Publish</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Writing Area */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader className="pb-3 sm:pb-4">
                <Input
                  placeholder="Enter your poem title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg sm:text-2xl font-bold border-none shadow-none p-0 focus-visible:ring-0"
                />
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Start writing your poem here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[400px] sm:min-h-[500px] border-none shadow-none resize-none focus-visible:ring-0 text-sm sm:text-base"
                  style={{ 
                    fontSize: `${fontSize[0]}px`,
                    fontFamily: fontFamily === 'serif' ? 'serif' : 
                               fontFamily === 'sans' ? 'sans-serif' :
                               fontFamily === 'mono' ? 'monospace' : 'cursive'
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Mobile Action Buttons */}
            <div className="flex sm:hidden gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                <Share2 className="w-4 h-4 mr-1" />
                Publish
              </Button>
            </div>

            {/* Writing Tools */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Type className="w-4 h-4 sm:w-5 sm:h-5" />
                  Typography
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Font Size</Label>
                  <Slider
                    value={fontSize}
                    onValueChange={setFontSize}
                    max={24}
                    min={12}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">{fontSize[0]}px</div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">Font Family</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {fontOptions.map((font) => (
                      <Button
                        key={font.value}
                        variant={fontFamily === font.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFontFamily(font.value)}
                        className={`text-xs ${fontFamily === font.value ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                      >
                        {font.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Templates */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
                  Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {templates.map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-3"
                    >
                      <div>
                        <div className="font-medium text-sm">{template.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{template.structure}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Word Count */}
            <Card>
              <CardContent className="pt-4 sm:pt-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-purple-600">
                      {content.split(/\s+/).filter(word => word.length > 0).length}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">Words</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-purple-600">
                      {content.split('\n').filter(line => line.trim().length > 0).length}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">Lines</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default WritingStudio;
