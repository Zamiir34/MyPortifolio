import { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import AdminLayout from '../../layouts/AdminLayout';
import Modal from '../../components/common/Modal';
import api from '../../services/api';

const categories = ['Frontend Development', 'Backend Development', 'Database', 'Tools'];

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', category: categories[0], proficiency: 80, order: 0 });

  const fetchSkills = () => api.get('/skills').then((res) => setSkills(res.data));

  useEffect(() => {
    fetchSkills();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', category: categories[0], proficiency: 80, order: 0 });
    setModalOpen(true);
  };

  const openEdit = (skill) => {
    setEditing(skill);
    setForm({ name: skill.name, category: skill.category, proficiency: skill.proficiency, order: skill.order });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await api.put(`/skills/${editing._id}`, form);
    } else {
      await api.post('/skills', form);
    }
    setModalOpen(false);
    fetchSkills();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;
    await api.delete(`/skills/${id}`);
    fetchSkills();
  };

  return (
    <AdminLayout title="Manage Skills">
      <div className="flex justify-end mb-6">
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm">
          <FaPlus /> Add Skill
        </button>
      </div>

      <div className="grid gap-3">
        {skills.map((skill) => (
          <div key={skill._id} className="glass-card p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{skill.name}</h3>
              <p className="text-sm text-dark-500">{skill.category} • {skill.proficiency}%</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(skill)} className="p-2 rounded-lg hover:bg-primary-500/10 text-primary-500"><FaEdit /></button>
              <button onClick={() => handleDelete(skill._id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Skill' : 'Add Skill'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Skill Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="input-field" />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <div>
            <label className="text-sm">Proficiency: {form.proficiency}%</label>
            <input type="range" min="0" max="100" value={form.proficiency} onChange={(e) => setForm({ ...form, proficiency: +e.target.value })} className="w-full" />
          </div>
          <input type="number" placeholder="Order" value={form.order} onChange={(e) => setForm({ ...form, order: +e.target.value })} className="input-field" />
          <button type="submit" className="btn-primary w-full">{editing ? 'Update' : 'Create'}</button>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default ManageSkills;
