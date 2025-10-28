import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import API from "../api/axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", { email, password });

      // ✅ assuming backend sends back accessToken
      const token = res.data?.accessToken;
      if (token) {
        localStorage.setItem("accessToken", token);
      }

      toast.success("Login successful 🎉");
      navigate("/dashboard"); // redirect after login

    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || "Invalid credentials. Try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Left Illustration */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-blue-600 to-indigo-700">
        <motion.img
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          src="https://cdn3d.iconscout.com/3d/premium/thumb/secure-login-3d-icon-download-in-png-blend-fbx-gltf-file-formats--password-protected-authentication-pack-icons-6284652.png"
          alt="Login Illustration"
          className="max-w-xs md:max-w-sm drop-shadow-2xl"
        />
      </div>

      {/* Right Form Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md"
        >
          <div className="flex flex-col items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mb-3">
              <LogIn className="text-blue-600" size={28} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-1">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm">
              Login to your NotesPro account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 text-gray-900 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 text-gray-900 rounded-lg px-4 py-2 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white py-2 rounded-lg transition duration-300 shadow-sm`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
