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

// Changes in innerHTML

function currentPosition(response) {
  console.log(response.data);
  let cityName = document.querySelector("#city");
  let countryName = document.querySelector("#country");
  let temp = document.querySelector("#temp");
  let weather = document.querySelector("#weather");
  cityName.innerHTML = response.data.name;
  countryName.innerHTML = `, ${response.data.sys.country}`;
  weather.innerHTML = response.data.weather[0].main;
  temp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
}

// Search city

function search(position) {
  let input = document.querySelector("#search-input");
  cityName = input.value;

  let apiKey = "8f5def28851f5cf815cb404385490799";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);

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

  console.log(url);

  axios.get(url).then(currentPosition);
}

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentCity = document.querySelector("#current-position");
currentCity.addEventListener("click", getCurrentCity);
