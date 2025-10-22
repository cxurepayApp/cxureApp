import express from 'express';
import User from '../models/User.js'; // ✅ fixed
import Transaction from '../models/Transaction.js'; // ✅ fixed
import { authenticateToken, requireAdmin } from '../middleware/auth.js'; // ✅ fixed
import mongoose from 'mongoose';

const router = express.Router();

// Add funds to user wallet
router.post('/add-funds', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { wallet_balance: amount } },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'Funds added successfully', user });
  } catch {
    res.status(500).json({ error: 'Failed to add funds' });
  }
});

// Get all users
router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get escrow accounts
router.get('/escrow', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const escrowAccounts = await Transaction.find({ status: { $in: ['accepted', 'in_dispute'] } })
      .populate('buyer', 'name')
      .populate('seller', 'name')
      .sort({ created_at: -1 });

    res.json(escrowAccounts);
  } catch {
    res.status(500).json({ error: 'Failed to fetch escrow accounts' });
  }
});

// Resolve dispute
router.post('/resolve-dispute', authenticateToken, requireAdmin, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { transactionId, action } = req.body;

    const transaction = await Transaction.findById(transactionId).session(session);
    if (!transaction) {
      await session.abortTransaction();
      return res.status(404).json({ error: 'Transaction not found' });
    }

    if (action === 'release' && transaction.seller) {
      await User.findByIdAndUpdate(transaction.seller, { $inc: { wallet_balance: transaction.escrow_balance } }, { session });
    } else if (action === 'refund') {
      await User.findByIdAndUpdate(transaction.buyer, { $inc: { wallet_balance: transaction.escrow_balance } }, { session });
    } else {
      await session.abortTransaction();
      return res.status(400).json({ error: 'Invalid action' });
    }

    transaction.status = action === 'release' ? 'completed' : 'refunded';
    transaction.escrow_balance = 0;
    await transaction.save({ session });

    await session.commitTransaction();
    res.json({ message: `Dispute resolved: ${action}` });
  } catch {
    await session.abortTransaction();
    res.status(500).json({ error: 'Failed to resolve dispute' });
  } finally {
    session.endSession();
  }
});

export default router;
