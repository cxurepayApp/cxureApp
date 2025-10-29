import React, { useState } from "react";
import api from "../../contexts/axiosConfig";
import { X, Plus, Trash2, Briefcase, Package, Users } from "lucide-react";

interface Milestone {
  title: string;
  description: string;
  amount: number;
}

interface CreateTransactionProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateTransaction: React.FC<CreateTransactionProps> = ({
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    category: "general",
    title: "",
    description: "",
    amount: 0,
  });
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    {
      id: "freelancing",
      name: "Freelancing",
      icon: Briefcase,
      description: "Project-based work with milestones",
    },
    {
      id: "procurement",
      name: "Procurement",
      icon: Package,
      description: "Business purchases and supplies",
    },
    {
      id: "general",
      name: "General Trade",
      icon: Users,
      description: "General transactions and services",
    },
  ];

  const addMilestone = () => {
    setMilestones([...milestones, { title: "", description: "", amount: 0 }]);
  };

  const updateMilestone = (
    index: number,
    field: keyof Milestone,
    value: string | number
  ) => {
    const updated = [...milestones];
    updated[index] = { ...updated[index], [field]: value };
    setMilestones(updated);
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate milestones for freelancing
    if (formData.category === "freelancing" && milestones.length === 0) {
      setError("Freelancing projects require at least one milestone");
      setLoading(false);
      return;
    }

    // Check if milestone amounts add up to total amount
    if (formData.category === "freelancing") {
      const totalMilestoneAmount = milestones.reduce(
        (sum, m) => sum + m.amount,
        0
      );
      if (Math.abs(totalMilestoneAmount - formData.amount) > 0.01) {
        setError("Milestone amounts must add up to the total amount");
        setLoading(false);
        return;
      }
    }

    try {
      const payload = {
        ...formData,
        ...(formData.category === "freelancing" && { milestones }),
      };

      await api.post("/transactions", payload);
      onSuccess();
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to create transaction");
    } finally {
      setLoading(false);
    }
  };

  const totalMilestoneAmount = milestones.reduce((sum, m) => sum + m.amount, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Create Transaction
            </h2>
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

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Category
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, category: category.id });
                      if (category.id !== "freelancing") {
                        setMilestones([]);
                      }
                    }}
                    className={`p-4 border-2 rounded-lg transition-all text-left ${
                      formData.category === category.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <IconComponent className="h-6 w-6 mb-2" />
                    <div className="font-medium">{category.name}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {category.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter transaction title"
              />
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Total Amount ($)
              </label>
              <input
                type="number"
                id="amount"
                required
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Describe the transaction details..."
            />
          </div>

          {/* Milestones (Freelancing Only) */}
          {formData.category === "freelancing" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Milestones
                </label>
                <button
                  type="button"
                  onClick={addMilestone}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Milestone</span>
                </button>
              </div>

              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">
                        Milestone {index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeMilestone(index)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Milestone title"
                        value={milestone.title}
                        onChange={(e) =>
                          updateMilestone(index, "title", e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={milestone.description}
                        onChange={(e) =>
                          updateMilestone(index, "description", e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                      <input
                        type="number"
                        placeholder="Amount"
                        min="0"
                        step="0.01"
                        value={milestone.amount}
                        onChange={(e) =>
                          updateMilestone(
                            index,
                            "amount",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                ))}

                {milestones.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex justify-between text-sm">
                      <span>Total Milestone Amount:</span>
                      <span
                        className={`font-medium ${
                          Math.abs(totalMilestoneAmount - formData.amount) >
                          0.01
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        ${totalMilestoneAmount.toFixed(2)} / $
                        {formData.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
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
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? "Creating..." : "Create Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTransaction;
