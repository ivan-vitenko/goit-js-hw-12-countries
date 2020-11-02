export default class CountriesApiService {
  constructor(searchQuery) {
    this.searchQuery = '';
  }

  fetchCountries() {
    return fetch(`https://restcountries.eu/rest/v2/name/${this.searchQuery}`)
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
