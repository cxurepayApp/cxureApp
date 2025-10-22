import express from 'express';
import Message from '../models/Message.js'; // ✅ fixed path
import { authenticateToken } from '../middleware/auth.js'; // ✅ fixed path

const router = express.Router();

// Get messages for a transaction
router.get('/transaction/:id', authenticateToken, async (req, res) => {
  try {
    const transactionId = req.params.id;

    const messages = await Message.find({ transaction: transactionId })
      .populate('sender', 'name')
      .sort({ timestamp: 'asc' });

    res.json(messages);
  } catch {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

export default router;
