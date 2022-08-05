// Current day time

let now = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDate = date.getDate();
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
  let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

  let showDate = document.querySelector("#date");
  showDate.innerHTML = `${day} | ${month} ${currentDate} | ${hours}:${minutes}`;

  return showDate;
}

formatDate(now);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// Weekly Forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML += `
        <div class="col">
          <div class="forecast__date">${formatDay(forecastDay.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt=""  class="forecast__icon"/>
            <div class="forecast__temp">
              <span class="temp-max">${Math.round(forecastDay.temp.max)}°</span>
              <span class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}° </span>
            </div>
        </div>
    `;
    }
  });

  forecastHTML += `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8f5def28851f5cf815cb404385490799";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

// Changes in innerHTML

function currentPosition(response) {
  let cityName = document.querySelector("#city");
  let countryName = document.querySelector("#country");
  let temp = document.querySelector("#temp");
  let weather = document.querySelector("#weather");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");

  celcTemp = response.data.main.temp;

  cityName.innerHTML = response.data.name;
  countryName.innerHTML = `, ${response.data.sys.country}`;
  weather.innerHTML = response.data.weather[0].description;
  temp.innerHTML = `${Math.round(celcTemp)}°C`;
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  windSpeed.innerHTML = `${response.data.wind.speed} m/s`;

  getForecast(response.data.coord);
}

// Search city

function search(position) {
  let input = document.querySelector("#search-input");
  cityName = input.value;

  let apiKey = "8f5def28851f5cf815cb404385490799";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentPosition);
}

function searchCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(search);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

// Current Location

function retrievePosition(position) {
  let apiKey = "8f5def28851f5cf815cb404385490799";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let city = `lat=${lat}&lon=${lon}`;
  let url = `https://api.openweathermap.org/data/2.5/weather?${city}&units=metric&appid=${apiKey}`;

  axios.get(url).then(currentPosition);
}

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function displayFahr(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  let fahr = (celcTemp * 9) / 5 + 32;

  temp.innerHTML = `${Math.round(fahr)}°F`;
}

function displayCels(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");

  temp.innerHTML = `${Math.round(celcTemp)}°C`;
}

let currentCity = document.querySelector("#current-position");
currentCity.addEventListener("click", getCurrentCity);

let celcTemp = null;

let fahrTemp = document.querySelector("#fahrenheit");
fahrTemp.addEventListener("click", displayFahr);

let celciusTemp = document.querySelector("#celsius");
celciusTemp.addEventListener("click", displayCels);
