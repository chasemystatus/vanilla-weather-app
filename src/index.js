function refreshWeather(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;

  cityElement.innerHTML = response.data.city;

  temperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
  let apiKey = "f8ac3ab5b2f666adta3f1e4o43e6107c";
  let encodedCity = encodeURIComponent(city.trim());
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${encodedCity}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(refreshWeather)
    .catch(function (error) {
      console.log("Something went wrong:", error);
    });
}

function handleSearchSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#city-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");

searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");
