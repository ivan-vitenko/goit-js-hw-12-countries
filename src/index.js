import './styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import countriesListTemplate from './templates/countries-list.hbs';
import countryTemplate from './templates/country.hbs';
import CountriesApiService from './js/fetchCountries';
import { alert, notice, info, success, error } from '@pnotify/core';

import Debounce from 'lodash.debounce';

const countriesApiService = new CountriesApiService();

const refs = {
  bodyEl: document.querySelector('body'),
  inputEl: document.querySelector('.country-search-field'),
};

refs.inputEl.addEventListener('input', Debounce(onSearch, 500));

function onSearch(event) {
  clearOldSearchResults();

  countriesApiService.query = event.target.value;

  if (countriesApiService.query) {
    countriesApiService.fetchCountries().then(createCountriesList);
  }
}

function clearOldSearchResults() {
  removeOldElement(document.querySelector('.countries-list'));
  removeOldElement(document.querySelector('.country-container'));
}

function removeOldElement(element) {
  if (element) {
    element.remove();
  }
}

function createCountriesList(countriesList) {
  if (countriesList.length > 10) {
    error({
      text: 'Результат пошуку надто великий. Зробіть запит більш унікальним!',
    });
    return;
  }

  if (countriesList.length === 1) {
    refs.bodyEl.insertAdjacentHTML('beforeend', countryTemplate(countriesList));
    success({
      text: 'Ура! Країну знайдено :)',
    });
    return;
  }

  refs.bodyEl.insertAdjacentHTML(
    'beforeend',
    countriesListTemplate(countriesList),
  );
  info({
    text: 'Виведено список країн за запитом.',
  });
}
