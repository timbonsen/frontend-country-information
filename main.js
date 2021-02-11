
const countryToSearch = 'Netherlands'

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener('click', () => {fetchCountryInfo(countryToSearch)} );

/*const countryContainer = document.getElementById("countryContainer")*/

async function fetchCountryInfo() {

    try {
        const result = await axios.get(`https://restcountries.eu/rest/v2/name/${countryToSearch}?fullText=true`);
        const countryInfo = result.data[0]
        console.log(countries);
    } catch(e) {
        console.error(e);
    }
}