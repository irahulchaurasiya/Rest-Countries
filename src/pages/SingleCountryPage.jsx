import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { useTheme } from "../context/ThemeContext";
import { IoMdArrowRoundBack } from "react-icons/io";

const SingleCountryPage = () => {
  const { cca3 } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${cca3}`
        );
        const data = await response.json();

        setCountry(data[0]);
      } catch (error) {
        console.log("error while fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [cca3]);

  if (loading) {
    return <div>Loading...</div>;
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

  const borderCountries = country.borders ? country.borders.join(", ") : "None";

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
          <div className="w-full md:w-[50%] mb-8 sm:mb-0">
            <img
              src={country.flags.svg}
              alt={country.name.common}
              className="w-full h-auto"
            />
          </div>

          <div className="w-full sm:w-[50%] sm:ml-16 px-4">
            <h1 className="mb-4 text-4xl font-extrabold">
              {country.name.common}
            </h1>
            <div className="w-full sm:flex sm:justify-between">
              <div className="w-full sm:w-[45%] flex flex-col mb-2 sm:mb-0">
                <span className="mb-2 text-lg">
                  <span className="mr-1 font-bold">Native Name:</span>
                  <span>{nativeName}</span>
                </span>
                <span className="mb-2 text-lg">
                  <span className="mr-1 font-bold">Population:</span>
                  <span>{country.population.toLocaleString()}</span>
                </span>
                <span className="mb-2 text-lg">
                  <span className="mr-1 ont-bold">Region:</span>
                  <span>{country.region}</span>
                </span>
                <span className="mb-2 text-lg">
                  <span className="mr-1font-bold">Sub Region:</span>
                  <span>{country.subregion}</span>
                </span>
                <span className="mb-2 text-lg">
                  <span className="mr-1 font-bold">Capital:</span>
                  <span>{country.capital}</span>
                </span>
              </div>
              <div className="w-full sm:w-[45%] flex flex-col">
                <span className="mb-2 text-lg">
                  <span className="mr-1 font-bold">Top Level Domain:</span>
                  <span>{country.tld[0]}</span>
                </span>
                <span className="mb-2 text-lg">
                  <span className="mr-1 font-bold">Currencies:</span>
                  <span>{currencies}</span>
                </span>
                <span className="mb-2 text-lg">
                  <span className="mr-1 font-bold">Languages:</span>
                  <span>{languages}</span>
                </span>
              </div>
            </div>
            <div className="mb-2">
              <h3 className="font-medium text-lg">Border Countries: </h3>
              <p className="text-sm">{borderCountries}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleCountryPage;
