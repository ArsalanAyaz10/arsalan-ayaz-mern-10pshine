import { useState, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import API from "../api/axios";
import SideNavBar from "../components/SideNavbar";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { Card, CardContent } from "../components/UI/Card";

const CreateNotePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Please enter a title for your note.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (file) formData.append("file", file);

      await API.post("/notes/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Note saved successfully!");
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save note.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNavBar />

      <main className="flex-1 flex justify-center py-10 px-6">
        <Card className="w-full max-w-3xl bg-white shadow-xl rounded-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Create New Note
              </h2>

              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Back to Dashboard
              </Button>
            </div>

            {/* Note Title Input */}
            <Input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setTitle(e.target.value)}
              className="w-full mb-4 bg-white text-black placeholder-gray-500 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Quill Editor */}
            <div className="mb-6">
              <ReactQuill
                value={content}
                onChange={setContent}
                placeholder="Write your note here..."
                className="h-60 text-black"
                theme="snow"
              />
            </div>

            {/* File Upload */}
            <div className="mt-2">
              <label className="text-gray-700 text-sm mb-1 block">
                Attach Image or File (optional):
              </label>
              <input
                type="file"
                accept="image/*,.pdf,.docx,.txt"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-700 
                file:mr-3 file:py-1 file:px-3 file:rounded-md 
                file:border-0 file:bg-blue-100 file:text-blue-700 
                hover:file:bg-blue-200"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                onClick={() => navigate("/dashboard")}
                disabled={loading}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </Button>

              <Button
                onClick={handleSave}
                disabled={loading}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                {loading ? "Saving..." : "Save Note"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateNotePage;
