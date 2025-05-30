
import { useState, useEffect } from "react";
import { Shield, Plus, Edit, Trash2, RefreshCw, Users, Database, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import BottomNavigation from "@/components/BottomNavigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddSourceOpen, setIsAddSourceOpen] = useState(false);
  const [editingSource, setEditingSource] = useState<any>(null);
  const [newSource, setNewSource] = useState({
    name: "",
    url: "",
    api_endpoint: "",
    is_active: true
  });

  // Check if user is admin
  const { data: adminUser, isLoading: adminLoading } = useQuery({
    queryKey: ["admin-user", user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        console.error('Error checking admin status:', error);
        return null;
      }
      
      return data;
    },
    enabled: !!user,
  });

  // Fetch external poem sources
  const { data: sources = [], isLoading: sourcesLoading } = useQuery({
    queryKey: ["external-sources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('external_poem_sources')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching sources:', error);
        return [];
      }
      
      return data || [];
    },
  });

  // Fetch external poems
  const { data: externalPoems = [], isLoading: poemsLoading } = useQuery({
    queryKey: ["external-poems"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('external_poems')
        .select(`
          *,
          external_poem_sources(name)
        `)
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) {
        console.error('Error fetching external poems:', error);
        return [];
      }
      
      return data || [];
    },
  });

  // Add/Update source mutation
  const addSourceMutation = useMutation({
    mutationFn: async (source: any) => {
      if (editingSource) {
        const { data, error } = await supabase
          .from('external_poem_sources')
          .update(source)
          .eq('id', editingSource.id)
          .single();
        
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('external_poem_sources')
          .insert([source])
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["external-sources"] });
      setIsAddSourceOpen(false);
      setEditingSource(null);
      setNewSource({ name: "", url: "", api_endpoint: "", is_active: true });
      toast({
        title: "Success",
        description: editingSource ? "Source updated successfully" : "Source added successfully",
      });
    },
    onError: (error) => {
      console.error('Error saving source:', error);
      toast({
        title: "Error",
        description: "Failed to save source",
        variant: "destructive",
      });
    },
  });

  // Delete source mutation
  const deleteSourceMutation = useMutation({
    mutationFn: async (sourceId: string) => {
      const { error } = await supabase
        .from('external_poem_sources')
        .delete()
        .eq('id', sourceId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["external-sources"] });
      toast({
        title: "Success",
        description: "Source deleted successfully",
      });
    },
    onError: (error) => {
      console.error('Error deleting source:', error);
      toast({
        title: "Error",
        description: "Failed to delete source",
        variant: "destructive",
      });
    },
  });

  const handleSubmitSource = () => {
    if (!newSource.name || !newSource.url) {
      toast({
        title: "Error",
        description: "Name and URL are required",
        variant: "destructive",
      });
      return;
    }

    addSourceMutation.mutate(newSource);
  };

  const handleEditSource = (source: any) => {
    setEditingSource(source);
    setNewSource({
      name: source.name,
      url: source.url,
      api_endpoint: source.api_endpoint || "",
      is_active: source.is_active
    });
    setIsAddSourceOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddSourceOpen(false);
    setEditingSource(null);
    setNewSource({ name: "", url: "", api_endpoint: "", is_active: true });
  };

  if (adminLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!adminUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Denied</h2>
            <p className="text-gray-600">You don't have admin privileges to access this page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pb-20 md:pb-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {adminUser?.role}
              </Badge>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <Tabs defaultValue="sources" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sources">External Sources</TabsTrigger>
              <TabsTrigger value="poems">External Poems</TabsTrigger>
            </TabsList>

            <TabsContent value="sources" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">External Poem Sources</h2>
                <Dialog open={isAddSourceOpen} onOpenChange={handleCloseDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Source
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingSource ? "Edit Source" : "Add New Source"}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Source Name</Label>
                        <Input
                          id="name"
                          value={newSource.name}
                          onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                          placeholder="e.g., Poetry Foundation"
                        />
                      </div>
                      <div>
                        <Label htmlFor="url">Website URL</Label>
                        <Input
                          id="url"
                          value={newSource.url}
                          onChange={(e) => setNewSource({ ...newSource, url: e.target.value })}
                          placeholder="https://example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="api_endpoint">API Endpoint (Optional)</Label>
                        <Input
                          id="api_endpoint"
                          value={newSource.api_endpoint}
                          onChange={(e) => setNewSource({ ...newSource, api_endpoint: e.target.value })}
                          placeholder="https://api.example.com/poems"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="is_active"
                          checked={newSource.is_active}
                          onCheckedChange={(checked) => setNewSource({ ...newSource, is_active: checked })}
                        />
                        <Label htmlFor="is_active">Active</Label>
                      </div>
                      <Button 
                        onClick={handleSubmitSource}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        disabled={addSourceMutation.isPending}
                      >
                        {addSourceMutation.isPending ? "Saving..." : editingSource ? "Update Source" : "Add Source"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {sourcesLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                  </div>
                ) : sources.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">No sources configured</h3>
                      <p className="text-gray-500">Add your first external poem source to get started.</p>
                    </CardContent>
                  </Card>
                ) : (
                  sources.map((source) => (
                    <Card key={source.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-800">{source.name}</h3>
                              <Badge variant={source.is_active ? "default" : "secondary"}>
                                {source.is_active ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-2">{source.url}</p>
                            {source.api_endpoint && (
                              <p className="text-sm text-purple-600">API: {source.api_endpoint}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-2">
                              Created: {new Date(source.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditSource(source)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteSourceMutation.mutate(source.id)}
                              disabled={deleteSourceMutation.isPending}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="poems" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">External Poems</h2>
                <p className="text-gray-600">{externalPoems.length} poems imported</p>
              </div>

              <div className="space-y-4">
                {poemsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                  </div>
                ) : externalPoems.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <ExternalLink className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">No external poems</h3>
                      <p className="text-gray-500">External poems will appear here once imported from configured sources.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Added</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {externalPoems.map((poem) => (
                        <TableRow key={poem.id}>
                          <TableCell className="font-medium">{poem.title}</TableCell>
                          <TableCell>{poem.author}</TableCell>
                          <TableCell>
                            {poem.external_poem_sources?.name || 'Unknown'}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{poem.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={poem.is_active ? "default" : "secondary"}>
                              {poem.is_active ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(poem.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <BottomNavigation />
      </div>
    </ProtectedRoute>
  );
};

export default Admin;
