import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";

const Note = ({ note }) => {
  const { _id, title, content, createdAt } = note;
  return (
    <div className="rounded-md border-2 border-slate-500 p-4 shadow-xl md:w-2/5">
      <h3 className="text-xl font-semibold">{title}</h3>
      <hr className="my-1 h-1 bg-slate-500" />
      <p>{content.slice(0, 120)}</p>
      <div className="mt-2 flex justify-between">
        <p>{formatISO9075(new Date(createdAt), { representation: "date" })}</p>
        <div className="flex items-center justify-end gap-2">
          <RiDeleteBin6Line
            size={20}
            className="text-red-700 hover:text-red-400"
          />
          <Link to={`/edit/${_id}`}>
            <FiEdit
              size={20}
              className="text-emerald-600 hover:text-emerald-400"
            />
          </Link>
          <Link to={`/notes/${_id}`}>
            <GrView size={20} className="text-slate-700 hover:text-slate-500" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Note;
