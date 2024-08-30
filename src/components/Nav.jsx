import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="bg-slate-200">
      <div className="mx-auto flex w-[90%] items-center justify-between px-2">
        <div className="p-3 text-2xl font-bold text-slate-900">
          ShareNote.io
        </div>
        <Link to={"/create"}>Create</Link>
      </div>
    </div>
  );
};

export default Nav;
