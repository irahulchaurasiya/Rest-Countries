import dark from "../assets/icons/dark.svg";
import light from "../assets/icons/light.svg";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header
      className={`flex pb-0 sm:flex-row place-content-between align-center pb-5 p-10 drop-shadow-md sm:pl-16 sm:pr-16 ${
        darkMode
          ? "bg-veryDarkBlueDMB text-whiteDMTLME"
          : "bg-whiteDMTLME text-veryDarkBlueLMT"
      }`}
    >
      <div className="inline-block text-xl font-bold">Where in the world?</div>
      <div className="flex">
        <button className="flex pt-1" onClick={toggleTheme}>
          <img
            className="h-5 w-5 cursor-pointer"
            src={darkMode ? light : dark}
            alt={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          />
        </button>
        <div className="text-lg ml-2">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </div>
      </div>
    </header>
  );
};

export default Header;
