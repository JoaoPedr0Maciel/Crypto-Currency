import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

export const Header = () => {
  return (
    <div className="h-[5rem] w-full flex justify-center items-center">
      <Link to="/">
        <img
          className="max-custom-md:w-[200px] max-custom-md:h-[200px] "
          src={logo}
          alt=""
        />
      </Link>
    </div>
  );
};
