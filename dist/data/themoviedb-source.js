/* eslint-disable linebreak-style */
import API_ENDPOINT from '../../scripts/globals/api-endpoint';

class RestaurantSource {
  static async getList() {
    try {
      const response = await fetch(API_ENDPOINT.HOME);
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      return error;
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (error) {
      return error;
    }
  }

  static async searchRestaurant(input) {
    try {
      const response = await fetch(API_ENDPOINT.SEARCH(input));
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      return error;
    }
  }
}
export default RestaurantSource;
