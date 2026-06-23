import Message from '../models/Message.js';
import { sendContactNotification } from '../config/email.js';

export const getMessages = async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
};

export const createMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newMessage = await Message.create({ name, email, subject, message });
  await sendContactNotification(newMessage);
  res.status(201).json({ message: 'Message sent successfully' });
};

export const markAsRead = async (req, res) => {
  const msg = await Message.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );
  if (!msg) return res.status(404).json({ message: 'Message not found' });
  res.json(msg);
};

export const deleteMessage = async (req, res) => {
  const msg = await Message.findByIdAndDelete(req.params.id);
  if (!msg) return res.status(404).json({ message: 'Message not found' });
  res.json({ message: 'Message removed' });
};
