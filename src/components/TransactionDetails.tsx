import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../contexts/axiosConfig";
import {
  ArrowLeft,
  Shield,
  MessageCircle,
  DollarSign,
  Clock,
  CheckCircle,
  Send,
  AlertTriangle,
  User,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useSocket } from "../contexts/SocketContext";

interface Transaction {
  id: number;
  title: string;
  description: string;
  category: string;
  amount: number;
  status: string;
  buyer_id: number;
  seller_id: number;
  buyer_name: string;
  seller_name: string;
  escrow_balance: number;
  created_at: string;
  milestones?: Milestone[];
}

interface Milestone {
  id: number;
  title: string;
  description: string;
  amount: number;
  status: string;
}

interface Message {
  id: number;
  sender_id: number;
  sender_name: string;
  message: string;
  timestamp: string;
}

const TransactionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { socket } = useSocket();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTransaction();
    fetchMessages();

    if (socket && id) {
      socket.emit("join_transaction", id);

      socket.on("new_message", (message: Message) => {
        setMessages((prev) => [...prev, message]);
      });

      return () => {
        socket.off("new_message");
      };
    }
  }, [socket, id]);

  const fetchTransaction = async () => {
    try {
      const response = await api.get(`/transactions/${id}`);
      setTransaction(response.data);
    } catch (error: any) {
      setError("Failed to fetch transaction details");
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await api.get(`/chat/transaction/${id}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || !user) return;

    socket.emit("send_message", {
      transactionId: id,
      senderId: user.id,
      message: newMessage,
    });

    setNewMessage("");
  };

  const releaseEscrow = async () => {
    try {
      await api.post(`/transactions/${id}/release`);
      fetchTransaction();
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to release funds");
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "accepted":
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Shield className="h-5 w-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 mx-auto text-red-500 mb-4" />
          <p className="text-xl text-gray-600">
            {error || "Transaction not found"}
          </p>
          <Link
            to="/dashboard"
            className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const isBuyer = user?.id === transaction.buyer_id;
  const isSeller = user?.id === transaction.seller_id;
  const canRelease =
    isBuyer &&
    transaction.status === "accepted" &&
    transaction.escrow_balance > 0;

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
                CurePay
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transaction Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {transaction.title}
                  </h1>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {transaction.status}
                    </span>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {transaction.category}
                    </div>
                  </div>
                </div>
                {getStatusIcon(transaction.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-lg font-semibold">
                        ${transaction.amount}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Escrow Balance</p>
                      <p className="text-lg font-semibold">
                        ${transaction.escrow_balance}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Buyer</p>
                      <p className="font-medium">{transaction.buyer_name}</p>
                    </div>
                  </div>
                  {transaction.seller_name && (
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Seller</p>
                        <p className="font-medium">{transaction.seller_name}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {transaction.description && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600">{transaction.description}</p>
                </div>
              )}

              {/* Milestones */}
              {transaction.milestones && transaction.milestones.length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Milestones
                  </h3>
                  <div className="space-y-3">
                    {transaction.milestones.map((milestone, index) => (
                      <div
                        key={milestone.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">
                            Milestone {index + 1}: {milestone.title}
                          </h4>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                              milestone.status
                            )}`}
                          >
                            {milestone.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {milestone.description}
                        </p>
                        <p className="text-sm font-medium">
                          ${milestone.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {canRelease && (
                <div className="border-t pt-6">
                  <button
                    onClick={releaseEscrow}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Release Escrow Funds
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Chat */}
          <div className="bg-white rounded-xl shadow-sm border flex flex-col h-[600px]">
            <div className="p-4 border-b flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-gray-400" />
              <h3 className="font-semibold text-gray-900">Chat</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender_id === user?.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender_id === user?.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender_id === user?.id
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        {message.sender_name} •{" "}
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={sendMessage} className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
