/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
import RestaurantSource from '../../../public/data/themoviedb-source';
import CONFIG from '../../globals/config';

const List = {
  async render() {
    return `
    <div class="content" id="content">
    <h2 class="content__heading" tabindex="0">Explore Restaurant</h2>
    <div class="search-bar">
    <input type="text" id="search-input" placeholder="Search..." tabindex="0" />
    <button id="search-button" tabindex="0"><i class="ph-search">search</i></button>
</div>
    <div id="search-results"></div>
    <div class="restaurant-list" id="restaurant-list">
    </div>
   </div>
    `;
  },

  async afterRender() {
    const restaurantList = await RestaurantSource.getList();
    const restoContainer = document.querySelector('#restaurant-list');
    restaurantList.forEach((restaurants) => {
      restoContainer.innerHTML += `
        <div class="restaurant-card" tabindex="0">
          <img crossorigin="anonymous" class="resto-item__header__poster lazyload" alt="${restaurants.name}"
               src="${CONFIG.BASE_IMAGE_URL + restaurants.pictureId}">
          <h3 tabindex="0">${restaurants.city}</h3>
          <h4><a href="/#/detail/${restaurants.id}" tabindex="0">${restaurants.name}</a></h4>
          <h5 tabindex="0">Rating: ${restaurants.rating}</h5>
          <p>${restaurants.description}</p>
        </div>`;

      const searchInput = document.getElementById('search-input');
      const searchButton = document.getElementById('search-button');
      const restaurantsList = document.getElementById('restaurant-list');

      searchButton.addEventListener('click', async () => {
        const searchTerm = searchInput.value;

        try {
          const searchResto = await RestaurantSource.searchRestaurant(searchTerm);

          restaurantsList.innerHTML = renderRestaurants(searchResto);
        } catch (error) {
          console.error(error);
        }
      });

      searchInput.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
          const searchTerm = searchInput.value;

          try {
            const searchResto = await RestaurantSource.searchRestaurant(searchTerm);

            restaurantsList.innerHTML = renderRestaurants(searchResto);
          } catch (error) {
            console.error(error);
          }
        }
      });

      function renderRestaurants(resto) {
        let html = '';
        resto.forEach((restaurant) => {
          html += `<div class="restaurant-card" tabindex="0">
    <img crossorigin="anonymous" class="resto-item__header__poster lazyload" alt="${restaurant.name}"
         src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}">
    <h3 tabindex="0">${restaurant.city}</h3>
    <h4><a href="/#/detail/${restaurant.id}" tabindex="0">${restaurant.name}</a></h4>
    <h5 tabindex="0">Rating: ${restaurant.rating}</h5>
    <p>${restaurant.description}</p>
  </div>`;
        });
        return html;
      }
    });
  },
};

export default List;
