function refreshWeather(response) {
  console.log(response.data.temperature.current);
}

function searchCity(city) {
  let apiKey = "f8ac3ab5b2f666adta3f1e4o43e6107c";
  let encodedCity = encodeURIComponent(city.trim());
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${encodedCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#city-input");

  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = searchInput.value;

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");

searchFormElement.addEventListener("submit", handleSearchSubmit);
