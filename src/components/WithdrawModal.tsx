import React, { useState } from "react";
import api from "../contexts/axiosConfig";
import { X, Wallet, Building } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface WithdrawModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const { user } = useAuth();
  const [amount, setAmount] = useState<number>(0);
  const [method, setMethod] = useState<"nexiton" | "bank">("nexiton");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (amount <= 0) {
      setError("Please enter a valid amount");
      setLoading(false);
      return;
    }

    if (amount > (user?.wallet_balance || 0)) {
      setError("Insufficient balance");
      setLoading(false);
      return;
    }

    try {
      await api.post("/users/withdraw", {
        amount,
        method,
      });
      onSuccess();
    } catch (error: any) {
      setError(error.response?.data?.error || "Withdrawal failed");
    } finally {
      setLoading(false);
    }
  };

  const fee = method === "bank" ? amount * 0.02 : 0;
  const finalAmount = amount - fee;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Withdraw Funds</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Available Balance:</span>
              <span className="text-lg font-semibold text-gray-900">
                ${user?.wallet_balance?.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Withdrawal Amount ($)
            </label>
            <input
              type="number"
              id="amount"
              required
              min="0.01"
              max={user?.wallet_balance || 0}
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Withdrawal Method
            </label>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setMethod("nexiton")}
                className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                  method === "nexiton"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Wallet className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Nexiton Wallet</div>
                    <div className="text-sm text-gray-500">
                      Instant transfer • No fees
                    </div>
                  </div>
                  {method === "nexiton" && (
                    <div className="text-green-600 font-medium">FREE</div>
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMethod("bank")}
                className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                  method === "bank"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Building className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Local Bank Account</div>
                    <div className="text-sm text-gray-500">
                      1-3 business days • 2% fee
                    </div>
                  </div>
                  {method === "bank" && (
                    <div className="text-orange-600 font-medium">2% FEE</div>
                  )}
                </div>
              </button>
            </div>
          </div>

          {amount > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Withdrawal Amount:</span>
                <span>${amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Fee:</span>
                <span>${fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold border-t border-gray-300 pt-2">
                <span>You'll Receive:</span>
                <span>${finalAmount.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || amount <= 0}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? "Processing..." : "Withdraw Funds"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawModal;
