import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../contexts/axiosConfig";
import {
  Shield,
  Wallet,
  Plus,
  MessageCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import CreateTransaction from "./CreateTransaction";
import WithdrawModal from "./WithdrawModal";

interface Transaction {
  id: number;
  title: string;
  category: string;
  amount: number;
  status: string;
  buyer_name?: string;
  seller_name?: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const { user, logout, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [marketplaceTransactions, setMarketplaceTransactions] = useState<
    Transaction[]
  >([]);
  const [showCreateTransaction, setShowCreateTransaction] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"my-transactions" | "marketplace">(
    "my-transactions"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
    fetchMarketplaceTransactions();
    refreshUser();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await api.get(`/users/transactions`);
      setTransactions(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMarketplaceTransactions = async () => {
    try {
      const res = await api.get(`/transactions`);
      setMarketplaceTransactions(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching marketplace transactions:", err);
      setMarketplaceTransactions([]);
    }
  };

  const acceptTransaction = async (id: number) => {
    try {
      await api.post(`/transactions/${id}/accept`);
      fetchTransactions();
      fetchMarketplaceTransactions();
    } catch (err) {
      console.error("Error accepting transaction:", err);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "accepted":
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
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
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CurePay
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Admin
                </Link>
              )}
              <div className="text-gray-600 text-sm">Welcome, {user?.name}</div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your transactions and payments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Transactions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {transactions.filter((t) => t.status === "accepted").length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {transactions.filter((t) => t.status === "completed").length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Create Transaction */}
        <button
          onClick={() => setShowCreateTransaction(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 flex items-center space-x-2 mb-8"
        >
          <Plus className="h-5 w-5" />
          <span>Create Transaction</span>
        </button>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("my-transactions")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "my-transactions"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              My Transactions
            </button>
            <button
              onClick={() => setActiveTab("marketplace")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "marketplace"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Marketplace
            </button>
          </nav>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-xl shadow-sm border">
          {(activeTab === "my-transactions"
            ? transactions
            : marketplaceTransactions
          ).length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>
                {activeTab === "my-transactions"
                  ? "No transactions yet."
                  : "No marketplace transactions."}
              </p>
            </div>
          ) : (
            (activeTab === "my-transactions"
              ? transactions
              : marketplaceTransactions
            ).map((t) => (
              <div
                key={t.id}
                className="p-6 hover:bg-gray-50 transition-colors flex justify-between items-center"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{t.title}</h3>
                    {activeTab === "my-transactions" && (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          t.status
                        )}`}
                      >
                        {t.status}
                      </span>
                    )}
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
                    {t.seller_name && <span>Seller: {t.seller_name}</span>}
                    <span>{new Date(t.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {activeTab === "marketplace" && user?.role === "seller" && (
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
                  {activeTab === "my-transactions" && getStatusIcon(t.status)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modals */}
      {showCreateTransaction && (
        <CreateTransaction
          onClose={() => setShowCreateTransaction(false)}
          onSuccess={() => {
            setShowCreateTransaction(false);
            fetchTransactions();
            refreshUser();
          }}
        />
      )}
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

export default Dashboard;
