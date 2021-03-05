
/*const countryToSearch = 'Netherlands'*/

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchCountryInfo(searchBar.value);
        searchBar.value = '';
    }
});

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener('click', () => {
    fetchCountryInfo(searchBar.value);
    searchBar.value = '';
});

/*const countryContainer = document.getElementById("countryContainer")*/

async function fetchCountryInfo(input) {

    try {
        const result = await axios.get(`https://restcountries.eu/rest/v2/name/${input}?fullText=true`);
        const countryInfo = result.data[0]
        console.log(countryInfo)
        displayFlag(countryInfo)
        displayCountryInfo(countryInfo)
    } catch(e) {
        console.error(e);
        invalidCountry();
    }
}

function invalidCountry() {
    const errorMessage = document.getElementById('errorMessage')
    errorMessage.textContent = 'This is not a valid country in this database, try something else?';
    const imageElement = document.getElementById("flagImage");
    imageElement.src = '';
    imageElement.alt = '';
    const countryName = document.getElementById('countryName')
    countryName.textContent = '';
    const locationPopulation = document.getElementById('locationPopulation');
    locationPopulation.textContent = '';
    const capitalCurrencys = document.getElementById('capitalCurrency');
    capitalCurrencys.textContent = '';
    const languages = document.getElementById('languages');
    languages.textContent = '';
}

function displayCountryInfo(countryInfo) {
    const errorMessage = document.getElementById('errorMessage')
    errorMessage.textContent = ''
    const countryName = document.getElementById('countryName')
    countryName.textContent = countryInfo.name;
    /*console.log(countryInfo.name + ' is situated in ' + countryInfo.subregion + '. It has a population of ' + countryInfo.population + ' people.');*/
    const locationPopulation = document.getElementById('locationPopulation');
    locationPopulation.textContent = countryInfo.name + ' is situated in ' + countryInfo.subregion + '. It has a population of ' + countryInfo.population + ' people.';
    /*console.log('The capital city is ' + countryInfo.capital + displayCurrencies(countryInfo.currencies));*/
    const capitalCurrencys = document.getElementById('capitalCurrency');
    capitalCurrencys.textContent = 'The capital city is ' + countryInfo.capital + displayCurrencies(countryInfo.currencies);
    /*console.log(displayLanguages(countryInfo.languages));*/
    const languages = document.getElementById('languages');
    languages.textContent = displayLanguages(countryInfo.languages);
}

function displayCurrencies(currencyArray) {
    let currencyString = '';
    if (currencyArray.length === 1) {
        currencyString = ' and you can pay with ' + currencyArray[0].name + "'s.";
        return currencyString;
    } else {
        currencyString = ' and you can pay with ' + currencyArray[0].name + "'s and " + currencyArray[1].name + "'s.";
        return currencyString;
    }
}

function displayLanguages(languagesArray) {
    let languagesString = '';
    if (languagesArray.length === 1) {
        languagesString = 'They speak ' + languagesArray[0].name + '.';
        return languagesString;
    } else if (languagesArray.length === 2) {
        languagesString = 'They speak ' + languagesArray[0].name + ' and ' + languagesArray[1].name + '.';
        return languagesString;
    } else {
        languagesString = 'They speak ' + languagesArray[0].name + ', ' + languagesArray[1].name + ' and ' + languagesArray[2].name + '.';
        return languagesString;
    }
}

function displayFlag(countryInfo) {
    const imageElement = document.getElementById("flagImage");
    imageElement.src = countryInfo.flag;
    imageElement.alt = countryInfo.demonym + ' flag.'
}