document.getElementById("btn_submit").addEventListener("click",fetchdata); //event listener for the submit button
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

 

    

}