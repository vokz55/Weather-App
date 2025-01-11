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

async function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Город не найден');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        cityNameEl.textContent = 'Ошибка';
        temperatureEl.textContent = '';
        descriptionEl.textContent = error.message;
    }
}

function displayWeather(data) {
    cityNameEl.textContent = `Город: ${data.name}`;
    temperatureEl.textContent = `Температура: ${data.main.temp}°C`;
    descriptionEl.textContent = `Описание: ${data.weather[0].description}`;
}