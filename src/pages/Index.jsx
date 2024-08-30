import { useEffect, useState } from "react";
import Note from "../components/Note";
import Plus from "../components/Plus";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

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

  const customAlert = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <div className="mx-auto my-10 flex w-[90%] flex-wrap items-center justify-center gap-5">
        {loading && notes.length <= 0 ? (
          <p className="text-xl text-slate-600">Loading ....</p>
        ) : (
          notes.map((note) => {
            return (
              <Note
                key={note._id}
                note={note}
                getNotes={getNotes}
                customAlert={customAlert}
              />
            );
          })
        )}
        <Plus />
      </div>
    </div>
  );
};

export default Index;
