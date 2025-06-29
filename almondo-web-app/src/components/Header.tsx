import logo from "../assets/almondo-icon.png";

const Header = () => {
  return (
    <div className="border-b border-gray-300 py-2 px-4">
      <img className="w-16" src={logo} alt="app-icon" />
    </div>
  );
};

export default Header;
