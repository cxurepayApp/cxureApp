import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  amount: { type: Number, required: true },
  status: { type: String, default: 'pending' }, // pending, released, refunded
  created_at: { type: Date, default: Date.now },
});

const transactionSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: String, required: true }, // e.g., 'freelancing', 'ecommerce'
  title: { type: String, required: true },
  description: String,
  amount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'in_progress', 'in_dispute', 'completed', 'refunded'], 
    default: 'pending' 
  },
  escrow_balance: { type: Number, default: 0 },
  milestones: [milestoneSchema],
  created_at: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
