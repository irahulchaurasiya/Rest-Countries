export const filterCountries = (countries, searchCountries, filterByRegion, filterBySubRegion, sortBySelected) => {

    let filterCountries = countries;

    if (searchCountries) {
        filterCountries = filterCountries.filter(country => country.name.common.toLowerCase().includes(searchCountries.toLocaleLowerCase()));
    }

    if (filterByRegion) {
        filterCountries = filterCountries.filter(country => country.region.toLowerCase() === filterByRegion);
    }

    if (filterBySubRegion) {
        filterCountries = filterCountries.filter(country => {
            return country.subregion.toLowerCase() === filterBySubRegion.toLowerCase()
        });
    }

    if (sortBySelected) {
        switch (sortBySelected) {
            case "ascendingPopulation":
                filterCountries.sort((countryA, countryB) => countryA.population - countryB.population);
                break;

            case "descendingPopulation":
                filterCountries.sort((countryA, countryB) => countryB.population - countryA.population);
                break;

            case "ascendingArea":
                filterCountries.sort((countryA, countryB) => countryA.area - countryB.area);
                break;

            case "descendingArea":
                filterCountries.sort((countryA, countryB) => countryB.area - countryA.area);
                break;

            default:
                break;
        }
    }

    return filterCountries;
}