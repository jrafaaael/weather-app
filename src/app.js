// Imports
import "./CSS/style.css";
import {
    getLocation,
    getWeatherData,
    getRandomCity,
    getCurrentLocation
} from "./JS/geo.js";
import { printData } from "./JS/print";

// DOM Elements
const searchCity = document.getElementById('search');
const findLocation = document.getElementById('your-location');

// Variables
const OPTIONS = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

// Functions
const render = async ({lat, lon, name}) => {
    const weatherData = await getWeatherData({
        lat: lat,
        lon: lon
    });
    weatherData.name = name;
    printData({
        weatherData: weatherData
    });
}

const success = async pos => {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;

    const {
        name
    } = await getCurrentLocation({
        lat: latitude,
        lon: longitude
    });
    render({
        lat: latitude,
        lon: longitude,
        name: name
    });
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

// Code
searchCity.addEventListener('click', async e => {
    e.preventDefault();

    const {
        name,
        latitude,
        longitude
    } = await getLocation();
    render({
        lat: latitude,
        lon: longitude,
        name: name
    });
}, false);

findLocation.addEventListener('click', async e => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(success, error, OPTIONS)
}, false);

window.addEventListener('DOMContentLoaded', async () => {
    const randomCity = await getRandomCity();
    const {
        name,
        latitude,
        longitude
    } = await getLocation(randomCity);
    render({
        lat: latitude,
        lon: longitude,
        name: name
    });
}, false);