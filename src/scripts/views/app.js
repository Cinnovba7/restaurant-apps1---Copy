/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import CONFIG from '../globals/config';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();

    const skipLinkElem = document.querySelector('.skip-link');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#mainContent').focus();
    });

    const buttonHero = document.querySelector('.hero-button');
    buttonHero.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#mainContent').focus();
    });
    document.addEventListener('window.onload', () => {
      const loadingIndicator = document.getElementById('loading');
      const errorIndicator = document.getElementById('error');
      const content = document.getElementById('#mainContent');

      function showLoading() {
        loadingIndicator.style.display = 'block';
        errorIndicator.style.display = 'none';
        content.style.display = 'none';
      }

      function showError() {
        loadingIndicator.style.display = 'none';
        errorIndicator.style.display = 'block';
        content.style.display = 'none';
      }

      function showContent(data) {
        loadingIndicator.style.display = 'none';
        errorIndicator.style.display = 'none';
        content.style.display = 'block';
        content.innerHTML = data;
      }

      function fetchData() {
        showLoading();

        fetch(CONFIG.BASE_URL)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((restaurants) => {
            showContent(restaurants);
          })
          .catch((error) => {
            showError();
            console.error('Fetch Error:', error);
          });
      }
      fetchData();
    });
  }
}
export default App;
