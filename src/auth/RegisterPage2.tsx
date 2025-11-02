import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff} from "lucide-react";

export default function RegisterPage2(){
    const navigate = useNavigate()
    const {data, updateData, clearData} = useRegister()

    const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const [image, setImage] = useState("/images/general.svg")

  const { register } = useAuth();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate confirm password

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    // Error handling

    try {
      const user = await register(
        data.name!,
        data.email!,
        data.password!,
        data.role! 
      );

      clearData()
     
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
  };

  
    return(
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
              <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                <Link to='/auth/register' className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 border rounded-lg text-white mb-6"><ArrowLeft/> Back</Link>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                  <p className="text-gray-600 mt-2">Join the secure payment platform</p>
                </div>
        
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                    {error}
                  </div>
                )}
        
                <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-6">
                    <div className="w-32 h-32 rounded-full border flex items-center justify-center bg-slate-300 overflow-hidden">
                        <img src={image} className="object-cover w-full" />
                    </div>
                    <label className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 border rounded-lg text-white mb-6" >
                    Upload a profile picture
                    <input 
                    className="hidden"
                     type="file"
                     accept="image/*"  
                     onChange={e => {
                        if(e.target.files && e.target.files[0]){
                            updateData({userImg: e.target.files[0]})

                            //For previewing
                            const objectURL = URL.createObjectURL(e.target.files[0])
                            setImage(objectURL)
                        }
                     }}
                    />
                </label>
                </div>

                  <input
                    type="text"
                    placeholder="Security Question"
                    className="w-full px-4 py-3 border rounded-lg"
                    value= {data.securityQuestion}
                    onChange={(e) => updateData({securityQuestion: e.target.value })}
                    required
                  />
        
                  <input
                    type="text"
                    placeholder="Security Answer"
                    className="w-full px-4 py-3 border rounded-lg"
                    value= {data.securityAnswer}
                    onChange={(e) => updateData({securityAnswer: e.target.value })}
                    required
                  />

                  {/* Password */}
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full px-4 py-3 border rounded-lg pr-10"
                      value={data.password}
                      onChange={(e) =>
                        updateData({password: e.target.value })
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
                  </div>
        
                  {/* Confirm Password */}
                   <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full px-4 py-3 border rounded-lg"
                    value={data.confirmPassword}
                    onChange={(e) =>
                      updateData({confirmPassword: e.target.value })
                    }
                    required
                  /> 
                
                 <label className="flex gap-2 items-center text-gray-600">
                    <input 
                     type="checkbox" 
                     checked={data.twoFactorEnabled}
                     onChange={e => updateData({twoFactorEnabled: e.target.checked})}  
                    />
                    Enable Two Factor Authentication
                </label>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg mt-4 disabled:opacity-50"
                    onClick={()=> navigate('/auth/register2')}
                  >
                    {loading ? "Creating..." : "Create Account"}
                  </button>
                </form>
        
                {/* <p className="mt-6 text-center text-gray-600">
                  Already have an account?{" "}
                  <Link to="/auth/login" className="text-blue-600 font-semibold">
                    Sign in
                  </Link>
                </p> */}
              </div>
            </div>
    )
}