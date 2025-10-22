import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../contexts/axiosConfig";
import {
  Shield,
  Wallet,
  TrendingUp,
  CheckCircle,
  LogOut,
  DollarSign,
  MessageCircle,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import WithdrawModal from "./WithdrawModal";

interface Transaction {
  id: number;
  title: string;
  category: string;
  amount: number;
  status: string;
  buyer_name?: string;
  created_at: string;
}

const SellerDashboard: React.FC = () => {
  const { user, logout, refreshUser } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  useEffect(() => {
    fetchTransactions();
    refreshUser();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await api.get(`/transactions/incoming`);
      setTransactions(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching seller transactions:", err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const acceptTransaction = async (id: number) => {
    try {
      await api.post(`/transactions/${id}/accept`);
      fetchTransactions();
    } catch (err) {
      console.error("Error accepting transaction:", err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CXUREPAY
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-sm">Hi, {user?.name}</span>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-red-600 p-2 rounded-md"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Seller Dashboard
          </h1>
          <p className="text-gray-600">
            Manage incoming transactions and payouts
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Wallet Balance
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${user?.wallet_balance?.toFixed(2) ?? "0.00"}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Wallet className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="text-blue-600 hover:text-blue-800 mt-4 text-sm font-medium"
            >
              Withdraw Funds
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Offers
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {transactions.filter((t) => t.status === "pending").length}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Completed Sales
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {transactions.filter((t) => t.status === "completed").length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-xl shadow-sm border">
          {transactions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No transactions yet. Check back later.</p>
            </div>
          ) : (
            transactions.map((t) => (
              <div
                key={t.id}
                className="p-6 flex justify-between items-center hover:bg-gray-50 transition-colors border-b last:border-none"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{t.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        t.status
                      )}`}
                    >
                      {t.status}
                    </span>
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {t.category}
                    </div>
                  </div>
                  <div className="flex space-x-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>${t.amount}</span>
                    </span>
                    {t.buyer_name && <span>Buyer: {t.buyer_name}</span>}
                    <span>{new Date(t.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {t.status === "pending" && (
                    <button
                      onClick={() => acceptTransaction(t.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Accept
                    </button>
                  )}
                  <Link
                    to={`/transaction/${t.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <WithdrawModal
          onClose={() => setShowWithdrawModal(false)}
          onSuccess={() => {
            setShowWithdrawModal(false);
            refreshUser();
          }}
        />
      )}
    </div>
  );
};

export default SellerDashboard;
