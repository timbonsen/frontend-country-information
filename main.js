const button = document.getElementById('data-button');
button.addEventListener('click', getCountryData);

const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('keyup', setQuery)

const countryContainer = document.getElementById('countries');

let query = '';

function setQuery(e) {
  query = e.target.value;
  if (e.keyCode === 13) {
    getCountryData();
  }
}

function createLanguageDescription(languages) {
  return languages.reduce((acc, currentLanguage, index, array) => {
    if (array.length === 1 || index === 0) {
      return acc + currentLanguage.name;
    }
    if (index === array.length - 1) {
      console.log('should break out')
      return acc + ' and ' + currentLanguage.name;
    }

    if (index !== array.length - 1 && index !== 0) {
      console.log(index, 'I got here')
      return acc + ', ' + currentLanguage.name;
    }

  }, 'They speak ');
}

function createCurrencyDescription(currencies) {
  return currencies.reduce((accumulator, currentCurrency) => {
    return accumulator + `${currentCurrency.name}'s`;
  }, '')
}

async function getCountryData() {
  searchBar.value = '';

  try {
    const result = await axios.get(`https://restcountries.eu/rest/v2/name/${query}?fullText=true`);
    const countryInfo = result.data[0];

    console.log(countryInfo);

    const previousSearchResult = document.getElementById('country');

    if (previousSearchResult) {
      countryContainer.removeChild(previousSearchResult);
    }

    const country = document.createElement('div');
    country.setAttribute('id', 'country');

    const flag = document.createElement('img');
    flag.setAttribute('src', countryInfo.flag);
    country.appendChild(flag);

    const countryName = document.createElement('h1');
    countryName.textContent = countryInfo.name;
    country.appendChild(countryName);

    const population = document.createElement('p');
    population.textContent = `${countryInfo.name} is situated in ${countryInfo.subregion}. It has a population of ${countryInfo.population} people.`;
    country.appendChild(population);

    const capital = document.createElement('p');
    capital.textContent = `The capital is ${countryInfo.capital} and you can pay with ${createCurrencyDescription(countryInfo.currencies)}`;
    country.appendChild(capital);

    const languages = document.createElement('p');
    languages.textContent = createLanguageDescription(countryInfo.languages);
    country.appendChild(languages);

    countryContainer.appendChild(country);
  } catch(e) {
    console.error(e);
  }
}