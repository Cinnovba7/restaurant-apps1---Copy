/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */
import LikeButtonInitiator from '../../src/scripts/utils/like-button';
import FavoriteRestoIdb from '../../src/public/data/favorite-idb';

const createLikeButtonPresenterWithResto = async (restaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestaurants: FavoriteRestoIdb,
    restaurant,
  });
};
export { createLikeButtonPresenterWithResto };
