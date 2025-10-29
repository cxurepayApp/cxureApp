import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SocketProvider } from "./contexts/SocketContext";
import LandingPage from "./components/landing/LandingPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import TransactionDetails from "./components/transactions/TransactionDetails";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import BuyerDashboard from "./components/dashboard/BuyerDashboard";
import SellerDashboard from "./components/dashboard/SellerDashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Role-based Dashboards */}
              <Route
                path="/dashboard/buyer"
                element={
                  <ProtectedRoute>
                    <BuyerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/seller"
                element={
                  <ProtectedRoute>
                    <SellerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Transaction Details (still protected) */}
              <Route
                path="/transaction/:id"
                element={
                  <ProtectedRoute>
                    <TransactionDetails />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
