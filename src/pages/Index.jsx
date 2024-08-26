import { useEffect, useState } from "react";
import Note from "../components/Note";
import Plus from "../components/Plus";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNotes = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API}/notes`);
    const notes = await response.json();
    setNotes(notes);
    setLoading(false);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="mx-auto my-10 flex w-[90%] flex-wrap justify-center gap-4">
      {loading && notes.length <= 0 ? (
        <p className="text-xl text-slate-600">Loading ....</p>
      ) : (
        notes.map((note) => {
          return <Note key={note._id} note={note} />;
        })
      )}
      <Plus />
    </div>
  );
};

export default Index;
