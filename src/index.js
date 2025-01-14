import './style/global.css'
import './style/style.css'



const apiKey = '1cee9811db45c4eb5dd64ff177e06d1a';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

const cityNameEl = document.getElementById('cityName');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Город не найден');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            cityNameEl.textContent = 'Ошибка';
            temperatureEl.textContent = '';
            descriptionEl.textContent = error.message;
        });
}

function displayWeather(data) {
    cityNameEl.textContent = `City: ${data.name}`;
    temperatureEl.textContent = `Temperature: ${data.main.temp}°C`;
    descriptionEl.textContent = `Description: ${data.weather[0].description}`;
}