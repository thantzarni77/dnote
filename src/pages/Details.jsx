import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { FaUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

const Details = () => {
  const { id } = useParams();
  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNote = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API}/notes/${id}`);
    const note = await response.json();
    setNote(note);
    setLoading(false);
  };

  useEffect(() => {
    getNote();
  }, []);
  return (
    <>
      {loading ? (
        <p>Loading ....</p>
      ) : (
        <div className="mx-auto my-4 flex w-[90%] flex-col items-center">
          <Link to={"/"} className="self-start">
            <button className="mb-4 rounded bg-slate-600 px-8 py-2 text-slate-100 hover:bg-slate-300 hover:text-slate-700">
              Back
            </button>
          </Link>
          <div className="w-full border-y-4 border-y-slate-500 p-4 shadow-xl">
            <h3 className="text-xl font-semibold">{note.title}</h3>
            <div className="my-1 flex items-center gap-1">
              <FaUser className="text-[18px]" /> <p>{note.author}</p>
            </div>
            {note.createdAt && (
              <div className="flex items-center gap-1">
                <MdDateRange className="text-[20px]" />
                <p>
                  {formatISO9075(new Date(note.createdAt), {
                    representation: "date",
                  })}
                </p>
              </div>
            )}
            <p className="mt-5 text-base">{note.content}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
