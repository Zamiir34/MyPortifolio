import { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import AdminLayout from '../../layouts/AdminLayout';
import Modal from '../../components/common/Modal';
import api from '../../services/api';

const ManageEducation = () => {
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ university: '', degree: '', graduationYear: '', description: '', order: 0 });

  const fetchItems = () => api.get('/education').then((res) => setItems(res.data));

  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ university: '', degree: '', graduationYear: '', description: '', order: 0 });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ university: item.university, degree: item.degree, graduationYear: item.graduationYear, description: item.description, order: item.order });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) await api.put(`/education/${editing._id}`, form);
    else await api.post('/education', form);
    setModalOpen(false);
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this education entry?')) return;
    await api.delete(`/education/${id}`);
    fetchItems();
  };

  return (
    <AdminLayout title="Manage Education">
      <div className="flex justify-end mb-6">
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm"><FaPlus /> Add Education</button>
      </div>
      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item._id} className="glass-card p-4 flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{item.degree}</h3>
              <p className="text-sm text-primary-500">{item.university}</p>
              <p className="text-xs text-dark-500">{item.graduationYear}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-primary-500/10 text-primary-500"><FaEdit /></button>
              <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Education' : 'Add Education'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="University" value={form.university} onChange={(e) => setForm({ ...form, university: e.target.value })} required className="input-field" />
          <input type="text" placeholder="Degree" value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} required className="input-field" />
          <input type="text" placeholder="Graduation Year" value={form.graduationYear} onChange={(e) => setForm({ ...form, graduationYear: e.target.value })} required className="input-field" />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="input-field resize-none" />
          <button type="submit" className="btn-primary w-full">{editing ? 'Update' : 'Create'}</button>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default ManageEducation;
