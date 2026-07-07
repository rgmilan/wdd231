const url =
    "https://api.open-meteo.com/v1/forecast?latitude=10.3157&longitude=123.8854&current=temperature_2m,relative_humidity_2m,weather_code&timezone=Asia%2FManila";

const temperature = document.querySelector("#temperature");
const humidity = document.querySelector("#humidity");
const condition = document.querySelector("#condition");

function weatherDescription(code) {
    if (code === 0) return "Clear Sky";
    if (code <= 3) return "Partly Cloudy";
    if (code <= 48) return "Fog";
    if (code <= 67) return "Rain";
    if (code <= 77) return "Snow";
    if (code <= 82) return "Rain Showers";
    if (code <= 99) return "Thunderstorm";
    return "Unknown";
}

async function getWeather() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        temperature.textContent = `${data.current.temperature_2m} °C`;
        humidity.textContent = `${data.current.relative_humidity_2m}%`;
        condition.textContent = weatherDescription(data.current.weather_code);
    } catch (error) {
        console.log(error);
        temperature.textContent = "--";
        humidity.textContent = "--";
        condition.textContent = "Weather unavailable";
    }
}

getWeather();