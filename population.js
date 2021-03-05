async function allCountryInfo() {

    try {
        const result = await axios.get(`https://restcountries.eu/rest/v2/all`);
        const allCountryInfo = result.data
        console.log(allCountryInfo)
    } catch(e) {
        console.error(e);
        const errorMessage = document.getElementById('errorMessage')
        errorMessage.textContent = 'Somethings going wrong, please try again';
    }
}

window.onload = (event) => {
    allCountryInfo();
};

function displayCountries(data) {
    for (let i = 0; i < data.length; i++) {
        const flagItem = document.createElement('li')
    }
}
