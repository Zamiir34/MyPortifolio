import { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import AdminLayout from '../../layouts/AdminLayout';
import Modal from '../../components/common/Modal';
import api, { getImageUrl } from '../../services/api';

const emptyForm = {
  name: '',
  description: '',
  technologies: '',
  githubLink: '',
  liveDemoLink: '',
  category: 'Web App',
  featured: false,
};

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);

  const fetchProjects = () => api.get('/projects').then((res) => setProjects(res.data));

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setImage(null);
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setEditing(project);
    setForm({
      name: project.name,
      description: project.description,
      technologies: project.technologies?.join(', ') || '',
      githubLink: project.githubLink,
      liveDemoLink: project.liveDemoLink,
      category: project.category,
      featured: project.featured,
    });
    setImage(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    if (image) formData.append('image', image);

    if (editing) {
      await api.put(`/projects/${editing._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else {
      await api.post('/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    setModalOpen(false);
    fetchProjects();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    await api.delete(`/projects/${id}`);
    fetchProjects();
  };

  return (
    <AdminLayout title="Manage Projects">
      <div className="flex justify-end mb-6">
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm">
          <FaPlus /> Add Project
        </button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project._id} className="glass-card p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <img
              src={getImageUrl(project.image) || 'https://via.placeholder.com/80'}
              alt={project.name}
              className="w-20 h-14 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold">{project.name}</h3>
              <p className="text-sm text-dark-500 truncate">{project.description}</p>
              <span className="text-xs text-primary-500">{project.category}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(project)} className="p-2 rounded-lg hover:bg-primary-500/10 text-primary-500">
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(project._id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Project' : 'Add Project'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Project Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="input-field" />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={3} className="input-field resize-none" />
          <input type="text" placeholder="Technologies (comma separated)" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} className="input-field" />
          <input type="text" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field" />
          <input type="url" placeholder="GitHub Link" value={form.githubLink} onChange={(e) => setForm({ ...form, githubLink: e.target.value })} className="input-field" />
          <input type="url" placeholder="Live Demo Link" value={form.liveDemoLink} onChange={(e) => setForm({ ...form, liveDemoLink: e.target.value })} className="input-field" />
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="input-field" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Featured Project
          </label>
          <button type="submit" className="btn-primary w-full">{editing ? 'Update' : 'Create'}</button>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default ManageProjects;
