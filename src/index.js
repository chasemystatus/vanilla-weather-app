function refreshWeather(response) {
  let cityElement = document.querySelector("#city");
  let timeElement = document.querySelector("#day-and-time");
  let date = new Date(response.data.time * 1000);
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;

 

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windMps = response.data.wind.speed;
  let windMph = windMps * 2.23694;
  windElement.innerHTML = Number(windMph.toPrecision(2));
  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
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
  let city = searchInput.value.trim();

  if (city.length < 2) {
    alert("Please enter at least 2 letters (e.g. Paris, Tokyo).");
    return;
  }

  searchCity(city);
  searchInput.value = "";
}

let searchFormElement = document.querySelector("#search-form");

searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");
