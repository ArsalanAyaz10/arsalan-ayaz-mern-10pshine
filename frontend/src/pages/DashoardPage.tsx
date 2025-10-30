import { useEffect, useState, useRef } from "react";
import { Menu, User, LogOut, FileText, StickyNote, Info } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import NoteCard from "../components/NoteCard"; 
import SideNavbar from "../components/SideNavbar";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await API.get("/notes/fetch");
        const sorted = res.data.notes
          ?.sort(
            (a: Note, b: Note) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 3);
        setNotes(sorted || []);
      } catch (err) {
        console.error("Failed to fetch notes", err);
      }
    };
    fetchNotes();
  }, []);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
        <SideNavbar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex justify-between items-center px-6 py-4 bg-blue-700 text-white shadow">
          <h1 className="text-2xl font-semibold">NoteKro</h1>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="flex items-center space-x-2 hover:text-blue-200 focus:outline-none"
            >
              <User />
            </button>

           {showDropdown && (
  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 z-50">
    {/* Profile Section */}
    <div className="flex items-center gap-3 border-b pb-3 mb-3">
      {/* Avatar with initials */}
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
        {user?.name
          ? user.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .toUpperCase()
          : "U"}
      </div>

      {/* Name + Email */}
      <div className="flex flex-col">
        <p className="font-semibold text-gray-900 text-sm">{user?.name || "Your Name"}</p>
        <p className="text-xs text-gray-500 truncate w-40">{user?.email || "yourname@email.com"}</p>
      </div>
    </div>

    {/* Menu Items */}
    <div className="flex flex-col text-sm text-gray-700">
      <button
        onClick={() => {
          setShowDropdown(false);
          navigate("/profile");
        }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <i className="ri-user-line text-gray-500"></i>
        My Profile
      </button>

      <button
        onClick={() => {
          setShowDropdown(false);
          navigate("/settings");
        }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <i className="ri-settings-3-line text-gray-500"></i>
        Settings
      </button>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-2 mt-1 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
      >
        <i className="ri-logout-circle-line text-red-500"></i>
        Log Out
      </button>
    </div>
  </div>
)}

          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Hey {user?.name || "User"} 👋
              </h2>
              <p className="text-gray-600 text-lg italic">
                Forgot something? Take a look at your latest notes or make a new one.
              </p>
            </div>

            <button
              onClick={() => navigate("/create-note")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + Create Note
            </button>
          </div>

          {/* Notes Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.length > 0 ? (
              notes.map((note) => <NoteCard key={note._id} note={note} />)
            ) : (
              <div className="text-center col-span-full mt-12">
                <p className="text-gray-500 mb-4">No recent notes found.</p>
                <button
                  onClick={() => navigate("/create-note")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  + Create Your First Note
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
