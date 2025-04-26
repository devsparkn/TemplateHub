"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type Template = {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  previewUrl: string;
  features: string[];
  techStack: string[];
  isFeatured: boolean;
  isActive: boolean;
};

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Edit dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
  
  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);
  
  // Add dialog state
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Partial<Template>>({
    name: "",
    description: "",
    category: "landing-page",
    price: 0,
    thumbnail: "",
    previewUrl: "",
    features: [],
    techStack: [],
    isFeatured: false,
    isActive: true,
  });
  
  // Form input state
  const [featuresInput, setFeaturesInput] = useState("");
  const [techStackInput, setTechStackInput] = useState("");

  // Load templates
  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/templates");
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch templates");
      }
      
      setTemplates(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error("Failed to load templates");
    } finally {
      setIsLoading(false);
    }
  };

  // Edit template
  const handleEdit = (template: Template) => {
    setCurrentTemplate(template);
    setFeaturesInput(template.features.join(", "));
    setTechStackInput(template.techStack.join(", "));
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!currentTemplate) return;
    
    try {
      // Parse features and techStack from comma-separated input
      const updatedTemplate = {
        ...currentTemplate,
        features: featuresInput.split(",").map(item => item.trim()).filter(Boolean),
        techStack: techStackInput.split(",").map(item => item.trim()).filter(Boolean),
      };
      
      const response = await fetch(`/api/templates/${currentTemplate._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTemplate),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || "Failed to update template");
      }
      
      // Update template in state
      setTemplates(templates.map(t => 
        t._id === currentTemplate._id ? result.data : t
      ));
      
      toast.success("Template updated successfully");
      setEditDialogOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update template");
    }
  };

  // Delete template
  const handleDeleteClick = (id: string) => {
    setTemplateToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!templateToDelete) return;
    
    try {
      const response = await fetch(`/api/templates/${templateToDelete}`, {
        method: "DELETE",
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || "Failed to delete template");
      }
      
      // Remove template from state
      setTemplates(templates.filter(t => t._id !== templateToDelete));
      
      toast.success("Template deleted successfully");
      setDeleteDialogOpen(false);
      setTemplateToDelete(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete template");
    }
  };

  // Add new template
  const handleAddSubmit = async () => {
    try {
      // Parse features and techStack from comma-separated input
      const templateToAdd = {
        ...newTemplate,
        features: featuresInput.split(",").map(item => item.trim()).filter(Boolean),
        techStack: techStackInput.split(",").map(item => item.trim()).filter(Boolean),
      };
      
      const response = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(templateToAdd),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || "Failed to add template");
      }
      
      // Add new template to state
      setTemplates([...templates, result.data]);
      
      toast.success("Template added successfully");
      setAddDialogOpen(false);
      // Reset form
      setNewTemplate({
        name: "",
        description: "",
        category: "landing-page",
        price: 0,
        thumbnail: "",
        previewUrl: "",
        features: [],
        techStack: [],
        isFeatured: false,
        isActive: true,
      });
      setFeaturesInput("");
      setTechStackInput("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add template");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading templates...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
        <p>Error: {error}</p>
        <Button 
          onClick={fetchTemplates} 
          variant="outline" 
          className="mt-2"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className=" px-4 md:px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Templates</h1>
        <Button onClick={() => {
          setAddDialogOpen(true);
          setFeaturesInput("");
          setTechStackInput("");
        }}>
          <Plus className="mr-2 h-4 w-4" /> Add Template
        </Button>
      </div>

      {templates.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">No templates found</p>
          <Button 
            onClick={() => setAddDialogOpen(true)} 
            variant="outline" 
            className="mt-4"
          >
            Add your first template
          </Button>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template._id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell className="capitalize">{template.category.replace('-', ' ')}</TableCell>
                  <TableCell>${template.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs ${
                      template.isActive 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {template.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {template.isFeatured ? (
                      <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        Featured
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-sm">No</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(template)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteClick(template._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit Template Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
            <DialogDescription>
              Update template details and click save when done.
            </DialogDescription>
          </DialogHeader>
          
          {currentTemplate && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  value={currentTemplate.name}
                  onChange={(e) => setCurrentTemplate({
                    ...currentTemplate,
                    name: e.target.value
                  })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Input
                  id="description"
                  value={currentTemplate.description}
                  onChange={(e) => setCurrentTemplate({
                    ...currentTemplate,
                    description: e.target.value
                  })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <select
                  id="category"
                  value={currentTemplate.category}
                  onChange={(e) => setCurrentTemplate({
                    ...currentTemplate,
                    category: e.target.value
                  })}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="landing-page">Landing Page</option>
                  <option value="dashboard">Dashboard</option>
                  <option value="ecommerce">Ecommerce</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="blog">Blog</option>
                </select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={currentTemplate.price}
                  onChange={(e) => setCurrentTemplate({
                    ...currentTemplate,
                    price: parseFloat(e.target.value)
                  })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="thumbnail" className="text-right">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  value={currentTemplate.thumbnail}
                  onChange={(e) => setCurrentTemplate({
                    ...currentTemplate,
                    thumbnail: e.target.value
                  })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="previewUrl" className="text-right">Preview URL</Label>
                <Input
                  id="previewUrl"
                  value={currentTemplate.previewUrl}
                  onChange={(e) => setCurrentTemplate({
                    ...currentTemplate,
                    previewUrl: e.target.value
                  })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="features" className="text-right">Features</Label>
                <Input
                  id="features"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Responsive design, Dark mode, etc. (comma separated)"
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="techStack" className="text-right">Tech Stack</Label>
                <Input
                  id="techStack"
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  placeholder="React, Next.js, Tailwind CSS, etc. (comma separated)"
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Status</Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Checkbox
                    id="isActive"
                    checked={currentTemplate.isActive}
                    onCheckedChange={(checked) => setCurrentTemplate({
                      ...currentTemplate,
                      isActive: checked === true
                    })}
                  />
                  <label
                    htmlFor="isActive"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Active
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Featured</Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Checkbox
                    id="isFeatured"
                    checked={currentTemplate.isFeatured}
                    onCheckedChange={(checked) => setCurrentTemplate({
                      ...currentTemplate,
                      isFeatured: checked === true
                    })}
                  />
                  <label
                    htmlFor="isFeatured"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Featured template
                  </label>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              template from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Template Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Template</DialogTitle>
            <DialogDescription>
              Enter template details and click add when done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-name" className="text-right">Name</Label>
              <Input
                id="new-name"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({
                  ...newTemplate,
                  name: e.target.value
                })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-description" className="text-right">Description</Label>
              <Input
                id="new-description"
                value={newTemplate.description}
                onChange={(e) => setNewTemplate({
                  ...newTemplate,
                  description: e.target.value
                })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-category" className="text-right">Category</Label>
              <select
                id="new-category"
                value={newTemplate.category}
                onChange={(e) => setNewTemplate({
                  ...newTemplate,
                  category: e.target.value
                })}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="landing-page">Landing Page</option>
                <option value="dashboard">Dashboard</option>
                <option value="ecommerce">Ecommerce</option>
                <option value="portfolio">Portfolio</option>
                <option value="blog">Blog</option>
              </select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-price" className="text-right">Price</Label>
              <Input
                id="new-price"
                type="number"
                value={newTemplate.price}
                onChange={(e) => setNewTemplate({
                  ...newTemplate,
                  price: parseFloat(e.target.value)
                })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-thumbnail" className="text-right">Thumbnail URL</Label>
              <Input
                id="new-thumbnail"
                value={newTemplate.thumbnail}
                onChange={(e) => setNewTemplate({
                  ...newTemplate,
                  thumbnail: e.target.value
                })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-previewUrl" className="text-right">Preview URL</Label>
              <Input
                id="new-previewUrl"
                value={newTemplate.previewUrl}
                onChange={(e) => setNewTemplate({
                  ...newTemplate,
                  previewUrl: e.target.value
                })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-features" className="text-right">Features</Label>
              <Input
                id="new-features"
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                placeholder="Responsive design, Dark mode, etc. (comma separated)"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-techStack" className="text-right">Tech Stack</Label>
              <Input
                id="new-techStack"
                value={techStackInput}
                onChange={(e) => setTechStackInput(e.target.value)}
                placeholder="React, Next.js, Tailwind CSS, etc. (comma separated)"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Checkbox
                  id="new-isActive"
                  checked={newTemplate.isActive}
                  onCheckedChange={(checked) => setNewTemplate({
                    ...newTemplate,
                    isActive: checked === true
                  })}
                />
                <label
                  htmlFor="new-isActive"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Active
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Featured</Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Checkbox
                  id="new-isFeatured"
                  checked={newTemplate.isFeatured}
                  onCheckedChange={(checked) => setNewTemplate({
                    ...newTemplate,
                    isFeatured: checked === true
                  })}
                />
                <label
                  htmlFor="new-isFeatured"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Featured template
                </label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSubmit}>Add Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 