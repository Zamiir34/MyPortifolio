import { useEffect, useState } from 'react';
import { FaTrash, FaEnvelopeOpen, FaEnvelope } from 'react-icons/fa';
import AdminLayout from '../../layouts/AdminLayout';
import api from '../../services/api';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchMessages = () => api.get('/messages').then((res) => setMessages(res.data));

  useEffect(() => { fetchMessages(); }, []);

  const handleRead = async (id) => {
    await api.put(`/messages/${id}/read`);
    fetchMessages();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    await api.delete(`/messages/${id}`);
    setSelected(null);
    fetchMessages();
  };

  return (
    <AdminLayout title="Contact Messages">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          {messages.length === 0 ? (
            <p className="text-dark-500 text-center py-8">No messages yet.</p>
          ) : (
            messages.map((msg) => (
              <button
                key={msg._id}
                onClick={() => { setSelected(msg); if (!msg.read) handleRead(msg._id); }}
                className={`w-full text-left glass-card p-4 transition-all ${
                  selected?._id === msg._id ? 'ring-2 ring-primary-500' : ''
                } ${!msg.read ? 'border-l-4 border-primary-500' : ''}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-sm">{msg.name}</h3>
                  {msg.read ? <FaEnvelopeOpen className="text-dark-400 w-3 h-3" /> : <FaEnvelope className="text-primary-500 w-3 h-3" />}
                </div>
                <p className="text-xs text-dark-500">{msg.subject}</p>
                <p className="text-xs text-dark-400 mt-1">{new Date(msg.createdAt).toLocaleDateString()}</p>
              </button>
            ))
          )}
        </div>

        <div className="glass-card p-6">
          {selected ? (
            <>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">{selected.name}</h3>
                  <a href={`mailto:${selected.email}`} className="text-sm text-primary-500">{selected.email}</a>
                </div>
                <button onClick={() => handleDelete(selected._id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500">
                  <FaTrash />
                </button>
              </div>
              <p className="text-sm font-medium mb-2">Subject: {selected.subject}</p>
              <p className="text-sm text-dark-600 dark:text-dark-400 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              <p className="text-xs text-dark-500 mt-4">{new Date(selected.createdAt).toLocaleString()}</p>
            </>
          ) : (
            <p className="text-dark-500 text-center py-12">Select a message to view</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageMessages;
