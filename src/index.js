//using SheCodes weather api
let apiKey = "01e67acf316997535ao54a5te02b15fa";
let celsiusTemperature = null;
//set time based on api response.data.time
function format_current_time(time) {
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
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${days[number_of_day]} ${hours}:${minutes}`;
}

//format the day for forecast
function format_forecast_day(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
  S;
}
// display the HTML code for forecast
function show_forecast(forecast) {
  console.log(forecast[0].condition.icon);
  console.log(forecast);
  let forecasetElement = document.querySelector("#weather-forecast");
  let forecastHTML = "";
  forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastday, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="weather-forecast-day">
                 ${format_forecast_day(forecastday.time)}
                </div>
                 <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                   forecastday.condition.icon
                 }.png" alt="${forecastday.condition.icon}" />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-max-temperature">${Math.round(
                    forecastday.temperature.maximum
                  )}°</span>
                  <span class="weather-forecast-min-temperature">${Math.round(
                    forecastday.temperature.minimum
                  )}°</span>
                </div>
              </div> `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecasetElement.innerHTML = forecastHTML;
}

//get the data for forecast
function get_forecast(response) {
  let forecast = response.data.daily;
  show_forecast(forecast);
}

function show_temp_of_city(response) {
  // console.log(response);
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
  celsiusTemperature = response.data.temperature.current;
  weather_icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weather_icon.setAttribute("alt", response.data.condition.icon);
  time.innerHTML = format_current_time(response.data.time * 1000);
  let forecastapiurl = `https://api.shecodes.io/weather/v1/forecast?query=${response.data.city}&key=${apiKey}`;
  axios.get(forecastapiurl).then(get_forecast);
}

function searchCity(event) {
  event.preventDefault();
  fahrenheit_link.classList.remove("active");
  celsius_link.classList.add("active");
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
let search_form = document.querySelector("form");
search_form.addEventListener("submit", searchCity);

//chane unit - celsius to fahrenheit
function show_fahrenheit(event) {
  event.preventDefault();
  //remove the active class from the culsius link:
  celsius_link.classList.remove("active");
  fahrenheit_link.classList.add("active");
  let temperature = document.querySelector("#temperature");
  let fahrenheit = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheit);
}

let fahrenheit_link = document.querySelector("#fahrenheit");
fahrenheit_link.addEventListener("click", show_fahrenheit);

//chane unit - fahrenheit to celsius
function show_celsius(event) {
  event.preventDefault();
  fahrenheit_link.classList.remove("active");
  celsius_link.classList.add("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsius_link = document.querySelector("#celsius");
celsius_link.addEventListener("click", show_celsius);

// active/inactive unit links
