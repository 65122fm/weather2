const switchButton = document.getElementById('switcher');
const switchCircle = document.getElementById('circle');
const switchLabel = document.getElementById('switcher-label');
const switchFirstPhoto = document.querySelector('.sunRise img'); 
const switchSecondPhoto = document.querySelector('.sunSet img');
const searchInp = document.getElementById('searchInp');
const searchBtn = document.getElementById('searchBtn');
const currencytemp = document.querySelector('.current-temp');
const feelslike = document.querySelector('.feels-like');
const sunRiseTime = document.getElementById('sunRiseTime');
const sunSetTime = document.getElementById('sunSetTime');
const cityName = document.getElementById('city-name');
const weatherImage = document.getElementById('fa-weather');
const weatherMain = document.getElementById('weather-main');
const dateElement = document.getElementsByClassName('date')[0];
const currentTime = document.getElementById('current-time');
const weatherWindDetails = document.querySelectorAll('.detail span');
const locationBtn = document.querySelector('.current-location');
const fiveDaysForecast = document.getElementById('fiveDaysForecast');
const hourlyForecast = document.getElementById('hourlyForecast');
const hourlyItem = document.querySelectorAll('.hourly-item');
for (let n=0 ; n<3 ;n++) {  
    hourlyItem[n].style.backgroundImage = 'linear-gradient(170.72deg, #F88508 -12.41%, rgba(246, 250, 217, 0) 163.32%)'
    }
for (let m=0 ; m<2 ;m++) {  
    hourlyItem[m+3].style.backgroundImage = 'linear-gradient(173.7deg, rgb(92 78 156) -15.92%, rgba(101, 130, 198, 0) 192.45%)'
    }

switchButton.addEventListener('click', () => {
    if (switchCircle.classList.contains('passive')) {
        switchCircle.classList.remove('passive');
        switchCircle.classList.add('active');
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        switchLabel.textContent = 'Dark Mode';
        for (let a=0 ; a<5 ;a++) { 

            hourlyItem[a].style.backgroundColor = 'rgba(55, 54, 54, 1)'
            hourlyItem[a].style.backgroundImage = 'none'

        }
        
        switcher.style.backgroundColor = 'black'
        fiveDaysForecast.style.color = 'white'
        hourlyForecast.style.color = 'white'
        circle.style.transform = 'translateX(48px) translateY(-10px)'
        
        document.querySelectorAll('h2, p, span').forEach(element => {
            element.style.color = "white"; 
        });
        
        switchFirstPhoto.src = './image/SunRise.png';
        switchSecondPhoto.src = './image/SunSet.png';
    } else {
        switchCircle.classList.remove('active');
        switchCircle.classList.add('passive');
        switcher.style.backgroundColor = 'white'
        fiveDaysForecast.style.color = 'black'
        hourlyForecast.style.color = 'black'
        for (let n=0 ; n<3 ;n++) {  
            hourlyItem[n].style.backgroundColor ='white'
            hourlyItem[n].style.backgroundImage = 'linear-gradient(170.72deg, #F88508 -12.41%, rgba(246, 250, 217, 0) 163.32%)'
            }
        for (let m=0 ; m<2 ;m++) {  

            hourlyItem[m+3].style.backgroundColor = 'white'
            hourlyItem[m+3].style.backgroundImage = 'linear-gradient(173.7deg, rgb(92 78 156) -15.92%, rgba(101, 130, 198, 0) 192.45%)'
            }
        
        
        circle.style.transform = 'translateX(0px) translateY(-10px)'
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        switchLabel.textContent = 'Light Mode';
        
        document.querySelectorAll('h2, p, span').forEach(element => {
            element.style.color = "black";
        });
        
        switchFirstPhoto.src = './image/darkSunRise.png';
        switchSecondPhoto.src = './image/darkSunSet.png';
    }
});

searchBtn.addEventListener('click', function () {
    const cityname = searchInp.value;
    fetchWeatherData(cityname);
    fetchWeatherData2(cityname);
});


function errorCallback(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert('Location access denied by user.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
        default:
            alert('An unknown error occurred.');
            break;
    }
}
locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});
function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    fetchWeatherByCoordinates(latitude, longitude)
    fetchWeatherForecastByCoordinates(latitude, longitude);
}

async function fetchWeatherByCoordinates(latitude, longitude) {
    const api_key = '978e72fc1701496cb3f0ccf8933c0393';
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        const CityNames = data.name;
        const tempCelsius = data.main.temp;
        const feelsLikeCelsius = data.main.feels_like;
        const sunRiseUnix = data.sys.sunrise;
        const sunSetUnix = data.sys.sunset;
        const currentTimeUnix = data.dt;
        const windSpeed = data.wind.speed;
        const humidity = data.main.humidity;
        const pressure = data.main.pressure;
        
        const tempFahrenheit = (tempCelsius * 9 / 5) + 32;
        const sunRiseReadable = new Date(sunRiseUnix * 1000).toLocaleTimeString();
        const sunSetReadable = new Date(sunSetUnix * 1000).toLocaleTimeString();
        const currentTimeReadable = new Date(currentTimeUnix * 1000).toLocaleTimeString();
    
        weatherWindDetails[0].innerHTML = `${humidity}%`;    
        weatherWindDetails[1].innerHTML = `${windSpeed} km/h`; 
        weatherWindDetails[2].innerHTML = `${pressure} hPa`;  
        currentTime.innerHTML = currentTimeReadable;
        cityName.innerHTML = CityNames;
        currencytemp.innerHTML = `${tempFahrenheit.toFixed(1)}°F`;
        feelslike.innerHTML = `Feels like: ${feelsLikeCelsius.toFixed(1)}°C`;
        sunRiseTime.innerHTML = sunRiseReadable;
        sunSetTime.innerHTML = sunSetReadable;

    } catch (error) {
        console.error("Error:", error);
    }
}

async function fetchWeatherForecastByCoordinates(latitude, longitude) {
    const api_key = '978e72fc1701496cb3f0ccf8933c0393';
    const apiURL_2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`;

    try {
        const response = await fetch(apiURL_2);
        const data1 = await response.json();

        const iconCode = data1.list[0].weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.jpeg`;
        iconUrl.style.imageRendering = 'crisp-edges'; // Yüksək keyfiyyətli və kəskin görüntü üçün
        iconUrl.style.imageRendering = 'pixelated'; // Piksel şəklində görüntü üçün        
        weatherImage.src = iconUrl;

        const date1 = data1.list[0].dt_txt;
        const dateTxt = new Date(date1).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' });
        dateElement.innerHTML = dateTxt; 
        
        const weatherMain1 = data1.list[0].weather[0].main;
        weatherMain.innerHTML = weatherMain1;

        for (let i = 0; i < 5; i++) {
            const iconCode1 = data1.list[i * 8].weather[0].icon;
            const imageElement = document.querySelectorAll('.fiveDaysImage')[i];            
            imageElement.src = `http://openweathermap.org/img/wn/${iconCode1}.png`; 

            const airTemperature = document.querySelectorAll('.airTemp')[i];
            airTemperature.innerHTML = `${data1.list[i * 8].main.temp.toFixed(1)}°C`;

            const dateTxt = new Date(data1.list[i * 8].dt_txt).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' });
            const monthDay = document.querySelectorAll('.monthDay')[i];
            monthDay.innerHTML = dateTxt;
        }

        for (let j = 0; j < 5; j++) {       
            const iconCode2 = data1.list[j].weather[0].icon;
            const hourlyIcon = document.querySelectorAll('.HourlyIcon')[j];
            hourlyIcon.src = `http://openweathermap.org/img/wn/${iconCode2}.png`;

            const hourlyWindSpeed = document.querySelectorAll('.hourlyWindSpeed')[j];
            hourlyWindSpeed.innerHTML = `${data1.list[j].wind.speed} km/h`;

            const hourlyTemp = document.querySelectorAll('.hourlyTemp')[j];
            hourlyTemp.innerHTML = `${data1.list[j].main.temp.toFixed()}°C`;
        }

    } catch (error) {
        console.error("Error:", error);
    }
}


async function fetchWeatherData(cityname) {
    const api_key = '978e72fc1701496cb3f0ccf8933c0393';
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${api_key}&units=metric`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        console.log(data);

        const CityNames = data.name;
        const tempCelsius = data.main.temp;
        const feelsLikeCelsius = data.main.feels_like;
        const sunRiseUnix = data.sys.sunrise;
        const sunSetUnix = data.sys.sunset;
        const currentTimeUnix = data.dt;
        const windSpeed = data.wind.speed;
        const humidity = data.main.humidity;
        const pressure = data.main.pressure;
        
        
        const tempFahrenheit = (tempCelsius * 9 / 5) + 32;
        const sunRiseReadable = new Date(sunRiseUnix * 1000).toLocaleTimeString();
        const sunSetReadable = new Date(sunSetUnix * 1000).toLocaleTimeString();
        const currentTimeReadable = new Date(currentTimeUnix * 1000).toLocaleTimeString();
    
        weatherWindDetails[0].innerHTML = `${humidity}%`;    
        weatherWindDetails[1].innerHTML = `${windSpeed} km/h`; 
        weatherWindDetails[2].innerHTML = `${pressure} hPa`;  
        currentTime.innerHTML = currentTimeReadable;
        cityName.innerHTML = CityNames;
        currencytemp.innerHTML = `${tempFahrenheit.toFixed(1)}°F`;
        feelslike.innerHTML = ` Feels like: ${feelsLikeCelsius.toFixed(1)}°C`;
        sunRiseTime.innerHTML = sunRiseReadable;
        sunSetTime.innerHTML = sunSetReadable;

    } catch (error) {
        console.error("Error:", error);
    }
}

async function fetchWeatherData2(cityname) {
    const api_key = '978e72fc1701496cb3f0ccf8933c0393';
    const apiURL_2 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${api_key}&units=metric`;

    try {
        const response = await fetch(apiURL_2);
        const data1 = await response.json();
        console.log(data1);

        const iconCode = data1.list[0].weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
        weatherImage.src = iconUrl;

        const date1 = data1.list[0].dt_txt;
        const dateTxt = new Date(date1).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' });
        dateElement.innerHTML = dateTxt; 
        
        const weatherMain1 = data1.list[0].weather[0].main;
        weatherMain.innerHTML = weatherMain1;

        const weatherImage1 = data1.list[0].weather[0].main;
        weatherImage.innerHTML = weatherImage1;

         for (let i = 0; i < 5; i++) {
            const iconCode1 = data1.list[i * 8].weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode1}.png`;
            const imageElement = document.querySelectorAll('.fiveDaysImage')[i];            
            imageElement.src = iconUrl; 

            const airTemperature = document.querySelectorAll('.airTemp')[i]
            airTemperature.innerHTML = `${data1.list[i * 8].main.temp.toFixed(1)}°C`;

            const dateTxt = new Date(data1.list[i * 8].dt_txt).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' });
            const monthDay = document.querySelectorAll('.monthDay')[i]

            monthDay.innerHTML = dateTxt;
        }
        for (let j = 0; j < 5; j++) {       
            const iconCode2 = data1.list[j].weather[0].icon;
            const iconUrl2 = `http://openweathermap.org/img/wn/${iconCode2}.png`  
            const hourlyIcon = document.querySelectorAll('.HourlyIcon')[j]
            hourlyIcon.src = iconUrl2

            const  hourlyWindSpeed = document.querySelectorAll('.hourlyWindSpeed')[j]
            speedWind = data1.list[j].wind.speed;
            hourlyWindSpeed.innerHTML = `${speedWind}km/h`;

            const hourlyTemp = document.querySelectorAll('.hourlyTemp')[j]
            TempHourly = data1.list[j].main.temp;
            hourlyTemp.innerHTML =`${TempHourly.toFixed()}°C`
        }

    } catch (error) {
        console.error("Error:", error);
    }
}