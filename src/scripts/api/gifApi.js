function getRandomInteger() {
    return Math.floor(Math.random() * 31);
}

export async function getGif(city, weatherDescription) {
    const randomNumber = getRandomInteger();
    const apiKey = '5mpQOZzE0a0qsmQLEEC4Yt4MsNsmO2zZ';
    const query = `mood ${weatherDescription}`;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=30`;

    const response = await fetch(url);
    const data = await response.json();
    if (data.data.length > randomNumber) {
        return data.data[randomNumber].images.original.url;
    } else {
        console.error('Гифки не найдены для запроса:', query);
        return null;
    }
}