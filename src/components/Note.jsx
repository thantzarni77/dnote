import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Note = ({ note, getNotes, customAlert }) => {
  const { token } = useContext(UserContext);
  const { _id, title, content, createdAt, cover_img } = note;
  const deleteNote = async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/delete/${_id}`, {
      method: "delete",
      headers: {
        Authorizaton: `Bearer ${token.token}`,
      },
    });
    if (response.status === 204) {
      customAlert(response.status, "Post Deleted");
      getNotes();
    }
    if (response.status === 401) {
      customAlert(response.status, "User not Authorized");
    }
  };
  return (
    <div className="flex h-52 w-80 flex-col justify-between rounded-md border-2 border-slate-500 p-4 shadow-xl md:w-96">
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <hr className="my-1 h-1 bg-slate-500" />
        <p>{content.slice(0, 120)}</p>
      </div>
      <div className="mt-2 flex justify-between">
        <p>{formatISO9075(new Date(createdAt), { representation: "date" })}</p>
        <div className="flex items-center justify-end gap-2">
          {token && (
            <>
              {note.author.toString() == token.userID && (
                <>
                  {" "}
                  <RiDeleteBin6Line
                    size={20}
                    className="cursor-pointer text-red-700 hover:text-red-400"
                    onClick={deleteNote}
                  />
                  <Link to={`/edit/${_id}`}>
                    <FiEdit
                      size={20}
                      className="text-emerald-600 hover:text-emerald-400"
                    />
                  </Link>
                </>
              )}
            </>
          )}
          <Link to={`/notes/${_id}`}>
            <GrView size={20} className="text-slate-700 hover:text-slate-500" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Note;
