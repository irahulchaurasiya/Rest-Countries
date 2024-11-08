import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { useTheme } from "../context/ThemeContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import Spinner from "../components/Spinner";

const SingleCountryPage = () => {
  const { cca3 } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${url}/alpha/${cca3}`);
        if (!response.ok) throw new Error("Country Not Found");
        const data = await response.json();

        setCountry(data[0]);
      } catch (error) {
        console.log("error while fetching data", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [cca3, url]);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!country) {
    return <NotFoundPage />;
  }

  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0].common
    : country.name.common;

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ")
    : "N/A";

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const borderCountries = country.borders ? country.borders : [];

  return (
    <div
      className={`w-full min-h-screen ${
        darkMode
          ? "bg-veryDarkBlueDMB text-whiteDMTLME"
          : "bg-whiteDMTLME text-veryDarkBlueLMT"
      }`}
    >
      <section className="w-full max-w-6xl mx-auto">
        <div className="flex items-center mb-4 p-4">
          <div
            className={`w-24 shadow-sm rounded-sm p-2 ${
              darkMode
                ? "bg-veryDarkBlueDMB text-whiteDMTLME"
                : "bg-whiteDMTLME text-veryDarkBlueLMT"
            }`}
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center bg-transparent text-inherit"
            >
              <IoMdArrowRoundBack className="mr-2" />
              Back
            </button>
          </div>
        </div>
        <div className="sm:flex sm:justify-between">
          <div className="w-full sm:w-[50%] pl-4 pr-4 sm:ml-8 sm:mr-8 mb-8 sm:mb-0">
            <img
              src={country.flags.svg}
              alt={country.name.common}
              className="w-full h-auto"
            />
          </div>

          <div className="w-full sm:w-[50%] pl-4 pr-4 sm:mr-8 sm:ml-8 px-4">
            <h1 className="mb-4 text-4xl font-extrabold">
              {country.name.common}
            </h1>
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
      </section>
    </div>
  );
};

export default SingleCountryPage;
