import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="h-[30rem] flex flex-col gap-7 justify-center items-center">
      <h1 className="text-white text-center text-5xl font-bold">
        Page Not Found
      </h1>
      <Link
        to="/"
        className="text-3xl bg-white text-black transition duration-[.5s] hover:bg-[#2F95FA] hover:text-white font-bold w-[250px] text-center h-[3rem] flex justify-center items-center rounded-lg"
      >
        Back to home
      </Link>
    </div>
  );
};
