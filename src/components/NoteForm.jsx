import { MdOutlineSaveAs } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const NoteForm = ({ isCreate }) => {
  return (
    <div className="mx-auto flex w-[90%] flex-col items-center">
      <div className="flex w-[90%] items-center justify-between">
        <h1 className="my-5 text-2xl font-bold text-slate-900">
          {isCreate ? "Create New Note Here." : "Edit your note."}
        </h1>
        <Link to={"/"} className="hover:text-slate-400">
          <FaArrowLeftLong size={30} />
        </Link>
      </div>
      <form action="" className="flex w-full flex-col items-center">
        <div className="mx-auto mb-3 flex w-[90%] flex-col gap-2">
          <label htmlFor="title" className="font-semibold text-slate-900">
            Note Title
          </label>
          <input
            type="text"
            className="rounded border-2 border-slate-400 p-1 indent-2 focus:outline-none"
          />
        </div>
        <div className="mx-auto mb-3 flex w-[90%] flex-col gap-2">
          <label htmlFor="description" className="font-semibold text-slate-900">
            Note Description
          </label>
          <textarea
            className="rounded border-2 border-slate-400 p-1 indent-2 focus:outline-none"
            rows={6}
          ></textarea>
        </div>
        <button className="my-2 w-[90%] rounded-md bg-slate-300 p-2 font-bold text-slate-900 hover:bg-slate-600 hover:text-slate-100">
          <div className="flex items-center justify-center gap-1">
            <MdOutlineSaveAs size={24} />
            <span>Save Note</span>
          </div>
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
