import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center md:w-1/2 w-full bg-gradient-to-br from-indigo-200 to-blue-100"
      >
        <img
          src="/hero-notes.svg"
          alt="Notes Illustration"
          className="w-3/4 max-w-md drop-shadow-xl"
        />
      </motion.div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col justify-center items-center md:w-1/2 w-full px-6 md:px-12 text-center"
      >
        <div className="max-w-md">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Welcome to <span className="text-blue-600">NoteKro!</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-gray-600 mb-8 leading-relaxed"
          >
            Simplify how you create, organize, and secure your notes — all in one beautiful app.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col md:flex-row justify-center gap-4"
          >
            <Link
              to="/login"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition font-medium px-8 py-3 rounded-lg shadow-lg">
              Login
            </Link>
            <Link
              to="/signup"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition font-medium px-8 py-3 rounded-lg shadow-lg"
            >
              Sign Up
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
