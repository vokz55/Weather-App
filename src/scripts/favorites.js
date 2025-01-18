export const favoritesObject = {
    key: 'favoriteCities',

    // Получение списка избранных городов из localStorage
    getFavorites() {
        const favorites = localStorage.getItem(this.key);
        console.log(favorites);
        return favorites ? JSON.parse(favorites) : [];
    },

    // Добавление города в избранные
    addFavorite(city) {
        const favorites = this.getFavorites();
        if (!favorites.includes(city)) {
            favorites.push(city);
            localStorage.setItem(this.key, JSON.stringify(favorites));
        }
    },

    // Удаление города из избранных
    removeFavorite(city) {
        let favorites = this.getFavorites();
        favorites = favorites.filter(fav => fav !== city);
        localStorage.setItem(this.key, JSON.stringify(favorites));
    },

    // Очистка всех избранных
    clearFavorites() {
        localStorage.removeItem(this.key);
    }
};



export function createFavorite(city, deleteCity, deleteLocal) {
    const cardTemplate = document.querySelector('#saved-cities-template').content;
    const cardElement = cardTemplate.querySelector('.city-card').cloneNode(true);
    const cardButton = cardElement.querySelector('.city-btn');
    const cardTitle = cardElement.querySelector('.city-name-btn');
    const deleteButton = cardElement.querySelector('.delete-btn');

    cardTitle.textContent = city;

    deleteButton.addEventListener('click', () => {
        deleteCity(cardElement);
        deleteLocal(city);
    });

    cardButton.addEventListener('click', () => {
    });

    return cardElement;
};

export function deleteCard(card) {
    card.remove();
};