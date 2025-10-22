import express from 'express';
import Transaction from '../models/Transaction.js'; // ✅ fixed path
import User from '../models/User.js'; // ✅ fixed path
import { authenticateToken } from '../middleware/auth.js'; // ✅ fixed path
import mongoose from 'mongoose';

const router = express.Router();

// Create transaction
router.post('/', authenticateToken, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { category, title, description, amount, milestones } = req.body;
    const buyerId = req.user.userId;

    const buyer = await User.findById(buyerId).session(session);
    if (!buyer || buyer.wallet_balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    buyer.wallet_balance -= amount;
    await buyer.save({ session });

    const newTransaction = new Transaction({
      buyer: buyerId,
      category,
      title,
      description,
      amount,
      escrow_balance: amount,
      milestones: category === 'freelancing' && milestones ? milestones : [],
    });
    await newTransaction.save({ session });

    await session.commitTransaction();

    res.status(201).json({
      message: 'Transaction created successfully',
      transactionId: newTransaction._id,
    });
  } catch {
    await session.abortTransaction();
    res.status(500).json({ error: 'Failed to create transaction' });
  } finally {
    session.endSession();
  }
});

// Get transaction details
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('buyer', 'name')
      .populate('seller', 'name');

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch {
    res.status(500).json({ error: 'Failed to fetch transaction' });
  }
});

// Accept transaction (seller)
router.post('/:id/accept', authenticateToken, async (req, res) => {
  try {
    const transactionId = req.params.id;
    const sellerId = req.user.userId;

    const result = await Transaction.findOneAndUpdate(
      { _id: transactionId, status: 'pending' },
      { seller: sellerId, status: 'accepted' },
      { new: true }
    );

    if (!result) {
      return res.status(400).json({ error: 'Cannot accept this transaction' });
    }

    res.json({ message: 'Transaction accepted successfully' });
  } catch {
    res.status(500).json({ error: 'Failed to accept transaction' });
  }
});

// Release funds (buyer)
router.post('/:id/release', authenticateToken, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const transactionId = req.params.id;
    const buyerId = req.user.userId;

    const transaction = await Transaction.findOne({
      _id: transactionId,
      buyer: buyerId,
    }).session(session);

    if (!transaction || !transaction.seller) {
      await session.abortTransaction();
      return res.status(400).json({ error: 'Cannot release funds for this transaction' });
    }

    await User.findByIdAndUpdate(
      transaction.seller,
      { $inc: { wallet_balance: transaction.escrow_balance } },
      { session }
    );

    transaction.status = 'completed';
    transaction.escrow_balance = 0;
    await transaction.save({ session });

    await session.commitTransaction();

    res.json({ message: 'Funds released successfully' });
  } catch {
    await session.abortTransaction();
    res.status(500).json({ error: 'Failed to release funds' });
  } finally {
    session.endSession();
  }
});

// Get all pending transactions
router.get('/', authenticateToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      status: 'pending',
      seller: { $exists: false },
    })
      .populate('buyer', 'name')
      .sort({ created_at: -1 });

    res.json(transactions);
  } catch {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

export default router;
