const locationEl = document.getElementById("location");
const dateEl = document.getElementById("date");
const tempEl = document.getElementById("temp");
const conditionEl = document.getElementById("condition");
const iconEl = document.getElementById("weather-icon");
const coolTagEl = document.getElementById("cool-tag");
const clockEl = document.getElementById("clock");

const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const precipEl = document.getElementById("precip");
const aqiEl = document.getElementById("aqi");
const forecastContainer = document.getElementById("forecast-container");

const weatherCodes = {
    0: { desc: "Clear Sky", icon: "☀️" },
    1: { desc: "Mainly Clear", icon: "🌤️" },
    2: { desc: "Partly Cloudy", icon: "⛅" },
    3: { desc: "Overcast", icon: "☁️" },
    45: { desc: "Fog", icon: "🌫️" },
    48: { desc: "Fog", icon: "🌫️" },
    51: { desc: "Drizzle", icon: "🌧️" },
    53: { desc: "Drizzle", icon: "🌧️" },
    55: { desc: "Heavy Drizzle", icon: "🌧️" },
    61: { desc: "Rain", icon: "☔" },
    63: { desc: "Rain", icon: "☔" },
    65: { desc: "Heavy Rain", icon: "☔" },
    71: { desc: "Snow", icon: "❄️" },
    73: { desc: "Snow", icon: "❄️" },
    75: { desc: "Heavy Snow", icon: "❄️" },
    95: { desc: "Thunderstorm", icon: "⚡" },
    96: { desc: "Thunderstorm", icon: "⚡" },
    99: { desc: "Thunderstorm", icon: "⚡" }
};

function getThermalSensation(temp) {
    if (temp >= 30) return "🔥 Hot";
    if (temp >= 20) return "😊 Pleasant";
    if (temp >= 10) return "🍃 Cool";
    return "❄️ Cold";
}

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
    clockEl.textContent = timeString;
}

function initApp() {
    setInterval(updateClock, 1000);
    updateClock();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                locationEl.textContent = `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;
                fetchWeatherData(lat, lon);
                fetchAirQuality(lat, lon);
            },
            () => {
                locationEl.textContent = "Location Denied";
                alert("Please allow location access.");
            }
        );
    } else {
        locationEl.textContent = "Geolocation not supported";
    }
}

async function fetchWeatherData(lat, lon) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
        const response = await fetch(url);
        const data = await response.json();
        updateCurrentWeather(data.current);
        updateForecast(data.daily);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function fetchAirQuality(lat, lon) {
    try {
        const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.current && data.current.us_aqi) {
            aqiEl.textContent = data.current.us_aqi;
        } else {
            aqiEl.textContent = "N/A";
        }
    } catch (error) {
        console.error("Error AQI:", error);
        aqiEl.textContent = "N/A";
    }
}

function updateCurrentWeather(current) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    const code = current.weather_code;
    const weatherInfo = weatherCodes[code] || { desc: "Unknown", icon: "❓" };

    tempEl.textContent = `${Math.round(current.temperature_2m)}°`;
    conditionEl.textContent = weatherInfo.desc;
    iconEl.textContent = weatherInfo.icon;
    coolTagEl.textContent = getThermalSensation(current.temperature_2m);

    humidityEl.textContent = `${current.relative_humidity_2m}%`;
    windEl.textContent = `${current.wind_speed_10m} km/h`;
    precipEl.textContent = `${current.precipitation} mm`;
}

function updateForecast(daily) {
    forecastContainer.innerHTML = "";
    for (let i = 0; i < 7; i++) {
        const dateStr = daily.time[i];
        const maxTemp = Math.round(daily.temperature_2m_max[i]);
        const minTemp = Math.round(daily.temperature_2m_min[i]);
        const code = daily.weather_code[i];
        const weatherInfo = weatherCodes[code] || { icon: "❓" };

        const dateObj = new Date(dateStr);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

        const row = document.createElement("div");
        row.classList.add("forecast-item");
        row.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <div class="forecast-icon">${weatherInfo.icon}</div>
            <div class="forecast-temp">${maxTemp}° / ${minTemp}°</div>
        `;
        forecastContainer.appendChild(row);
    }
}

initApp();
