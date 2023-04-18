const weatherForm = document.getElementById('weather-form');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const locationInput = document.querySelector('input[name="location"]');
    const countryInput = document.querySelector('select[name="country"]');
    const unitsCheckbox = document.querySelector('input[name="units"]');

    const location = locationInput.value;
    const country = countryInput.value;
    const units = unitsCheckbox.checked ? 'imperial' : 'metric';

    const apiKey = 'b558db2f1896a1f4e7109a7c429822cd'
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location},${country}&units=${units}&appid=${apiKey}`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            displayWeatherData(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

function displayWeatherData(data) {
    const temperature = data.main.temp;
    const conditions = data.weather[0].description;
    const weatherInfo = document.createElement('div');   
    weatherInfo.classList.add('weather-info');
    const temperatureElem = document.createElement('div');
    temperatureElem.classList.add('temperature');
    temperatureElem.textContent = `${Math.round(temperature)}°`;
    const conditionsElem = document.createElement('div');
    conditionsElem.classList.add('conditions');
    conditionsElem.textContent = conditions;
    weatherInfo.appendChild(temperatureElem);
    weatherInfo.appendChild(conditionsElem);
    const mainElem = document.querySelector('main');
    mainElem.appendChild(weatherInfo);
};