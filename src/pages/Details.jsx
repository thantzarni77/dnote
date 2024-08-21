import React from "react";
import { Link } from "react-router-dom";

const Details = () => {
  return (
    <div className="mx-auto my-4 flex w-[90%] flex-col items-center">
      <Link to={"/"} className="self-start">
        <button className="mb-4 rounded bg-slate-600 px-8 py-2 text-slate-100 hover:bg-slate-300 hover:text-slate-700">
          Back
        </button>
      </Link>
      <div className="w-full border-y-4 border-y-slate-500 p-4 shadow-xl">
        <h3 className="text-xl font-semibold">
          Lorem Ispum Dolor sti amet consectetur
        </h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis
          suscipit asperiores, architecto reprehenderit nobis, nostrum minima
          non, et ullam sunt impedit delectus. Qui nihil impedit, illum quod
        </p>
      </div>
    </div>
  );
};

export default Details;
