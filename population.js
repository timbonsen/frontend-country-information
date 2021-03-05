async function allCountryInfo() {

    try {
        const result = await axios.get(`https://restcountries.eu/rest/v2/all`);
        const allCountryInfo = result.data
        console.log(allCountryInfo)
        for (let i = 0; i < allCountryInfo.length; i++) {
            printItem(allCountryInfo[i])
        }
    } catch(e) {
        console.error(e);
        const errorMessage = document.getElementById('errorMessage')
        errorMessage.textContent = 'Somethings going wrong, please try again';
    }
}

window.onload = (event) => {
    allCountryInfo();
};

function printItem(data) {
    const itemContainer = document.createElement("div");
    itemContainer.setAttribute("class", "itemContainer")
    const countryFlag = document.createElement("img");
    countryFlag.setAttribute("class", "countryFlag")
    countryFlag.srcset = `${data.flag}`
    const countryName = document.createElement("div");
    countryName.setAttribute("class", "countryName");
    countryName.textContent = `${data.name}`
    itemContainer.appendChild(countryFlag)
    itemContainer.appendChild(countryName)
    const countryList = document.getElementById("infoContainer");
    countryList.appendChild(itemContainer)
}