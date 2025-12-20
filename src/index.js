function searchCity(city) {
  // make api call and update the interface
  let apiKey = "f8ac3ab5b2f666adta3f1e4o43e6107c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
}

function handleSearchSubmit(event) {
  console.log("submit fired");
  event.preventDefault();

  let searchInput = document.querySelector("#city-input");

  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = searchInput.value;

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");

searchFormElement.addEventListener("submit", handleSearchSubmit);
