
import { useState } from "react";
import { Save, Share2, Eye, PenTool, Type, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PenTool className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Writing Studio
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Draft
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Writing Area */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <Input
                  placeholder="Enter your poem title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-2xl font-bold border-none shadow-none p-0 focus-visible:ring-0"
                />
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Start writing your poem here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={`min-h-[500px] text-${fontSize[0]}px font-${fontFamily} border-none shadow-none resize-none focus-visible:ring-0`}
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
          <div className="space-y-6">
            {/* Writing Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-5 h-5" />
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
                        className={fontFamily === font.value ? "bg-purple-600 hover:bg-purple-700" : ""}
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
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
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
                        <div className="font-medium">{template.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{template.structure}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Word Count */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {content.split(/\s+/).filter(word => word.length > 0).length}
                    </div>
                    <div className="text-sm text-gray-500">Words</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {content.split('\n').filter(line => line.trim().length > 0).length}
                    </div>
                    <div className="text-sm text-gray-500">Lines</div>
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

export default WritingStudio;
