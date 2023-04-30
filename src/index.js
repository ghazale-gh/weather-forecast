//using SheCodes weather api
let apiKey = "01e67acf316997535ao54a5te02b15fa";
//current temperature for searched city
function show_temp_of_city(response) {
  console.log(response);
  let city = document.querySelector("h1");
  let description = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let temperature = document.querySelector("#temperature");
  city.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = response.data.wind.speed;
  temperature.innerHTML = Math.round(response.data.temperature.current);
}
function searchCity(event) {
  event.preventDefault();
  let searched_city = document.querySelector("#search-city-input");
  if (searched_city.value) {
    let apiUrlSearchCity = `https://api.shecodes.io/weather/v1/current?query=${searched_city.value}&key=${apiKey}&units=metric`;
    axios.get(apiUrlSearchCity).then(show_temp_of_city);
  }
}

let search_btn = document.querySelector("form");
search_btn.addEventListener("submit", searchCity);
