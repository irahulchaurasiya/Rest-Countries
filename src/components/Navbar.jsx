import search from "../assets/icons/search.svg";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

const Navbar = ({
  setFilterByRegion,
  setFilterBySubRegion,
  setSortBySelected,
  setSearchCountries,
  countries,
}) => {
  const { darkMode } = useTheme();

  const [subregions, setSubregions] = useState([]);

  const handleRegions = (e) => {
    const selectedRegion = e.target.value;
    setFilterByRegion(selectedRegion);

    if (selectedRegion === "") {
      setFilterBySubRegion("");
      setSubregions([]);
      setSearchCountries("");
    } else {
      const uniqueSubregions = [
        ...new Set(
          countries
            .filter(
              (country) => country.region.toLowerCase() === selectedRegion
            )
            .map((country) => country.subregion)
            .filter((subregion) => subregion)
        ),
      ];

      setSubregions(uniqueSubregions);
    }
  };

  const handleSubRegions = (e) => {
    const selectedSubRegion = e.target.value;
    setFilterBySubRegion(selectedSubRegion);
  };

  const handleSort = (e) => {
    setSortBySelected(e.target.value);
  };

  const handleCountrySearch = (e) => {
    setSearchCountries(e.target.value);
  };
  return (
    <div
      className={`flex flex-col h-auto p-10 sm:flex-row justify-between w-full sm:h-20 border-box sm:pl-16 sm:pr-16 ${
        darkMode
          ? "bg-veryDarkBlueDMB text-whiteDMTLME"
          : "bg-veryLightGrayLMB text-veryDarkBlueLMT"
      }`}
    >
      <div className="relative inline-block pb-2 sm:pb-0">
        <img
          src={search}
          alt="Search"
          className={`absolute left-3 top-2 w-6 h-6 ${
            darkMode
              ? "bg-darkBlueDME text-whiteDMTLME"
              : "bg-whiteDMTLME text-veryDarkBlueLMT"
          }`}
        />
        <input
          type="text"
          className={`h-10 w-60 pl-14 shadow-md rounded-md focus:outline-none ${
            darkMode
              ? "bg-darkBlueDME text-whiteDMTLME"
              : "bg-whiteDMTLME text-veryDarkBlueLMT"
          }`}
          placeholder="Search for a country..."
          onChange={handleCountrySearch}
        />
      </div>
      <div className="inline-block flex flex-col sm:flex-row">
        <select
          onChange={handleRegions}
          className={`h-10 w-36 p-2 shadow-md rounded-md focus:outline-none ${
            darkMode
              ? "bg-darkBlueDME text-whiteDMTLME"
              : "bg-whiteDMTLME text-veryDarkBlueLMT"
          }`}
        >
          <option value="">Filter by region</option>
          <option value="antarctic">Antarctic</option>
          <option value="americas">Americas</option>
          <option value="europe">Europe</option>
          <option value="africa">Africa</option>
          <option value="asia">Asia</option>
          <option value="oceania">Oceania</option>
        </select>

        <select
          onChange={handleSubRegions}
          className={`h-10 w-36 p-2 mt-2 sm:mt-0 sm:ml-4 shadow-md rounded-md focus:outline-none ${
            darkMode
              ? "bg-darkBlueDME text-whiteDMTLME"
              : "bg-whiteDMTLME text-veryDarkBlueLMT"
          }`}
        >
          <option value="">Filter by Subregion</option>
          {subregions.length > 0 ? (
            subregions.map((subregion, index) => (
              <option key={index} value={subregion}>
                {subregion}
              </option>
            ))
          ) : (
            <option value="">No subregions available</option>
          )}
        </select>

        <select
          onChange={handleSort}
          className={`h-10 w-36 p-2 mt-2 sm:mt-0 sm:ml-4 shadow-md rounded-md focus:outline-none ${
            darkMode
              ? "bg-darkBlueDME text-whiteDMTLME"
              : "bg-whiteDMTLME text-veryDarkBlueLMT"
          }`}
        >
          <option value="">Sort</option>
          <option value="ascendingPopulation">By Ascending Population</option>
          <option value="descendingPopulation">By Descending Population</option>
          <option value="ascendingArea">By Ascending Area</option>
          <option value="descendingArea">By Descending Area</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
