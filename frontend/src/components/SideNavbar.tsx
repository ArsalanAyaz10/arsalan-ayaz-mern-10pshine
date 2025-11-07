import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, FileText, StickyNote, Info } from "lucide-react";

const SideNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FileText size={18} /> },
    { path: "/mynotes", label: "My Notes", icon: <StickyNote size={18} /> },
    { path: "/about", label: "About Project", icon: <Info size={18} /> },
  ];

  return (
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
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
              location.pathname === item.path
                ? "bg-blue-200 text-blue-800 font-semibold"
                : "hover:bg-blue-200"
            }`}
          >
            {item.icon}
            {isSidebarOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SideNavbar;
