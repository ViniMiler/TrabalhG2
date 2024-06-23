const apiKey = "6106db48a71b7688c155be0128799683";
const apiCountryURL = "https://flagsapi.com/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descriptionElement = document.querySelector("#description")
const weathericonElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")

const weatherContainer = document.querySelector("#weather-data");



//Funções
const getWeatherData = async(city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

     const res = await fetch(apiWeatherURL);
     const data = await res.json();

     return data

}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descriptionElement.innerText = data.weather[0].description;
    weathericonElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      );
      countryElement.setAttribute("src", apiCountryURL + data.sys.country + "/flat/64.png");
      humidityElement.innerText = `${data.main.humidity}%`;
      windElement.innerText = `${data.wind.speed}km/h`;

      weatherContainer.classList.remove("hide");

};


// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const city = cityInput.value;

    showWeatherData(city);
})

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
    const city = e.target.value;

    showWeatherData(city);
    }
})