import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import CountryCard from "../components/CountryCard";
import Navbar from "../components/Navbar";
import { filterCountries } from "../util/filterCountries";

const Homepage = () => {
  const { darkMode } = useTheme();

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filterByRegion, setFilterByRegion] = useState("");
  const [filterBySubRegion, setFilterBySubRegion] = useState("");
  const [sortBySelected, setSortBySelected] = useState("");
  const [searchCountries, setSearchCountries] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        setCountries(data);
      } catch (error) {
        console.log("error while fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const filteredCountries = filterCountries(
      countries,
      searchCountries,
      filterByRegion,
      filterBySubRegion,
      sortBySelected
    );
    setFilteredCountries(filteredCountries);
  }, [
    countries,
    searchCountries,
    filterByRegion,
    filterBySubRegion,
    sortBySelected,
  ]);

  return (
    <div
      className={`font-nunito ${
        darkMode
          ? "bg-veryDarkBlueDMB text-whiteDMTLME"
          : "bg-veryLightGrayLMB text-veryDarkBlueLMT"
      }`}
    >
      <Navbar
        countries={countries}
        setFilterByRegion={setFilterByRegion}
        setFilterBySubRegion={setFilterBySubRegion}
        setSortBySelected={setSortBySelected}
        setSearchCountries={setSearchCountries}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-32 p-10 sm:pl-16 sm:pr-16 bg-white-50">
          {filteredCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Homepage;
