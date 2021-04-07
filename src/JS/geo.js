// Imports
import { getRandomNumber } from "./utils/random.js";

// Variables
const LOCATION_IQ_KEY = import.meta.env.SNOWPACK_PUBLIC_LOCATIONIQ_KEY;
const OPEN_WEATHER_KEY = import.meta.env.SNOWPACK_PUBLIC_OPENWEATHER_KEY;

// Functions
const fetchData = async url => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

const getPlaces = async location => {
    const CITY_TO_FIND = location ?? document.getElementById('city').value;
    if (CITY_TO_FIND) {
        return await fetchData(
            `https://us1.locationiq.com/v1/search.php?key=${LOCATION_IQ_KEY}&q=${CITY_TO_FIND}&format=json`
        );
    }
    else {
        return await fetchData(
            `https://us1.locationiq.com/v1/search.php?key=${LOCATION_IQ_KEY}&q=Calgary,CA&format=json`
        );
    }
}

const getLocation = async location => {
    const placesFound = await getPlaces(location);
    const city = placesFound.find(place =>
        place.type === 'city' ||
        place.type === 'state' ||
        place.type === 'administrative'
    );
    return {
        name: city.display_name,
        latitude: city.lat,
        longitude: city.lon
    }
}

const getCurrentLocation = async ({ lat, lon }) => {
    const location = await fetchData(
        `https://us1.locationiq.com/v1/reverse.php?key=${LOCATION_IQ_KEY}&lat=${lat}&lon=${lon}&format=json`
    );
    return {
        name: location.display_name
    };
}

const getRandomCity = async () => {
    const cities = await fetchData(
        `https://countriesnow.space/api/v0.1/countries/population/cities`
    );
    return cities.data[getRandomNumber(2500)].city;
}

const getWeatherData = async ({ lat, lon }) => {
    return await fetchData(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${OPEN_WEATHER_KEY}`
    );
}

// Exports
export {
    fetchData,
    getLocation,
    getWeatherData,
    getRandomCity,
    getCurrentLocation
}