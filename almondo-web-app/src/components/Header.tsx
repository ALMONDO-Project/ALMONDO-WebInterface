import almondoIcon from "../assets/almondo-icon.png";
import pnrrLogo from "../assets/pnrr-logo.png";

const Header = () => {
  return (
    <div className="flex flex-row justify-between border-b border-gray-300 py-2 px-4">
      <div className="flex flex-row gap-x-4">
        <img
          className="size-16 rounded-full"
          src={almondoIcon}
          alt="app-icon"
        />
        <h1 className="font-bold leading-snug tracking-tight text-slate-800 text-2xl lg:max-w-3xl lg:text-5xl">
          Almondo
        </h1>
      </div>

      <img className="h-16" src={pnrrLogo} alt="pnrr-logo" />
    </div>
  );
};

export default Header;
