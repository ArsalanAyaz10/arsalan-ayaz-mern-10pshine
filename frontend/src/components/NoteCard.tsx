import { useNavigate } from "react-router-dom";

interface NoteCardProps {
  note: {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
  };
}

const NoteCard = ({ note }: NoteCardProps) => {
  const navigate = useNavigate();

  const stripHtml = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div
      onClick={() => navigate(`/note/${note._id}`)}
      className="bg-yellow-200 p-5 rounded-xl shadow-md cursor-pointer hover:scale-105 transition-transform w-full min-h-[180px] overflow-hidden"
    >
      <h3 className="font-semibold text-black text-lg truncate mb-2">
        {note.title}
      </h3>

      {/* Remove HTML tags from content preview */}
      <p className="text-sm text-gray-700 line-clamp-4">
        {stripHtml(note.content)}
      </p>

      <p className="text-xs text-gray-500 mt-2">
        {new Date(note.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default NoteCard;
