// Imports
import moment from "moment";
import { tz } from "moment-timezone";
import lottie from "lottie-web";
import { fetchData as getAnimation } from "../geo.js";

// DOM Elements
const locationName = document.getElementById('location-name');
const date = document.getElementById('date');
const animationContainer = document.getElementById('animation-container');
const iconDescription = document.getElementById('icon-description');
const temperature = document.getElementById('temperature');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');
const dewPoint = document.getElementById('dew-point');
const pressure = document.getElementById('pressure');

// Variables
const GENERIC_ICONS = {
    200: 'thunderstorm_rain',
    201: 'thunderstorm_rain',
    202: 'thunderstorm_rain',
    230: 'thunderstorm_rain',
    231: 'thunderstorm_rain',
    232: 'thunderstorm_rain',
    210: 'thunderstorm',
    211: 'thunderstorm',
    212: 'thunderstorm',
    221: 'thunderstorm',
    701: 'atmosphere',
    711: 'atmosphere',
    721: 'atmosphere',
    731: 'atmosphere',
    741: 'atmosphere',
    751: 'atmosphere',
    761: 'atmosphere',
    762: 'atmosphere',
    771: 'atmosphere',
    781: 'atmosphere',
    802: 'clouds',
    803: 'clouds',
    804: 'clouds',
};

// Functions
const setAnimation = async ({ path }) => {
    const animationJSON = await getAnimation(
        // `../assets/lottie_files/${path}.json`
        `./assets/lottie_files/${path}.json`
    );
    while (animationContainer.firstChild)
        animationContainer.firstElementChild.remove();

    lottie.loadAnimation({
        animationData: animationJSON,
        autoplay: true,
        container: animationContainer,
        loop: true,
        renderer: "svg"
    });
}

// Exports
export const printCurrentData = ({ name, currentWeatherData, timezone }) => {
    const now = currentWeatherData.dt * 1000;
    const sunrise = currentWeatherData.sunrise * 1000;
    const sunset = currentWeatherData.sunset * 1000;
    const currentDate = moment.tz(now, timezone).format('ddd., MMM. DD, YYYY hh:mm A');
    const iconID = currentWeatherData.weather[0].id;
    const condition = currentWeatherData.weather[0].main.toLowerCase();

    setAnimation({
        path: (
            GENERIC_ICONS.hasOwnProperty(iconID) ?
                `generic/${GENERIC_ICONS[iconID]}` : (
                    moment(now).isBetween(sunrise, sunset) ?
                        `day/${condition}` :
                        `night/${condition}`
                )
        )
    });

    locationName.textContent = name;
    date.textContent = currentDate;
    iconDescription.textContent = currentWeatherData.weather[0].description;
    iconDescription.title = currentWeatherData.weather[0].description;
    temperature.childNodes[0].nodeValue = currentWeatherData.temp;
    windSpeed.childNodes[0].nodeValue = currentWeatherData.wind_speed;
    humidity.textContent = currentWeatherData.humidity + '%';
    dewPoint.childNodes[0].nodeValue = currentWeatherData.dew_point;
    pressure.childNodes[0].nodeValue = currentWeatherData.pressure;
}