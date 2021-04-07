// Imports
import { printCurrentData } from "./modules/print_current_data.js";
import { printHourlyData } from "./modules/print_hourly_data.js";
import { printDailyData } from "./modules/print_daily_data";

// DOM Elements
const loader = document.getElementById('loader');

// Exports
export const printData = ({ weatherData }) => {
    printCurrentData({
        currentWeatherData: weatherData.current,
        name: weatherData.name,
        timezone: weatherData.timezone
    });
    printHourlyData({
        hourlyWeatherData: weatherData.hourly,
        timezone: weatherData.timezone
    });
    printDailyData({
        dailyWeatherData: weatherData.daily,
        timezone: weatherData.timezone
    });

    document.body.style.overflow = 'auto';
    loader.style.display = 'none';
}