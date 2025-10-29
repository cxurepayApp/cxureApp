import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../contexts/axiosConfig";
import {
  Shield,
  Users,
  DollarSign,
  ArrowLeft,
  Plus,
  Wallet,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { AdminUser, EscrowAccount } from "../../types/admin";


/* interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  wallet_balance: number;
  created_at: string;
} */



const AdminDashboard = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [escrowAccounts, setEscrowAccounts] = useState<EscrowAccount[]>([]);
  const [activeTab, setActiveTab] = useState<"users" | "escrow">("users");
  const [loading, setLoading] = useState(true);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [addAmount, setAddAmount] = useState<number>(0);

  useEffect(() => {
    fetchUsers();
    fetchEscrowAccounts();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEscrowAccounts = async () => {
    try {
      const response = await api.get("/admin/escrow");
      setEscrowAccounts(response.data);
    } catch (error) {
      console.error("Error fetching escrow accounts:", error);
    }
  };

  const addFunds = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || addAmount <= 0) return;

    try {
      await api.post("/admin/add-funds", {
        userId: selectedUser.id,
        amount: addAmount,
      });

      setShowAddFunds(false);
      setSelectedUser(null);
      setAddAmount(0);
      fetchUsers();
    } catch (error) {
      console.error("Error adding funds:", error);
    }
  };

  const resolveDispute = async (
    transactionId: number,
    action: "release" | "refund"
  ) => {
    try {
      await api.post("/admin/resolve-dispute", {
        transactionId,
        action,
      });
      fetchEscrowAccounts();
    } catch (error) {
      console.error("Error resolving dispute:", error);
    }
  };

  const totalEscrow = escrowAccounts
    .filter((account) => account.status === "locked")
    .reduce((sum, account) => sum + account.amount, 0);

  const totalUsers = users.length;
  const totalWalletBalance = users.reduce(
    (sum, user) => sum + user.wallet_balance,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CurePay Admin
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage users, escrow accounts, and resolve disputes
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Wallet Balance
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalWalletBalance.toFixed(2)}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Wallet className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Locked in Escrow
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalEscrow.toFixed(2)}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("users")}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "users"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab("escrow")}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "escrow"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Escrow Management
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === "users" ? (
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  User Management
                </h2>
                <button
                  onClick={fetchUsers}
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {user.name}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === "admin"
                              ? "bg-red-100 text-red-800"
                              : user.role === "seller"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{user.email}</span>
                        <span className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>${user.wallet_balance.toFixed(2)}</span>
                        </span>
                        <span>
                          {new Date(user.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowAddFunds(true);
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center space-x-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Funds</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Escrow Management
                </h2>
                <button
                  onClick={fetchEscrowAccounts}
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {escrowAccounts.map((account) => (
                <div
                  key={account.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {account.transaction_title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            account.status === "locked"
                              ? "bg-yellow-100 text-yellow-800"
                              : account.status === "released"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {account.status}
                        </span>
                        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          {account.category}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>${account.amount}</span>
                        </span>
                        <span>Buyer: {account.buyer_name}</span>
                        {account.seller_name && (
                          <span>Seller: {account.seller_name}</span>
                        )}
                        <span>
                          {new Date(account.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    {account.status === "locked" && (
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            resolveDispute(account.transaction_id, "release")
                          }
                          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center space-x-1"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Release</span>
                        </button>
                        <button
                          onClick={() =>
                            resolveDispute(account.transaction_id, "refund")
                          }
                          className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center space-x-1"
                        >
                          <AlertTriangle className="h-4 w-4" />
                          <span>Refund</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Funds Modal */}
      {showAddFunds && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Add Funds</h2>
                <button
                  onClick={() => {
                    setShowAddFunds(false);
                    setSelectedUser(null);
                    setAddAmount(0);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={addFunds} className="p-6 space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Adding funds to:
                  </span>
                  <span className="font-semibold text-gray-900">
                    {selectedUser.name}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-gray-600">
                    Current balance:
                  </span>
                  <span className="font-semibold text-gray-900">
                    ${selectedUser.wallet_balance.toFixed(2)}
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="addAmount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Amount to Add ($)
                </label>
                <input
                  type="number"
                  id="addAmount"
                  required
                  min="0.01"
                  step="0.01"
                  value={addAmount}
                  onChange={(e) =>
                    setAddAmount(parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="0.00"
                />
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddFunds(false);
                    setSelectedUser(null);
                    setAddAmount(0);
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addAmount <= 0}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Add Funds
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
