// sla de referentie op naar de zoek-button en zet er een event listener op die getCountryData aanroept
const button = document.getElementById('search-button');
button.addEventListener('click', getCountryData);

// sla de referentie op naar het input-veld en zet er een event listener op die setQuery aanroept
const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('keyup', setQuery)

// sla de referentie naar het "anker" element op waarin we alle landen gaan toevoegen
const countryContainer = document.getElementById('countries');

// maak query een globale variabele, zodat we deze zowel in de setQuery als in de getCountryData functie kunnen gebruiken
let query = '';

// geef het event object mee en haal de waarde eruit. Als er op 'enter' gedrukt wordt,
function setQuery(e) {
  query = e.target.value;
  if (e.keyCode === 13) {
    getCountryData();
  }
}

async function getCountryData() {
  // zorg ervoor dat als er een request gemaakt wordt, het zoekveldt leeggemaakt wordt
  searchBar.value = '';

  // sla de referentie naar onze error-message op en haal de tekst weg bij elke nieuwe zoekopdracht
  // (als er iets mis gaat, wordt 'ie in het catch blok opnieuw toegevoegd)
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = '';

  // sla de referentie op naar de country-container waarin de informatie van een land staat
  const previousSearchResult = document.getElementById('country');
  // als deze referentie bestaat (en er dus al een land op de pagina wordt weergegeven) dan halen we deze eerst weg
  if (previousSearchResult) {
    countryContainer.removeChild(previousSearchResult);
  }

  try {
    // maak een GET request naar het endpoint en voeg de searchquery als dynamische parameter in
    const result = await axios.get(`https://restcountries.eu/rest/v2/name/${query}?fullText=true`);
    // haal het land-object uit de response
    const countryInfo = result.data[0];

    console.log(countryInfo);

    // maak een country-container en geef hem de id country
    // (zodat we 'm de volgende keer kunnen herkennen en kunnen checken of er al een land op de pagina staat)
    const country = document.createElement('div');
    country.setAttribute('id', 'country');

    // maak de <img> tag om de vlag in weer te geven
    const flag = document.createElement('img');
    // stop de image url in het src attribuut van img
    flag.setAttribute('src', countryInfo.flag);
    country.appendChild(flag);

    // maak <h1> element voor de titel
    const countryName = document.createElement('h1');
    countryName.textContent = countryInfo.name;
    country.appendChild(countryName);

    // maak een <p> voor de informatie
    const population = document.createElement('p');
    population.textContent = `${countryInfo.name} is situated in ${countryInfo.subregion}. It has a population of ${countryInfo.population} people.`;
    country.appendChild(population);

    // maak een <p> voor nog meer informatie
    const capital = document.createElement('p');
    capital.textContent = `The capital is ${countryInfo.capital} and you can pay with ${createCurrencyDescription(countryInfo.currencies)}`;
    country.appendChild(capital);

    // maak een <p> voor de talen
    const languages = document.createElement('p');
    languages.textContent = createLanguageDescription(countryInfo.languages);
    country.appendChild(languages);

    // voeg de country <div> toe aan de countryContainer
    countryContainer.appendChild(country);
  } catch(e) {
    console.error(e);
    errorMessage.textContent = `${query} bestaat niet. Probeer het opnieuw!`;
  }
}

function createLanguageDescription(languages) {
  return languages.reduce((acc, currentLanguage, index, array) => {
    // als de array maar één entry heeft of als we bij de eerste entry zijn (geen kommma)
    if (array.length === 1 || index === 0) {
      return `${acc} ${currentLanguage.name}`;
    }
    // als we bij de laatste entry van de array zijn (voeg 'en ' toe)
    if (index === array.length - 1) {
      return `${acc} and ${currentLanguage.name}`;
    }

    // Alles wat tussen de eerste en de laatste entry ligt, voeg wel een komma toe:
    if (index !== array.length - 1 && index !== 0) {
      return `${acc}, ${currentLanguage.name}`;
    }

  }, 'They speak ');
}

function createCurrencyDescription(currencies) {
  return currencies.reduce((acc, currentCurrency, index, array) => {
    // als de array maar één entry heeft of als we bij de eerste entry zijn (geen kommma)
    if (array.length === 1 || index === 0) {
      return `${acc} ${currentCurrency.name}'s`;
    }
    // als we bij de laatste entry van de array zijn (voeg 'en ' toe)
    if (index === array.length - 1) {
      return `${acc} and ${currentCurrency.name}'s`;
    }

    // Alles wat tussen de eerste en de laatste entry ligt, voeg wel een komma toe:
    if (index !== array.length - 1 && index !== 0) {
      return `${acc}, ${currentCurrency.name}'s`;
    }

  }, 'and you can pay with');
}