/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const assert = require('assert');

Feature('Review Restaurant');
Before(({ I }) => {
  I.amOnPage('/');

  I.click(locate('.restaurant-card h4 a').at(2));
});

Scenario('Reviewing a Restaurant', async ({ I }) => {
  const name = 'jhon, review at';
  const review = 'review content at';

  I.wait(2);
  I.seeElement('.review-container');

  I.wait(2);
  I.fillField('#review-name', name);
  I.fillField('#review-text', review);
  I.click('#btn-submit');
  // I.amOnPage('/');
  // I.wait(2);
  // I.click(locate('.restaurant-card h4 a'));

  I.wait(4);
  const newName = await I.grabTextFrom(
    locate('.reviewsItem .contentName').last(),
  );
  const newReview = await I.grabTextFrom(
    locate('.reviewsItem .contentReview').last(),
  );

  I.wait(2);
  assert.strictEqual(`${name}`, newName);
  assert.strictEqual(`${review}`, newReview);
});
