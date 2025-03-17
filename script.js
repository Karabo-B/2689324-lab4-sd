/*document.getElementById("btn_submit").addEventListener("click",fetchdata); //event listener for the submit button
async function fetchdata() {
    const url="https://restcountries.com/";
    const cName= document.getElementById("cname"); //fetching the country name from user input
   const country_info=document.getElementById("countryinfo");
    const bordering_c=document.getElementById("bordering-countries");

    try{
        const response= await fetch(url+"v3.1/name/"+cName);
        if (!response.ok){
            throw new Error("Selected country not found!");
        }
        const json= await response.json(); //extract JSON from the response
        console.log(json);
        //document,getElementById("country-data").innerHTML=json;
        const img = document.createElement('img');
        img.classList.add('flag');
        img.setAttribute('src', json[0].flag);
        img.setAttribute('alt', "flag-img");

    }

 

    

}*/

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn_submit").addEventListener("click", fetchCountryData);
});

async function fetchCountryData() {
    const countryName = document.getElementById("cname").value.trim();

    if (!countryName) {
        alert("Please enter a country name.");
        return;
    }

    const countryInfoSection = document.getElementById("country-data");
    const borderingCountriesSection = document.getElementById("bordering-countries");

    // Clear previous data
    countryInfoSection.innerHTML = "Loading...";
    borderingCountriesSection.innerHTML = "";

    try {
        console.log(`Fetching data for country: ${countryName}`);

        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);

        if (!response.ok) {
            throw new Error(`Country not found (${response.status})`);
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            throw new Error("No country data found.");
        }

        const countryData = data[0];
        console.log("Country Data:", countryData);

        // Extract necessary details
        const capital = countryData.capital ? countryData.capital[0] : "N/A";
        const population = countryData.population.toLocaleString();
        const region = countryData.region;
        const flagURL = countryData.flags?.png || countryData.flags?.svg;
        const borders = countryData.borders || [];

        // Update country information section
        countryInfoSection.innerHTML = `
            <h3>${countryData.name.common}</h3>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Population:</strong> ${population}</p>
            <p><strong>Region:</strong> ${region}</p>
            <img src="${flagURL}" alt="Flag of ${countryData.name.common}" class="flag">
        `;

        // Fetch bordering countries if available
        if (borders.length > 0) {
            borderingCountriesSection.innerHTML = "<h3>Bordering Countries:</h3>";

            for (const borderCode of borders) {
                console.log(`Fetching border country: ${borderCode}`);

                const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`);
                const borderData = await borderResponse.json();

                if (!borderData || borderData.length === 0) {
                    console.warn(`No data found for border country code: ${borderCode}`);
                    continue;
                }

                const borderCountry = borderData[0];

                borderingCountriesSection.innerHTML += `
                    <p>${borderCountry.name.common}</p>
                    <img src="${borderCountry.flags?.png || borderCountry.flags?.svg}" alt="Flag of ${borderCountry.name.common}" class="flag">
                `;
            }
        } else {
            borderingCountriesSection.innerHTML = "<p>No bordering countries.</p>";
        }

    } catch (error) {
        console.error("Error fetching data:", error);
        countryInfoSection.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

