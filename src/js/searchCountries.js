import API from './fetchCountries';
import countryCardTpl from '../templates/country-card.hbs';
import countriesCardTpl from '../templates/countries-card.hbs';
import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';

const refs = {
  countriesContainer: document.querySelector('#countries'),
  searchCountriesInput: document.querySelector('#country-input'),
};

refs.searchCountriesInput.addEventListener(
  'input',
  debounce(onInputChange, 500),
);

function onInputChange(e) {
  const searchQuery = e.target.value;
  refs.countriesContainer.innerHTML = '';

  API(searchQuery)
    .then(setCountriesMarkup)
    .catch(() => onFetchError('Something went wrong. Please try again.'));
}

function setCountriesMarkup(country) {
  let countriesMarkup = '';

  if (country.length > 1 && country.length <= 10) {
    countriesMarkup = countriesCardTpl(country);
  } else if (country.length === 1) {
    countriesMarkup = countryCardTpl(country[0]);
  } else {
    return onFetchError(
      'Too many matches found. Please enter a more specific query',
    );
  }

  return (refs.countriesContainer.innerHTML = countriesMarkup);
}

function onFetchError(str) {
  error({
    text: str,
    delay: 1500,
    width: '500px',
  });
}
