import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SocketProvider } from "./contexts/SocketContext";
import { lazy, Suspense } from "react";
import { RouteSkeleton } from "./components/UI/RouteSkeleton";
import { RegisterProvider } from "./contexts/RegisterContext";

// Lazy-loaded components
const AuthLayout = lazy(() => import("./components/layout/AuthLayout"));
const LandingPage = lazy(() => import("./pages/landing/LandingPage"));
const Login = lazy(() => import("./auth/Login"));
const Register = lazy(() => import("./auth/Register"));
const RegisterPage2 = lazy(() => import("./auth/RegisterPage2"));
const TransactionDetails = lazy(() => import("./pages/transactions/TransactionDetails"));
const AdminDashboard = lazy(() => import("./pages/dashboard/AdminDashboard"));
const BuyerDashboard = lazy(() => import("./pages/dashboard/BuyerDashboard"));
const SellerDashboard = lazy(() => import("./pages/dashboard/SellerDashboard"));
const ProtectedRoute = lazy(() => import("./auth/ProtectedRoute"));

// Function to create fallback UI
const createFallback = (title: string, description: string) => (
  <RouteSkeleton title={title} description={description} />
);

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <RegisterProvider>
          <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Suspense
              fallback={createFallback(
                "Loading page",
                "Please wait while we load your content..."
              )}
            >
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />

                {/* Auth layout with nested routes */}
                <Route
                  path="/auth"
                  element={
                    <Suspense
                      fallback={createFallback(
                        "Loading onboarding workspace",
                        "Hang tight while page is loading."
                      )}
                    >
                      <AuthLayout />
                    </Suspense>
                  }
                >
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="register2" element ={<RegisterPage2/>} />
                </Route>

                {/* Protected dashboards */}
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

                {/* Protected transaction details */}
                <Route
                  path="/transaction/:id"
                  element={
                    <ProtectedRoute>
                      <TransactionDetails />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Suspense>
          </div>
        </Router>
        </RegisterProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
