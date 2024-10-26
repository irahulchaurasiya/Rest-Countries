import dark from "../assets/icons/dark.svg";
import light from "../assets/icons/light.svg";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div
      className={`flex flex-col pb-0 sm:flex-row place-content-between align-center pb-5 p-10 drop-shadow-md sm:pl-16 sm:pr-16 ${
        darkMode
          ? "bg-veryDarkBlueDMB text-whiteDMTLME"
          : "bg-whiteDMTLME text-veryDarkBlueLMT"
      }`}
    >
      <div className="inline-block text-xl font-bold">Where in the world?</div>
      <div className="flex pt-4 sm:pt-0">
        <div className="flex pt-1" onClick={toggleTheme}>
          <img
            className="h-5 w-5 cursor-pointer"
            src={darkMode ? light : dark}
            alt="No icons"
          />
        </div>
        <div className="text-lg ml-2">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </div>
      </div>
    </div>
  );
};

export default Header;
