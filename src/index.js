//using SheCodes weather api
let apiKey = "01e67acf316997535ao54a5te02b15fa";

function format_time(time) {
  let date = new Date(time);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let number_of_day = date.getDay();
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "Friday",
    "saturday",
  ];

  return `${days[number_of_day]} ${hours}:${minutes}`;
}

function show_temp_of_city(response) {
  console.log(response);
  let city = document.querySelector("h1");
  let description = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let temperature = document.querySelector("#temperature");
  let weather_icon = document.querySelector("#current-weather-icon");
  let time = document.querySelector("#time");
  city.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = response.data.wind.speed;
  temperature.innerHTML = Math.round(response.data.temperature.current);
  weather_icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weather_icon.setAttribute("alt", response.data.condition.icon);
  time.innerHTML = format_time(response.data.time * 1000);
}

function searchCity(event) {
  event.preventDefault();
  let searched_city = document.querySelector("#search-city-input");
  if (searched_city.value) {
    let apiUrlSearchCity = `https://api.shecodes.io/weather/v1/current?query=${searched_city.value}&key=${apiKey}&units=metric`;
    axios.get(apiUrlSearchCity).then(show_temp_of_city);
  }
}
//default city
axios
  .get(
    `https://api.shecodes.io/weather/v1/current?query=new-york&key=${apiKey}&units=metric`
  )
  .then(show_temp_of_city);

//search city
let search_btn = document.querySelector("form");
search_btn.addEventListener("submit", searchCity);
