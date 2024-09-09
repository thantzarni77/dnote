import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const Nav = () => {
  const { token } = useContext(UserContext);
  return (
    <div className="bg-slate-200">
      <div className="mx-auto flex w-[90%] items-center justify-between px-2">
        <NavLink to={"/"} className="p-3 text-2xl font-bold text-slate-900">
          ShareNote.io
        </NavLink>
        <div className="flex items-center gap-5">
          {token ? (
            <NavLink to={"/create"}>ADD NOTE</NavLink>
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
