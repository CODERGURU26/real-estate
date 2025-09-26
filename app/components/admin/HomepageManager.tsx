"use client";

import { useState, useEffect, useRef } from "react";

interface Project {
  _id?: string;
  title: string; // Changed from 'name' to 'title' to match your backend
  description: string;
  image?: string;
}

export default function HomepageManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState(""); // Changed from 'name' to 'title'
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string>(""); // base64 or URL
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching projects...");
        const res = await fetch("/api/projects");
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log("Fetched projects:", data);
        
        // ✅ Fixed: Your backend returns data directly, not wrapped in success/data
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error("Unexpected data format:", data);
          setError("Unexpected data format received");
          setProjects([]);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch projects");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Handle image file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // base64 string for preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Add or Update Project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // ✅ Fixed: Use 'title' instead of 'name' to match backend
    const projectData = { title, description, image };

    try {
      if (editingId) {
        // Update
        console.log("Updating project:", editingId, projectData);
        const res = await fetch(`/api/projects/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
        }
        
        const updatedProject = await res.json();
        console.log("Updated project:", updatedProject);
        
        // ✅ Fixed: Backend returns project directly
        setProjects(projects.map((p) => (p._id === editingId ? updatedProject : p)));
        setEditingId(null);
      } else {
        // Create
        console.log("Creating project:", projectData);
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
        }
        
        const newProject = await res.json();
        console.log("Created project:", newProject);
        
        // ✅ Fixed: Backend returns project directly
        setProjects([...projects, newProject]);
      }

      // Reset form
      setTitle("");
      setDescription("");
      setImage("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      
    } catch (error) {
      console.error("Error saving project:", error);
      setError(error instanceof Error ? error.message : "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  // Edit
  const handleEdit = (project: Project) => {
    setTitle(project.title); // ✅ Fixed: Use 'title'
    setDescription(project.description);
    setImage(project.image || "");
    setEditingId(project._id || null);
  };

  // Delete
  const handleDelete = async (id?: string) => {
    if (!id) return;
    
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }
    
    setLoading(true);
    try {
      console.log("Deleting project:", id);
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }
      
      const result = await res.json();
      console.log("Delete result:", result);
      
      // ✅ Remove from local state
      setProjects(projects.filter((p) => p._id !== id));
      
    } catch (error) {
      console.error("Error deleting project:", error);
      setError(error instanceof Error ? error.message : "Failed to delete project");
    } finally {
      setLoading(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setImage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setError(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Homepage Manager</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          Loading...
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Project Name"
          value={title} // ✅ Fixed: Use 'title'
          onChange={(e) => setTitle(e.target.value)} // ✅ Fixed: Use 'setTitle'
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={loading}
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          required
          disabled={loading}
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />

        {/* Image Preview */}
        {image && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
            <img
              src={image}
              alt="Preview"
              className="w-40 h-28 object-cover rounded border shadow-sm"
            />
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors disabled:bg-blue-300"
            disabled={loading || !(title?.trim()) || !(description?.trim())}
          >
            {loading ? "Saving..." : editingId ? "Update Project" : "Add Project"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Project List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Projects ({projects.length})
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj._id}
              className="border rounded-lg shadow-sm bg-white p-4 flex flex-col hover:shadow-md transition-shadow"
            >
              {proj.image && (
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-40 object-cover rounded mb-3"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{proj.description}</p>
              
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => handleEdit(proj)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition-colors disabled:bg-yellow-300"
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(proj._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors disabled:bg-red-300"
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
              
              {/* Debug info in development */}
              {process.env.NODE_ENV === 'development' && (
                <div className="text-xs text-gray-400 mt-2 p-1 bg-gray-50 rounded">
                  ID: {proj._id}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {projects.length === 0 && !loading && !error && (
        <div className="text-center text-gray-500 mt-8 py-12 bg-gray-50 rounded-lg">
          <p className="text-lg mb-2">No projects found</p>
          <p className="text-sm">Add your first project using the form above!</p>
        </div>
      )}
    </div>
  );
}