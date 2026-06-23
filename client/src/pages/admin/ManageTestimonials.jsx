import { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import AdminLayout from '../../layouts/AdminLayout';
import Modal from '../../components/common/Modal';
import api, { getImageUrl } from '../../services/api';

const ManageTestimonials = () => {
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', position: '', review: '', rating: 5, order: 0 });
  const [photo, setPhoto] = useState(null);

  const fetchItems = () => api.get('/testimonials').then((res) => setItems(res.data));

  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', position: '', review: '', rating: 5, order: 0 });
    setPhoto(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ name: item.name, position: item.position, review: item.review, rating: item.rating, order: item.order });
    setPhoto(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    if (photo) formData.append('photo', photo);

    if (editing) {
      await api.put(`/testimonials/${editing._id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    } else {
      await api.post('/testimonials', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    }
    setModalOpen(false);
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    await api.delete(`/testimonials/${id}`);
    fetchItems();
  };

  return (
    <AdminLayout title="Manage Testimonials">
      <div className="flex justify-end mb-6">
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm"><FaPlus /> Add Testimonial</button>
      </div>
      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item._id} className="glass-card p-4 flex gap-4 items-start">
            <img src={getImageUrl(item.photo) || 'https://via.placeholder.com/48'} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-dark-500">{item.position} • {item.rating}/5</p>
              <p className="text-xs text-dark-400 mt-1 line-clamp-2">{item.review}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-primary-500/10 text-primary-500"><FaEdit /></button>
              <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Testimonial' : 'Add Testimonial'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="input-field" />
          <input type="text" placeholder="Position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} required className="input-field" />
          <textarea placeholder="Review" value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} required rows={3} className="input-field resize-none" />
          <div>
            <label className="text-sm">Rating: {form.rating}</label>
            <input type="range" min="1" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: +e.target.value })} className="w-full" />
          </div>
          <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} className="input-field" />
          <button type="submit" className="btn-primary w-full">{editing ? 'Update' : 'Create'}</button>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default ManageTestimonials;
