import { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import AdminLayout from '../../layouts/AdminLayout';
import Modal from '../../components/common/Modal';
import api from '../../services/api';

const ManageExperience = () => {
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ company: '', position: '', startDate: '', endDate: 'Present', description: '', order: 0 });

  const fetchItems = () => api.get('/experiences').then((res) => setItems(res.data));

  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ company: '', position: '', startDate: '', endDate: 'Present', description: '', order: 0 });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ company: item.company, position: item.position, startDate: item.startDate, endDate: item.endDate, description: item.description, order: item.order });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) await api.put(`/experiences/${editing._id}`, form);
    else await api.post('/experiences', form);
    setModalOpen(false);
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this experience?')) return;
    await api.delete(`/experiences/${id}`);
    fetchItems();
  };

  return (
    <AdminLayout title="Manage Experience">
      <div className="flex justify-end mb-6">
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm"><FaPlus /> Add Experience</button>
      </div>
      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item._id} className="glass-card p-4 flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{item.position}</h3>
              <p className="text-sm text-primary-500">{item.company}</p>
              <p className="text-xs text-dark-500">{item.startDate} — {item.endDate}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-primary-500/10 text-primary-500"><FaEdit /></button>
              <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Experience' : 'Add Experience'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required className="input-field" />
          <input type="text" placeholder="Position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} required className="input-field" />
          <input type="text" placeholder="Start Date (e.g. 2022-01)" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required className="input-field" />
          <input type="text" placeholder="End Date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="input-field" />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={3} className="input-field resize-none" />
          <button type="submit" className="btn-primary w-full">{editing ? 'Update' : 'Create'}</button>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default ManageExperience;
