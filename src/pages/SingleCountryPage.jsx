import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

import NotFoundPage from "./NotFoundPage";
import { useTheme } from "../context/ThemeContext";
import Spinner from "../components/Spinner";
import SingleCountryCard from "../components/SingleCountryCard";

const SingleCountryPage = () => {
  const { cca3 } = useParams();
  const params = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  console.log(params, '234');

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
        <SingleCountryCard
          country={country}
          nativeName={nativeName}
          currencies={currencies}
          languages={languages}
          borderCountries={borderCountries}
        />
      </section>
    </div>
  );
};

export default SingleCountryPage;
