"use client";

import { useState, useEffect, useRef } from "react";

interface Project {
  _id?: string;
  name: string;
  description: string;
  image?: string;
}

export default function HomepageManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string>(""); // base64 or URL
  const [editingId, setEditingId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch projects
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then(setProjects)
      .catch((err) => console.error("Error fetching projects:", err));
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

    const projectData = { name, description, image };

    try {
      if (editingId) {
        // Update
        const res = await fetch(`/api/projects/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
        const updated = await res.json();
        setProjects(projects.map((p) => (p._id === editingId ? updated : p)));
        setEditingId(null);
      } else {
        // Create
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
        const newProject = await res.json();
        setProjects([...projects, newProject]);
      }

      // Reset form
      setName("");
      setDescription("");
      setImage("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  // Edit
  const handleEdit = (project: Project) => {
    setName(project.name);
    setDescription(project.description);
    setImage(project.image || "");
    setEditingId(project._id || null);
  };

  // Delete
  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      setProjects(projects.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Homepage Manager</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-2 rounded"
        />

        {/* Image Preview */}
        {image && (
          <img
            src={image}
            alt="Preview"
            className="w-40 h-28 object-cover mt-2 rounded border"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
        >
          {editingId ? "Update Project" : "Add Project"}
        </button>
      </form>

      {/* Project List */}
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj._id}
            className="border rounded-lg shadow bg-white p-4 flex flex-col"
          >
            {proj.image && (
              <img
                src={proj.image}
                alt={proj.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}
            <h2 className="text-xl font-semibold">{proj.name}</h2>
            <p className="text-gray-600 mb-3">{proj.description}</p>
            <div className="mt-auto flex gap-2">
              <button
                onClick={() => handleEdit(proj)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(proj._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
