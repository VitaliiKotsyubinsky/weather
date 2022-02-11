
const searchInp = document.querySelector('.weather-search-box')
searchInp.addEventListener('keypress', setQuery)

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchInp.value)

    }
}



function getResults(query) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&cnt=3&units=metric&appid=fbd1c187f058db0d48e533deb9ed41aa`)
        .then(weather => {
            return weather.json()
        }).then(displayResults)
}

function displayResults(weather) {

    let city = document.querySelector('.location .city')
    city.innerText = `${weather.name}, ${weather.sys.country}`

    console.log(weather)
    let now = new Date()
    let date = document.querySelector('.location .main-date')
    date.innerText = dateBuilder(now)

    let temp = document.querySelector('.location .main-temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span >`

    let hilow = document.querySelector('.location .main-hi-low ')
    hilow.innerText = `${weather.main.temp_min}°c / ${weather.main.temp_max} °c`

    let icon = document.querySelector('.location .weather-icon')
    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.weather[0]['icon']}@2x.png">`

    let mainWeather = document.querySelector('.location .main-weather')
    mainWeather.innerText = `${weather.weather[0]['main']}`
}



function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year} `;
}







