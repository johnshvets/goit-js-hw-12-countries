const BASE_URL = 'https://restcountries.eu/rest/v2/';

function fetchCountries(searchQuery) {
  const countries = fetch(`${BASE_URL}name/${searchQuery}`).then(response => {
    if (response.ok) {
      return response.json();
    }
  });

  return countries;
}

export default fetchCountries;
