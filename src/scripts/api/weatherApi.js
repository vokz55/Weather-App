const apiKey = '1cee9811db45c4eb5dd64ff177e06d1a';

export async function fetchWeather(city, displayWeather, searchCity) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&appid=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.log('Город не найден');
        }
        const data = await response.json();
        displayWeather(data);
        searchCity(data);
    } catch (error) {
        console.log(error);
    }
}

export async function suggestionsApi(input, suggestionsBox) {
    const query = input.value.trim();
    if (query.length < 2) {
        suggestionsBox.innerHTML = '';
        return;
    }
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`;
    const response = await fetch(url);
    const cities = await response.json();

    // Очищаем предыдущие подсказки
    suggestionsBox.innerHTML = '';

    // Отображаем новые подсказки
    cities.forEach(city => {
        const suggestion = document.createElement('div');
        suggestion.className = 'suggestion';
        suggestion.textContent = `${city.name}, ${city.country}`;
        suggestion.addEventListener('click', () => {
            input.value = `${city.name}, ${city.country}`;
            suggestionsBox.innerHTML = '';
        });
        suggestionsBox.appendChild(suggestion);
    });
};