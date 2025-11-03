import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Store } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { type RegisterData } from "../types/register";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  /* const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    tel: "",
    address: "",
    userTag: "",
    userImg: null,
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    securityAnswer: "",
    twoFactorEnabled: false,
    role: "buyer",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate confirm password

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    // Error handling

    try {
      const user = await register(
        formData.name,
        formData.email,
        formData.password!,
        formData.role
      );
      navigate(`/dashboard/${user.role}`);
    } catch (err: any) {
      let message = "Registration failed. Please try again.";

      if (err.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.message === "Network Error") {
        message =
          "Cannot connect to server. Check your internet or try again later.";
      }

      setError(message);

      //  auto-hide error message 
      setTimeout(() => setError(""), 3500);
    } finally {
      setLoading(false);
    }
  }; */

  const {data, updateData} = useRegister()
  const navigate = useNavigate()

  

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-2">Join the secure payment platform</p>
        </div>

        {/* {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )} */}

        <form /* onSubmit={handleSubmit} */  className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 border rounded-lg"
            value=/* {formData.name} */ {data.name }
            onChange={(e) => /* setFormData */updateData({ /* ...formData */name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg"
            value=/* {formData.email} */ {data.email }
            onChange={(e) =>
              /* setFormData */updateData({ /* ...formData,  */email: e.target.value })
            }
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-4 py-3 border rounded-lg"
            value=/* {formData.tel} */ {data.tel }
            onChange={(e) => /* setFormData */updateData({ /* ...formData, */ tel: e.target.value })}
            required
          />

          <input 
            type="text" 
            placeholder="Address" 
            className="w-full px-4 py-3 border rounded-lg"
            value={data.address}
            onChange={e => updateData({address: e.target.value})}
            required
            />

          <input 
            type="text" 
            placeholder="User Tag" 
            className="w-full px-4 py-3 border rounded-lg"
            value={data.userTag}
            onChange={e => updateData({userTag: e.target.value})}
            required
            />


          {/* Password */}
          {/* <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg pr-10"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div> */}

          {/* Confirm Password */}
          {/* <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full px-4 py-3 border rounded-lg"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
          /> */}

          {/* Role Selection */}
          <div className="flex gap-4 mt-2">
            <button
              type="button"
              onClick={() => /* setFormData */updateData({ /* ...formData, */ role: "buyer" })}
              className={`flex-1 border px-4 py-3 rounded-lg flex items-center justify-center gap-2 ${
                /* formData */data.role === "buyer"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <User className="h-4 w-4" /> Buyer
            </button>

            <button
              type="button"
              onClick={() => /* setFormData */updateData({ /* ...formData, */ role: "seller" })}
              className={`flex-1 border px-4 py-3 rounded-lg flex items-center justify-center gap-2 ${
                /* formData */data.role === "seller"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <Store className="h-4 w-4" /> Seller
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            /* disabled={loading} */
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg mt-4 disabled:opacity-50"
            onClick={()=> navigate('/auth/register2')}
          >
            {/* {loading ? "Creating..." : "Create Account"} */} Continue
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-600 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
