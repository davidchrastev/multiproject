function attachEvents() {
    const apiKey = '5db261d52100e489bc5f62a18ed7b485';
    const apiUrl  = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
    const temp = document.querySelector('.temp');
    const humidity = document.querySelector('.humidity');
    const windSpeed = document.querySelector('.wind');
    const input = document.querySelector('.search input');
    const searchBtn = document.querySelector('.search button');
    const weatherIcon = document.querySelector('.weather-icon');

    searchBtn.addEventListener('click', ()=> {
        checkWeather(input.value);

    })
     async function checkWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status === 404) {
            document.querySelector('.error').style.display = 'block';
            document.querySelector('.weather').style.display = 'none';
        }

        let data = await response.json();

        document.querySelector('.city').innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp) + '°c';
        humidity.innerHTML = data.main.humidity + '%';
        windSpeed.innerHTML = data.wind.speed + ' km/h';

        if (data.weather[0].main === 'Clouds') {
            weatherIcon.src = 'images/clouds.png';
        } else if (data.weather[0].main === 'Clear') {
            weatherIcon.src = 'images/clear.png';
        } else if (data.weather[0].main === 'Rain') {
            weatherIcon.src = 'images/rain.png';
        } else if (data.weather[0].main === 'Drizzle') {
            weatherIcon.src = 'images/drizzle.png';
        } else if (data.weather[0].main === 'Mist') {
            weatherIcon.src = 'images/mist.png';
        }

        console.log(data);
        document.querySelector('.weather').style.display = 'block';
        input.value = '';
    }


}


attachEvents();