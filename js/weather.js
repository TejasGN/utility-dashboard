const weatherApi = "https://api.openweathermap.org/data/2.5/weather";
const weatherKey = "2e5a87faf746705d3301ad052cdf5cb0";
let city, country, temp, feelsLike, windSpeed, icon, humidity;
const domElements = ['city', 'country', 'temp', 'flslik', 'humdty', 'wndspd'];
let infoArray = [];

const setValues = (elem, val) =>{
    try{
        document.querySelector(elem).innerHTML = val;
    }
    catch(err){
        console.log("Error in setValues", err);
    }
};

const hideLoader = () => {
    try{
        document.querySelector('.preloader').style.display = "none";
        document.querySelector('.wthr-content').style.display = "block";
    }
    catch(err){
        console.log("Error in hideLoader", err);
    }
};

const setWeatherData = () => {
    try{
        document.querySelector('.wthr-img').src = "images/weathericons/" + icon + ".svg";
        for(let i = 0; i < domElements.length; i++){
            let currElem = '.' + domElements[i];
            let currVal = infoArray[i];
            setValues(currElem, currVal);
        }
        setTimeout(hideLoader, 700);
    }
    catch(err){
        console.log("Error in setWeatherData", err);
    }
};

(() => {
    try{
        const latitude = !!localStorage.getItem('lat') ? localStorage.getItem('lat') : "51.5074";
        const longitude = !!localStorage.getItem('lon') ? localStorage.getItem('lon') : "0.1278";
        fetch(`${weatherApi}?lat=${latitude}&lon=${longitude}&APPID=${weatherKey}&units=imperial`)
            .then(response => response.json()
            .then(data => {
                city = data.name;
                infoArray.push(city);
                country = data.sys.country;
                infoArray.push(country);
                temp = Math.round(data.main.temp);
                infoArray.push(temp);
                feelsLike = Math.round(data.main.feels_like);
                infoArray.push(feelsLike);
                humidity = data.main.humidity;
                infoArray.push(humidity);
                windSpeed = Math.round(data.wind.speed);
                infoArray.push(windSpeed);
                icon = data.weather[0].icon;
                setWeatherData();
            })
        );
    }
    catch(err){
        console.log("Error in weather IIFE", err);
    }
})();