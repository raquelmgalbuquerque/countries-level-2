let countries = [];

fetch("https://restcountries.com/v3.1/all")
  .then((resp) => resp.json())
  .then((countryList) => {
    countries = countryList;

    // Order array alphabetically so that its sorted for the select
    countries.sort(function (a, b) {
      return a.name.common > b.name.common
        ? 1
        : a.name.common === b.name.common
        ? 0
        : -1;
    });

    countries.forEach((country) => {
      let optionCountry = document.createElement("option");
      optionCountry.innerHTML = country.name.common;
      optionCountry.setAttribute("value", country.name.common);

      document.querySelector("#country-select").appendChild(optionCountry);
    });

    const countryLargestPopulation = countries.reduce(function (prev, current) {
      return prev.population > current.population ? prev : current;
    });
    document.querySelector(".country-largest-population span").innerHTML =
      countryLargestPopulation.name.common;

    const countryLargestArea = countries.reduce(function (prev, current) {
      return prev.area > current.area ? prev : current;
    });
    document.querySelector(".country-largest-area span").innerHTML =
      countryLargestArea.name.common;
  });

function displayCountry() {
  let countryName = document.querySelector("#country-select").value;

  const selectedCountry = countries.find(
    (country) => country.name.common === countryName
  );

  document.querySelector(".country-name span").innerHTML =
    selectedCountry.name.common;
  document.querySelector(".country-population span").innerHTML =
    selectedCountry.population;
  document.querySelector(".country-capital span").innerHTML =
    selectedCountry.capital;
  document.querySelector(".country-area span").innerHTML = selectedCountry.area;
  document.querySelector(".country-flag img").src = selectedCountry.flags.png;

  document.querySelector(".country-container").style.display = "flex";
}
