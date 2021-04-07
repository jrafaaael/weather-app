// Imports
import moment from "moment";
import { tz } from "moment-timezone";

// DOM Elements
const day = document.querySelectorAll('.day');
const descriptionIcon = document.querySelectorAll('.description-img');
const pop = document.querySelectorAll('.pop-value');
const highTem = document.querySelectorAll('.higher-temp');
const lowTemp = document.querySelectorAll('.lower-temp');

// Functions
const render = ({ data, index, timezone }) => {
    const iconID = data.weather[0].icon;

    day[index].textContent = moment.tz(data.dt * 1000, timezone).format('dddd');
    descriptionIcon[index].src = `http://openweathermap.org/img/wn/${iconID}.png`;
    pop[index].textContent = data.pop + ' %';
    highTem[index].textContent = data.temp.max + ' K';
    lowTemp[index].textContent = data.temp.min + ' K';
}

// Exports
export const printDailyData = ({ dailyWeatherData, timezone }) => {
    const dailyData = dailyWeatherData.filter((_, i) => i > 0 && i < 5);
    dailyData.forEach((data, i) => {
        render({
            data: data,
            index: i,
            timezone: timezone
        })
    });
}