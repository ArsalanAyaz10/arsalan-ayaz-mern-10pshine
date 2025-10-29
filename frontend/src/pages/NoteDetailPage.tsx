import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface Note {
  _id?: string;
  title: string;
  content: string;
  fileUrl?: string;
}

const NoteDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [note, setNote] = useState<Note>({ title: "", content: "", fileUrl: "" });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await API.get(`/notes/fetch`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const found = res.data.notes.find((n: Note) => n._id === id);
        if (found) setNote(found);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNote();
  }, [id, token]);

  //save
  const handleSave = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", note.title);
      formData.append("content", note.content);
      if (file) formData.append("file", file);

      await API.put(`/notes/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  //delete
  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;
    try {
      await API.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveImage = async () => {
    try {
      const formData = new FormData();
      formData.append("title", note.title);
      formData.append("content", note.content);
      formData.append("file", ""); // clear file
      await API.put(`/notes/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setNote({ ...note, fileUrl: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fefefe] via-[#f7f9ff] to-[#eef3ff] flex justify-center items-center p-6">
      <div className="max-w-5xl w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Edit Note</h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-all"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Title Input */}
        <input
          type="text"
          className="w-full text-2xl font-medium mb-5 border-b border-gray-300 p-3 rounded-md bg-gray-50 focus:bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          placeholder="Enter note title..."
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />

        {/* Image Section */}
        {note.fileUrl ? (
          <div className="mb-6">
            <img
              src={note.fileUrl}
              alt="Note attachment"
              className="max-h-[300px] w-auto rounded-xl shadow-md mb-3 mx-auto"
            />
            <div className="flex justify-center gap-4">
              <label className="cursor-pointer bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-all">
                Replace Image
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setFile(e.target.files[0]);
                  }}
                />
              </label>
              <button
                onClick={handleRemoveImage}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
              >
                Remove Image
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center mb-6">
            <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all">
              Upload Image
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) setFile(e.target.files[0]);
                }}
              />
            </label>
            {file && (
              <p className="text-sm text-gray-600 mt-2 italic">
                Selected: {file.name}
              </p>
            )}
          </div>
        )}

        {/* Rich Text Editor */}
        <div className="mb-8">
          <ReactQuill
            theme="snow"
            value={note.content}
            onChange={(content) => setNote({ ...note, content })}
            className="bg-white text-black rounded-lg border border-gray-300 h-[400px]"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`px-6 py-2 rounded-md text-white transition-all ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-all"
          >
            Delete
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailsPage;
