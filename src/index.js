function makeHttps(url) {
  if (!url) return "";
  let safeUrl = url.replace("http:", "https:");
  return safeUrl;
}

function refreshWeather(response) {
  let cityElement = document.querySelector("#city");
  let timeElement = document.querySelector("#day-and-time");
  let date = new Date(response.data.time * 1000);
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windMps = response.data.wind.speed;
  let windMph = windMps * 2.23694;
  windElement.innerHTML = Math.round(windMph);

  temperatureElement.innerHTML = Math.round(temperature);

  let iconUrl = makeHttps(response.data.condition.icon_url);
  iconElement.src = iconUrl;
  iconElement.alt = response.data.condition.description;

  getForecast(response.data.city);
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
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "f8ac3ab5b2f666adta3f1e4o43e6107c";
  let encodedCity = encodeURIComponent(city.trim());
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${encodedCity}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(displayForecast)
    .catch(function (error) {
      console.log("Forecast request failed:", city, error);
    });
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      let iconUrl = makeHttps(day.condition.icon_url);

      forecastHtml =
        forecastHtml +
        `
<div class="forecast-day">
  <div class="forecast-date">${formatDay(day.time)}</div>
  <div class="forecast-icon">
  <img class="forecast-icon-img" src="${iconUrl}" alt="${
          day.condition.description
        }" /></div>
  <div class="forecast-temps">
    <span class="forecast-high">
      <strong>${Math.round(day.temperature.maximum)}°</strong>
    </span>
    <span class="forecast-low">${Math.round(day.temperature.minimum)}°</span>
  </div>
</div>
`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");
