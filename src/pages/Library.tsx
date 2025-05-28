
import { useState } from "react";
import { Search, Filter, BookOpen, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Library = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all", "classic", "modern", "romantic", "nature", "spiritual", "social"
  ];

  const poems = [
    {
      id: 1,
      title: "The Road Not Taken",
      author: "Robert Frost",
      category: "classic",
      excerpt: "Two roads diverged in a yellow wood, And sorry I could not travel both...",
      likes: 1247,
      tags: ["nature", "choice", "life"]
    },
    {
      id: 2,
      title: "Still I Rise",
      author: "Maya Angelou",
      category: "modern",
      excerpt: "You may write me down in history With your bitter, twisted lies...",
      likes: 2103,
      tags: ["empowerment", "resilience", "social"]
    },
    {
      id: 3,
      title: "How Do I Love Thee?",
      author: "Elizabeth Barrett Browning",
      category: "romantic",
      excerpt: "How do I love thee? Let me count the ways...",
      likes: 1876,
      tags: ["love", "sonnet", "classic"]
    },
    {
      id: 4,
      title: "The Guest House",
      author: "Rumi",
      category: "spiritual",
      excerpt: "This being human is a guest house. Every morning a new arrival...",
      likes: 956,
      tags: ["wisdom", "acceptance", "spiritual"]
    }
  ];

  const filteredPoems = poems.filter(poem => {
    const matchesSearch = poem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         poem.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || poem.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Poetry Library
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search poems, authors..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Advanced Filter
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredPoems.length} poem{filteredPoems.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Poems Grid */}
        <div className="grid gap-6">
          {filteredPoems.map((poem) => (
            <Card key={poem.id} className="hover:shadow-lg transition-all duration-300 border-purple-100">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-800 mb-2">
                      {poem.title}
                    </CardTitle>
                    <p className="text-purple-600 font-medium">by {poem.author}</p>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    {poem.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {poem.excerpt}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {poem.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600">
                      <Heart className="w-4 h-4" />
                      {poem.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Read Full Poem
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Poems
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Library;
