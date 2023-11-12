/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.wait(2);
  I.amOnPage('/#/like');
  I.wait(2);
});
Scenario('showing empty liked restaurants', ({ I }) => {
  I.see('Your favorite list is empty. Add some restaurants to your favorites!', '.empty');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Your favorite list is empty. Add some restaurants to your favorites!', '.empty');
  I.amOnPage('/');

  I.wait(2);
  I.seeElement('.restaurant-card h4 a');
  const firstRestaurant = locate('.restaurant-card h4 a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.wait(2);
  I.click(firstRestaurant);
  I.wait(2);

  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.wait(2);

  I.wait(2);
  I.amOnPage('/#/like');
  I.wait(2);
  I.seeElement('.restaurant-list');

  I.wait(2);
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-card h4 a');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});
Scenario('Unliking one restaurant', async ({ I }) => {
  I.amOnPage('/');

  I.wait(2);
  I.waitForElement('.restaurant-card h4 a');
  I.seeElement('.restaurant-card h4 a');
  const firstRestaurant = locate('.restaurant-card h4 a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.wait(2);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.wait(2);
  I.amOnPage('#/like');
  I.wait(2);
  I.seeElement('.restaurant-card h4 a');

  const firstRestaurantLike = locate('.restaurant-card h4 a').first();
  const favoriteRestaurantTitle = await I.grabTextFrom(firstRestaurantLike);
  assert.strictEqual(firstRestaurantTitle, favoriteRestaurantTitle);

  I.click(firstRestaurantLike);
  I.seeElement('#likedButton');
  I.click('#likedButton');
  I.wait(2);
  I.amOnPage('#/like');
  I.wait(2);
  I.seeElement('.empty');
  const onFavorite = await I.grabTextFrom('.empty');
  assert.strictEqual(onFavorite, 'Your favorite list is empty. Add some restaurants to your favorites!');
});
