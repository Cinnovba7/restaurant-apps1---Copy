/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../../public/data/themoviedb-source';
import CONFIG from '../../globals/config';
import LikeButtonInitiator from '../../utils/like-button';
import API_ENDPOINT from '../../globals/api-endpoint';
import FavoriteRestoIdb from '../../../public/data/favorite-idb';

const Detail = {
  async render() {
    return `
    <div class="restaurants-list" id="restaurants-list"></div>
    <div class="review-container">
  <h3>Add a Review</h3>
  <form id="review-form">
    <div>
      <label for="review-name">Name:</label>
      <input type="text" id="review-name" required>
    </div>
    <div>
      <label for="review-text">Review:</label>
      <textarea id="review-text" rows="4" required></textarea>
    </div>
    <div>
      <button type="submit" class="btn-submit" id="btn-submit">Submit</button>
    </div>
  </form>
</div>
    <div id="likeButtonContainer"></div>
    
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantContainer = document.querySelector('#restaurants-list');
    const restaurant = await RestaurantSource.detailRestaurant(url.id);

    const createRestaurantDetailTemplate = (restaurant) => `
    <div class="restaurant-detail">
    <h2 class="restaurant__title">${restaurant.name}</h2>
    <img
    crossorigin="anonymous"
    class="restaurant__poster lazyload"
    data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}"
    alt="${restaurant.name}"
  />
      <span class="restaurant__rating">⭐️ ${restaurant.rating}</span>
    <div class="restaurant__info">
      <h4>City : <span>${restaurant.city}<span></h4>
      <h4>Address : <span>${restaurant.address}<span></h4>
      <h4>Description</h4>
      <p>${restaurant.description}</p>
      <h3>Menu</h3>
      <div class="restaurant__menu">
        <h4>Food Menu</h4>
        <ul>
          ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
        </ul>
        <h4>Drink Menu</h4>
        <ul>
          ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
        </ul>
      </div>
    </div>
     <h3>Customer Reviews</h3>
    <ul class="restaurant__reviews">
${restaurant.customerReviews.map((review) => `
  <li class="reviewsItem">
    <h4 class="contentName">${review.name}</h4>
    <p class="contentReview">${review.review}</p>
  </li>
`).join('')}
</ul>
  </div>
  `;

    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestoIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
        description: restaurant.description,
      },
    });

    const reviewForm = document.getElementById('review-form');
    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('review-name');
      const textInput = document.getElementById('review-text');

      const name = nameInput.value.trim();
      const reviewText = textInput.value.trim();

      if (name !== '' && reviewText !== '') {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const restaurant = await RestaurantSource.detailRestaurant(url.id);

        const newReview = {
          id: restaurant.id,
          name,
          review: reviewText,
        };

        try {
          await fetch(API_ENDPOINT.REVIEW, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReview),
          });

          nameInput.value = '';
          textInput.value = '';

          Detail.afterRender();
        } catch (error) {
          console.error(error);
        }
      }
    });
  },
};

export default Detail;
