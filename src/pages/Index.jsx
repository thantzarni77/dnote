import { useContext, useEffect, useState } from "react";
import Note from "../components/Note";
import Plus from "../components/Plus";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { NoteContext } from "../../src/context/NoteContext";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { loader } = useContext(NoteContext);

  const getNotes = async (pageNum) => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_API}/notes?page=${pageNum}`,
    );
    const { notes, totalPage } = await response.json();
    setTotalPages(totalPage);
    setNotes(notes);
    setLoading(false);
  };

  useEffect(() => {
    getNotes(currentPage);
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage != 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

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
    <div className="flex flex-col items-center justify-center">
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
      {loading && <p className="text-xl text-slate-600">{loader}</p>}
      <>
        <div className="mx-auto my-10 flex w-[90%] flex-wrap items-center justify-center gap-5">
          {notes.length > 0 && (
            <>
              {notes?.map((note) => {
                return (
                  <Note
                    key={note._id}
                    note={note}
                    getNotes={getNotes}
                    customAlert={customAlert}
                  />
                );
              })}
            </>
          )}

          <Plus />
        </div>
      </>
      <div className="my-2 flex items-center gap-4">
        {currentPage > 1 && (
          <button
            className="rounded bg-slate-500 p-2 text-white hover:bg-slate-200 hover:text-slate-800"
            onClick={handlePrev}
          >
            Prev Page
          </button>
        )}
        {currentPage < totalPages && (
          <button
            className="rounded bg-slate-500 p-2 text-white hover:bg-slate-200 hover:text-slate-800"
            onClick={handleNext}
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default Index;
