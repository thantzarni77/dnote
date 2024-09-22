import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const Nav = () => {
  const { token, updateToken } = useContext(UserContext);

  const logoutHandler = () => {
    updateToken(null);
  };

  return (
    <div className="bg-slate-200">
      <div className="mx-auto flex w-[90%] items-center justify-between px-2">
        <Link to={"/"} className="p-3 text-2xl font-bold text-slate-900">
          ShareNote.io
        </Link>
        <div className="flex items-center gap-5">
          {token ? (
            <>
              {" "}
              <NavLink to={"/create"}>Add Note</NavLink>
              <button type="button" onClick={logoutHandler}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to={"/login"}>Login</NavLink>
              <NavLink to={"/register"}>Register</NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
