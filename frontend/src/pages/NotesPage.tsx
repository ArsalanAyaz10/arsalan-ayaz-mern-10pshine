import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import SideNavbar from "../components/SideNavbar";
import NoteCard from "../components/NoteCard";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const MyNotes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await API.get("/notes/fetch");
        setNotes(res.data.notes || []);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideNavbar />

      <div className="flex-1 p-8 overflow-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">My Notes</h1>
            <p className="text-gray-600">Search for notes below.</p>
          </div>

          <Button onClick={() => navigate("/create-note")}>+ New Note</Button>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mb-8">
          <Input
            type="text"
            placeholder="Search your notes..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-full"
          />
        </div>

        {/* Notes Section */}
        {loading ? (
          <p className="text-gray-500 text-center mt-12">Loading your notes...</p>
        ) : filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredNotes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-20">
            <p className="text-gray-500 mb-4">You don’t have any notes yet.</p>
            <Button onClick={() => navigate("/create-note")}>
              + Create Your First Note
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyNotes;
