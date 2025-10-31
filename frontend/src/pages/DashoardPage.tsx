import { useEffect, useState, useRef } from "react";
import { Menu, User, LogOut, FileText, StickyNote, Info } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import NoteCard from "../components/NoteCard"; // ✅ Import your NoteCard component

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
      <aside
        className={`bg-blue-100 text-gray-800 shadow-md transition-all duration-300 ${
          isSidebarOpen ? "w-56" : "w-16"
        } flex flex-col`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-4 text-gray-600 hover:text-blue-600"
        >
          <Menu size={22} />
        </button>

        <nav className="flex-1 space-y-4 mt-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-2 hover:bg-blue-200 rounded-md transition"
          >
            <FileText size={18} />
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>

          <Link
            to="/mynotes"
            className="flex items-center gap-3 px-4 py-2 hover:bg-blue-200 rounded-md transition"
          >
            <StickyNote size={18} />
            {isSidebarOpen && <span>My Notes</span>}
          </Link>

          <Link
            to="/about"
            className="flex items-center gap-3 px-4 py-2 hover:bg-blue-200 rounded-md transition"
          >
            <Info size={18} />
            {isSidebarOpen && <span>About Project</span>}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex justify-between items-center px-6 py-4 bg-blue-700 text-white shadow">
          <h1 className="text-2xl font-semibold">NoteIT</h1>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="flex items-center space-x-2 hover:text-blue-200 focus:outline-none"
            >
              <User />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-md border">
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    navigate("/profile");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  View Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
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
