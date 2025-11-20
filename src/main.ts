/*const button = document.getElementById('searchBtn').addEventListener('click', () => {
    const place = document.getElementById('location').value.trim();
    if (!place) {
        alert('Please enter a location');
        return;
    }*/

    const apiKey = 'ef7bd83347a8281a66186625304688ba'; // Replace with your OpenWeatherMap API key
    const url ='https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={apiKey}';

    // Show loading message
    /*document.getElementById('result').innerHTML = '<p>Loading...</p>';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('result').innerHTML = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                `;
            } else {
                document.getElementById('result').innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerHTML = `<p>Something went wrong!</p>`;
        });
});*/
