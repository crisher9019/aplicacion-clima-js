// @ts-check
let apiKey = 'e00cfc90c8ea59bfdec9109aaddc6bc3';
let difKevin = 273.15;
let baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

/** @ts-expect-error @type {HTMLDivElement} */
const weatherDiv = document.getElementById('weatherDiv');
/** @ts-expect-error @type {HTMLButtonElement} */
const searchButton = document.getElementById('searchButton');
/** @ts-expect-error @type {HTMLInputElement} */
const cityInput = document.getElementById('cityInput');

if (searchButton) {
  /** Set up a click listener to fetch the weather */
  searchButton.addEventListener('click', onClick);
}

/**
 * Handle click event and fetch data.
 *
 * @param {MouseEvent} event
 */
async function onClick(event) {
  // Do not navigate away
  event.preventDefault();

  // Make sure the elements were found and exist
  if (!cityInput || !weatherDiv) return;

  const city = cityInput.value;

  // Always prefer early returns
  if (!city) {
    setTitle('Please provide a city');

    return;
  }

  const weather = await fetchWeather(city);

  if (!weather) {
    setTitle('City not found');

    return;
  }

  parseWeather(weather);
}

/** Call the weather API to get the city's current weather */
async function fetchWeather(city) {
  const response = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}`);
  const weather = await response.json();

  if (weather.cod === '404') return null;

  return weather;
}

/** Append the weather data to the HTML div */
function parseWeather(weather) {
  // Set the title as the city name
  setTitle(weather.name);

  // Describe the temperature
  const temperatureElement = document.createElement('p');
  const calculatedTemperature = Math.floor(weather.main.temp - difKevin);
  temperatureElement.textContent = `Current temperature is :${calculatedTemperature}°C`;

  // Set the weather icon
  const iconElement = document.createElement('img');
  iconElement.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  // Describe the weather
  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = weather.weather[0].description;

  // Append the elements to the weather div
  weatherDiv.appendChild(temperatureElement);
  weatherDiv.appendChild(iconElement);
  weatherDiv.appendChild(descriptionElement);
}

/** Clear the weather div and add a title to it */
function setTitle(message) {
  // Clear the div
  weatherDiv.innerHTML = '';

  // Create a new title element
  const titleElement = document.createElement('h2');
  // Set the title contents
  titleElement.textContent = message;
  // Append the new element to the div
  weatherDiv.appendChild(titleElement);
}
