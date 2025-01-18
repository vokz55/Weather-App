import './style/style.css';
import './style/global.css';
import './style/gif.css';
import { getGif } from './scripts/api/gifApi.js';
import { fetchWeather, suggestionsApi } from './scripts/api/weatherApi.js';
import { favoritesObject, createFavorite, deleteCard } from './scripts/favorites.js';

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

const cityNameEl = document.getElementById('name');
const temperatureEl = document.getElementById('temperature-value');
const descriptionEl = document.getElementById('description-value');
const suggestionsBox = document.getElementById('suggestions');

const gif = document.querySelector('.gif');

const addBtn = document.getElementById('add');
const listCities = document.querySelector('.cities-grid');
const favoriteCities = favoritesObject.getFavorites();
const deleteLocal = (city) => favoritesObject.removeFavorite(city);

favoriteCities.forEach(element => {
    const cardRendered = createFavorite(element, deleteCard, deleteLocal, displayWeather, searchCity, fetchWeather );
    listCities.prepend(cardRendered);
});

function createNewCard(city, deleteCard, deleteLocal) {
    const cardRendered = createFavorite(city, deleteCard, deleteLocal, displayWeather, searchCity, fetchWeather );
    listCities.prepend(cardRendered);
}

searchBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    const city = cityInput.value.trim();
    
    if (city) {
        fetchWeather(city, displayWeather, searchCity);
    }
});

function displayWeather(data) {
    
    cityNameEl.textContent = `${data.name}`;
    temperatureEl.textContent = `${data.main.temp}°C`;
    descriptionEl.textContent = `${data.weather[0].main}`;
    checkAddBtn()
};

function checkAddBtn() {
    const favoriteCities = favoritesObject.getFavorites();
    if(favoriteCities.includes(cityNameEl.textContent)) {
        addBtn.style.opacity = '0';
        addBtn.disabled = true;
    } else {
        addBtn.style.opacity = '1';
        addBtn.disabled = false;
    };
};

addBtn.addEventListener('click', () => {
    const favoriteCities = favoritesObject.getFavorites();
    if(!favoriteCities.includes(cityNameEl.textContent)) {
        favoritesObject.addFavorite(cityNameEl.textContent);
        createNewCard(cityNameEl.textContent, deleteCard, deleteLocal);
    }
    checkAddBtn()
});

// Слушатель ввода города, с таймаутом, чтобы сократить запросы по апи при вводе
let timeOut;
cityInput.addEventListener('input', () => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
        suggestionsApi(cityInput, suggestionsBox);
    }, 1000);
});

async function showGifForCity(data) {
    const weatherDescription = data.weather[0].description;
    const cityName = data.name;

    if (weatherDescription) {
        const gifUrl = await getGif(cityName, weatherDescription);

        if (gifUrl) {
            gif.src = gifUrl;
        }
    }
}

function searchCity(data) {
    if (data) {
        showGifForCity(data); // Показываем гифку для введенного города
    } else {
        alert('Введите название города!');
    }
}

// На странице today при клипке на кнопку она становится активной
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-time');
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Убираем класс 'btn-active' у всех кнопок
        buttons.forEach(btn => btn.classList.remove('btn-active'));
        // Добавляем класс 'btn-active' на кликнутую кнопку
        button.classList.add('btn-active');
      });
    });
  });