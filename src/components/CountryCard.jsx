/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const CountryCard = ({ country }) => {
  const { darkMode } = useTheme();

  return (
    <div
      key={country.cca2}
      className={`shadow-md rounded-lg ${
        darkMode ? "bg-darkBlueDME" : "bg-whiteDMTLME"
      }`}
    >
      <Link to={`/detail/${country.cca2}`}>
        <div className="h-[200px] w-full mb-8">
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="h-full w-full rounded-t-md object-fill"
          />
        </div>
      </Link>
      <div className="ml-4 mb-8">
        <h2 className="font-bold text-md mb-2">{country.name.common}</h2>
        <p className="text-sm mb-2">Population: {country.population}</p>
        <p className="text-sm mb-2">Region: {country.region}</p>
        <p className="text-sm mb-2">Capital: {country.capital}</p>
      </div>
    </div>
  );
};

export default CountryCard;
