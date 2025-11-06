import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      <h1
        onClick={() => navigate("/dashboard")}
        className="text-xl font-semibold text-blue-600 cursor-pointer"
      >
        NoteKro
      </h1>

      <div
        aria-label="profile-icon"
        className="cursor-pointer hover:scale-105 transition"
        onClick={() => navigate("/profile")}
      >
        <UserCircle size={30} className="text-gray-700" />
      </div>
    </nav>
  );
};

export default Navbar;
