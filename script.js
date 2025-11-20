/*const lat = 12.9716; // Example: Bangalore latitude
const lon = 77.5946; // Example: Bangalore longitude
const apiKey = ef7bd83347a8281a66186625304688ba; // Replace with your actual key

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
 // Replace with your OpenWeatherMap API key
*/

let selectedUnit = "metric"; // Default is Celsius
const apiKey = "ef7bd83347a8281a66186625304688ba"; // Replace with your OpenWeatherMap API key
//  // Replace with your OpenWeatherMap API key

document.getElementById('searchBtn').addEventListener('click', () => {
    fetchWeather();
});

/*document.getElementById('units').addEventListener('change', () => {
    selectedUnit = document.getElementById('units').value;
    fetchWeather();
});*/
document.getElementById('units').addEventListener('change', () => {
    selectedUnit = document.getElementById('units').value;

    //  Update the text next to the gear icon dynamically
    const unitsLabel = document.querySelector('.units-text');
    if (unitsLabel) {
        unitsLabel.textContent = selectedUnit === 'metric' ? '°C' : '°F';
    }

    fetchWeather();
});

function fetchWeather() {
    const locationInput = document.getElementById('location').value.trim();

    if (locationInput === '') {
        document.getElementById('result').innerHTML = `<p>Please enter a location.</p>`;
        document.getElementById('details').innerHTML = '';
        return;
    }

    document.getElementById('result').innerHTML = `<p>Loading...</p>`;
    document.getElementById('details').innerHTML = '';

    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${locationInput}&limit=1&appid=${apiKey}`;

    fetch(geoUrl)
        .then(response => response.json())
        .then(geoData => {
            if (geoData.length === 0) {
                document.getElementById('result').innerHTML = `<p>City not found.</p>`;
                return;
            }

            const lat = geoData[0].lat;
            const lon = geoData[0].lon;

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${selectedUnit}`;

            return fetch(weatherUrl);
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.cod === 200) {
                const today = new Date();
                const options = { weekday: "long", month: "short", day: "numeric", year: "numeric" };
                const formattedDate = today.toLocaleDateString("en-US", options);

                // Blue box content
                document.getElementById("result").innerHTML = `
                    <div class="weather-left">
                        <h2>${data.name}, ${data.sys.country}</h2>
                        <p>${formattedDate}</p>
                    </div>
                    <div class="weather-right">
                       <img src = "Images/icon-sunny.webp">
                        <span class="temp">${Math.round(data.main.temp)}°</span>
                    </div>
                `;

                document.getElementById("details").innerHTML = `
                    <div class="detail-box">
                        <h4>Feels Like</h4>
                        <p>${Math.round(data.main.feels_like)}°</p>
                    </div>
                    <div class="detail-box">
                        <h4>Humidity</h4>
                        <p>${data.main.humidity}%</p>
                    </div>
                    <div class="detail-box">
                        <h4>Wind</h4>
                        <p>${Math.round(data.wind.speed)} ${selectedUnit === 'metric' ? 'km/h' : 'mph'}</p>
                    </div>
                    <div class="detail-box">
                        <h4>Precipitation</h4>
                        <p>${data.rain ? data.rain['1h'] + ' mm' : '0 mm'}</p>
                    </div>
                `;
            } else {
                document.getElementById('result').innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerHTML = `<p>Something went wrong!</p>`;
        });
}