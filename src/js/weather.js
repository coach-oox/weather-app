const locationField = document.querySelector(".location");
const tempField = document.querySelector(".temp");
const weatherIconField = document.querySelector(".icon");
const themeField = document.querySelector(".theme");

/* YOU NEED TO REPLACE THIS API_KEY WITH YOUR API_KEY (https://openweathermap.org/) */
const API_KEY = "ab02a730eb8b17b50cad0e69a96869a5";
/* YOU NEED TO REPLACE THIS API_KEY WITH YOUR API_KEY (https://openweathermap.org/) */

let ACTIVE_THEME = false;
const USER_LOCATION = "user-location";
const locationIcon = `<i class="fas fa-map-marker-alt"></i>`;
const themes = ["clear", "clouds", "dust", "rain", "snow"];

function changeTheme(weather) {
    const keyword = weather.toLowerCase();

    themes.forEach((theme) => {
        if (theme === keyword) {
            ACTIVE_THEME = true;
        }
    });

    const image = document.createElement("img");

    if (ACTIVE_THEME) image.src = `./images/${keyword}.jpg`;
    else image.src = "./images/default.jpg";

    themeField.appendChild(image);
}

function displayWeather(weather) {
    const image = document.createElement("img");
    image.src = `http://openweathermap.org/img/wn/${weather}@2x.png`;
    weatherIconField.appendChild(image);
}

function getLocation(userLocation) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${API_KEY}&units=metric`
    )
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            displayWeather(json.weather[0].icon);
            changeTheme(json.weather[0].main);
            tempField.innerText = Math.round(json.main.temp) + "°C"; // displayTemp
            locationField.innerHTML = locationIcon + `${json.name}`; // displayLocation
        });
}

function errorLocation() {
    console.warn("Location Error");
}

function saveLocation(position) {
    const userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    };

    localStorage.setItem(USER_LOCATION, JSON.stringify(userLocation));
    getLocation(userLocation);
}

function main() {
    const userLocation = JSON.parse(localStorage.getItem(USER_LOCATION));

    if (userLocation) {
        getLocation(userLocation);
    } else {
        navigator.geolocation.getCurrentPosition(saveLocation, errorLocation); // askLocation
    }
}

main();
