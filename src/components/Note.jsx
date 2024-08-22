import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

const Note = () => {
  return (
    <div className="rounded-md border-2 border-slate-500 p-4 shadow-xl md:w-2/5">
      <h3 className="text-xl font-semibold">
        Lorem Ispum Dolor sti amet consectetur
      </h3>
      <hr className="my-1 h-1 bg-slate-500" />
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis suscipit
        asperiores, architecto reprehenderit nobis, nostrum minima non, et ullam
        sunt impedit delectus. Qui nihil impedit, illum quod
      </p>
      <div className="mt-2 flex items-center justify-end gap-2">
        <RiDeleteBin6Line
          size={20}
          className="text-red-700 hover:text-red-400"
        />
        <Link to={"/edit/1"}>
          <FiEdit
            size={20}
            className="text-emerald-600 hover:text-emerald-400"
          />
        </Link>
        <Link to={"/notes/1"}>
          <GrView size={20} className="text-slate-700 hover:text-slate-500" />
        </Link>
      </div>
    </div>
  );
};

export default Note;
