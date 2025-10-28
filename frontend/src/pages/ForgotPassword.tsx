import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, SendHorizonal } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to send reset link.");
        return;
      }

      setSuccess("✅ Password reset link has been sent to your email.");
      setEmail("");
    } catch (err) {
      console.error("Forgot Password Error:", err);
      setError("Something went wrong. Please try again later.");
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
          src="https://cdn3d.iconscout.com/3d/premium/thumb/forgot-password-3d-icon-download-in-png-blend-fbx-gltf-file-formats--login-reset-account-lock-pack-icons-6411456.png"
          alt="Forgot Password Illustration"
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
              <Mail className="text-blue-600" size={28} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-1">
              Forgot Password
            </h2>
            <p className="text-gray-500 text-sm">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email Field */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 text-gray-900 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
            </div>

            {/* Status Messages */}
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            {success && <p className="text-sm text-green-600 text-center">{success}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg transition duration-300 shadow-sm ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <span className="animate-pulse">Sending...</span>
              ) : (
                <>
                  <SendHorizonal size={18} /> Send Link
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
