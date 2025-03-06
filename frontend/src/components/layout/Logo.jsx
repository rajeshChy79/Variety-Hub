import logo from "../../assest/logo.png"; // Ensure the path is correct

const Logo = ({ w = 100, h = 50, className = "" }) => {
  return (
    <img
      src={logo}
      alt="YourBrand Logo"
      width={w}
      height={h}
      className={`object-contain transition-transform duration-300 hover:scale-105 drop-shadow-lg rounded-md ${className}`}
      style={{
        filter: "drop-shadow(0 2px 4px rgba(7, 25, 82, 0.3))", // #071952 shadow
      }}
    />
  );
};

export default Logo;