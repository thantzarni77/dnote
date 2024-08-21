import { MdPostAdd } from "react-icons/md";
import { Link } from "react-router-dom";

const Plus = () => {
  return (
    <Link
      to={"/create"}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-slate-600 p-2 font-bold text-slate-100 shadow-xl hover:bg-slate-300 hover:text-slate-900"
    >
      <MdPostAdd size={35} className="mdPostAdd" />
    </Link>
  );
};

export default Plus;
