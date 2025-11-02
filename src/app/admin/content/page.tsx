'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Content } from '@/lib/database';
import AdminLayout from '@/components/AdminLayout';

export default function ContentPage() {
  const { isLoaded, isSignedIn } = useUser();
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [formData, setFormData] = useState({
    page: '',
    section: '',
    title: '',
    content: '',
    image_url: ''
  });

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchContent();
    }
  }, [isLoaded, isSignedIn]);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingContent ? `/api/content/${editingContent.id}` : '/api/content';
      const method = editingContent ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchContent();
        setShowForm(false);
        setEditingContent(null);
        setFormData({ page: '', section: '', title: '', content: '', image_url: '' });
      }
    } catch (error) {
      console.error('Failed to save content:', error);
    }
  };

  const handleEdit = (contentItem: Content) => {
    setEditingContent(contentItem);
    setFormData({
      page: contentItem.page,
      section: contentItem.section,
      title: contentItem.title || '',
      content: contentItem.content || '',
      image_url: contentItem.image_url || ''
    });
    setShowForm(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const { url } = await response.json();
        setFormData(prev => ({ ...prev, image_url: url }));
      }
    } catch (error) {
      console.error('Failed to upload file:', error);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return <div className="p-8">Please sign in to access this page.</div>;
  }

  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.page]) {
      acc[item.page] = [];
    }
    acc[item.page].push(item);
    return acc;
  }, {} as Record<string, Content[]>);

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Content</h1>
            <p className="text-gray-600">Manage your website content and pages</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          >
            {showForm ? 'Cancel' : '+ Add Content'}
          </button>
        </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingContent ? 'Edit Content' : 'Add New Content'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Page (e.g., home, about, services)"
              value={formData.page}
              onChange={(e) => setFormData({ ...formData, page: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Section (e.g., hero, features, testimonials)"
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-2 border rounded"
              rows={6}
            />
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full p-2 border rounded mb-2"
              />
              {formData.image_url && (
                <img src={formData.image_url} alt="Preview" className="w-32 h-32 object-cover rounded" />
              )}
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              {editingContent ? 'Update Content' : 'Create Content'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div>Loading content...</div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedContent).map(([page, pageContent]) => (
            <div key={page} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 capitalize">{page} Page</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pageContent.map((item) => (
                  <div key={item.id} className="border p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">{item.section}</h3>
                    {item.title && <h4 className="text-md font-medium mb-2">{item.title}</h4>}
                    {item.content && <p className="text-gray-600 mb-2">{item.content}</p>}
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.title || item.section}
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                    )}
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </AdminLayout>
  );
}