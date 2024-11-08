/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const SingleCountryCard = ({
  country,
  nativeName,
  currencies,
  languages,
  borderCountries,
}) => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  return (
    <div className="sm:flex sm:justify-between">
      <div className="w-full sm:w-[50%] pl-4 pr-4 sm:ml-8 sm:mr-8 mb-8 sm:mb-0">
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-full h-auto"
        />
      </div>

      <div className="w-full sm:w-[50%] pl-4 pr-4 sm:mr-8 sm:ml-8 px-4">
        <h1 className="mb-4 text-4xl font-extrabold">{country.name.common}</h1>
        <div className="w-full sm:flex sm:justify-between">
          <div className="w-full sm:w-[45%] flex flex-col mb-2 sm:mb-0">
            <div className="mb-2 text-lg">
              <span className="mr-1 font-bold">Native Name:</span>
              <span>{nativeName}</span>
            </div>
            <div className="mb-2 text-lg">
              <span className="mr-1 font-bold">Population:</span>
              <span>{country.population.toLocaleString()}</span>
            </div>
            <div className="mb-2 text-lg">
              <span className="mr-1 ont-bold">Region:</span>
              <span>{country.region}</span>
            </div>
            <div className="mb-2 text-lg">
              <span className="mr-1font-bold">Sub Region:</span>
              <span>{country.subregion}</span>
            </div>
            <div className="mb-2 text-lg">
              <span className="mr-1 font-bold">Capital:</span>
              <span>{country.capital}</span>
            </div>
          </div>
          <div className="w-full sm:w-[45%] flex flex-col">
            <div className="mb-2 text-lg">
              <span className="mr-1 font-bold">Top Level Domain:</span>
              <span>{country.tld[0]}</span>
            </div>
            <div className="mb-2 text-lg">
              <span className="mr-1 font-bold">Currencies:</span>
              <span>{currencies}</span>
            </div>
            <div className="mb-2 text-lg">
              <span className="mr-1 font-bold">Languages:</span>
              <span>{languages}</span>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <h3 className="font-medium text-lg">Border Countries: </h3>
          <div className="text-sm">
            {borderCountries.length > 0 ? (
              borderCountries.map((country, index) => (
                <button
                  onClick={() => navigate(`/detail/${country}`)}
                  key={index}
                  className={` ${
                    darkMode
                      ? "bg-veryDarkBlueDMB text-whiteDMTLME hover:bg-gray-700"
                      : "bg-whiteDMTLME text-veryDarkBlueLMT"
                  } p-1 ml-2 border border-gray-500 rounded-md hover:bg-gray-200`}
                >
                  {country}
                </button>
              ))
            ) : (
              <span>None</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCountryCard;
