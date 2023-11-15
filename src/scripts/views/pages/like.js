/* eslint-disable linebreak-style */
import FavoriteRestoIdb from '../../../public/data/favorite-idb';
import CONFIG from '../../globals/config';

const Like = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Your Liked Restaurant</h2>
        <div class="restaurant-list" id="restaurant-list">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurantList = await FavoriteRestoIdb.getAllRestaurants();
    const restoContainer = document.querySelector('#restaurant-list');

    if (restaurantList.length === 0) {
      restoContainer.innerHTML = '<p class="empty">Your favorite list is empty. Add some restaurants to your favorites!</p>';
    } else {
      restaurantList.forEach((restaurants) => {
        restoContainer.innerHTML += `
            <div class="restaurant-card" tabindex="0">
            <img
            crossorigin="anonymous"
            class="restaurant__poster lazyload"
            data-src="${CONFIG.BASE_IMAGE_URL + restaurants.pictureId}"
            alt="${restaurants.name}"
          />
              <h3 tabindex="0">⭐️ ${restaurants.rating}</h3>
              <h4><a href="/#/detail/${restaurants.id}" tabindex="0">${restaurants.name}</a></h4>
              <h5>Description:</h5>
              <p>${restaurants.description}</p>
            </div>`;
      });
    }
  },
};

export default Like;
