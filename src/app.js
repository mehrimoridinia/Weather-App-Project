function formatdate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
      <div class="weather-forecast-date">${day}</div>
        <div>
          <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="70"
          />
        </div>
        <div class="weather-forecast-temp">
        <span class="weather-forecast-highTemp">18° </span>
        <span class="weather-forecast-lowTemp"> 12°</span>
      </div>
    </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displaytemp(response) {
  let tempratureElement = document.querySelector("#temprature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  tempratureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatdate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric `;
  axios.get(apiUrl).then(displaytemp);
}

// make the search box working

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector(".searchForm");
form.addEventListener("submit", handleSubmit);

// make the units working

function displayFarenheitTemp(event) {
  event.preventDefault();
  let tempratureElement = document.querySelector("#temprature");
  // remove the active class the celsius linl
  unitC.classList.remove("active");
  unitf.classList.add("active");
  let farenheitTemp = (celsiusTemp * 6) / 5 + 32;
  tempratureElement.innerHTML = Math.round(farenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let tempratureElement = document.querySelector("#temprature");
  unitC.classList.add("active");
  unitf.classList.remove("active");
  tempratureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let unitf = document.querySelector("#unitF");
unitf.addEventListener("click", displayFarenheitTemp);

let unitC = document.querySelector("#unitC");
unitC.addEventListener("click", displayCelsiusTemp);

search("Tehran");
displayForecast();
