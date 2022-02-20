
const searchInp = document.querySelector('.weather-search-box')
searchInp.addEventListener('keypress', setQuery)

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchInp.value)

    }
}



function getResults(query) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=fbd1c187f058db0d48e533deb9ed41aa`)
        .then(weather => {
            return weather.json()
        }).then(displayResults)
        .then(console.log)

}

function displayResults(weather) {

    let city = document.querySelector('.location .city')
    city.innerText = `${weather.city.name}, ${weather.city.country}`

    let now = new Date()
    let date = document.querySelector('.location .main-date')
    date.innerText = dateBuilder(now)

    let temp = document.querySelector('.location .main-temp')
    temp.innerHTML = `${Math.round(weather.list[0].main.temp)}<span>°c</span >`

    let hilow = document.querySelector('.location .main-hi-low ')
    hilow.innerText = `min ${Math.round(weather.list[0].main.temp_min)}°c / max ${Math.round(weather.list[0].main.temp_max)} °c`

    let icon = document.querySelector('.location .weather-icon')
    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.list[0].weather[0]['icon']}@2x.png">`

    let mainWeather = document.querySelector('.location .main-weather')
    mainWeather.innerText = `${weather.list[0].weather[0]['main']}`

    console.log(weather)



    let datesDiv = document.querySelectorAll('.dates')
    for (let i = 0; i < datesDiv.length; i++) {
        datesDiv[i].innerHTML = `${weather.list[i * 8].dt_txt}`
    }

    let weatherIconsDiv = document.querySelectorAll('.days .weather-icon')
    for (let i = 0; i < weatherIconsDiv.length; i++) {
        weatherIconsDiv[i].innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.list[i * 8].weather[0]['icon']}@2x.png">`
    }

    const obj = weather.list.reduce((obj, data) => {
        const date = data.dt_txt.slice(0, 10)
        obj[date] = [...obj[date] ?? [], data]
        return obj
    }, {})

    const forecastData = Object.values(obj)
    const myForecastData = []
    for (let i = 1; i < 5; i++) {
        let { dt_txt, main: { temp, temp_max, temp_min }, weather: [{ icon, description }] } = forecastData[i][5]
        temp = Math.round(temp)
        dt_txt = dt_txt.slice(0, 10)
        myForecastData.push({ dt_txt, temp, icon, temp_max, temp_min, description })
    }

    const dayDivs = document.querySelectorAll('.day')
    for (let i = 0; i < myForecastData.length; i++) {
        const { dt_txt, temp, icon, description } = myForecastData[i]
        dayDivs[i].innerHTML = `
            <div class="dates">${dt_txt}</div>
            <div class="weather-icon"><img src="http://openweathermap.org/img/wn/${icon}@2x.png"></div>
            <div class="temps">${temp}<spam>°c</spam></div>            
            <div class="weathers">${description}</div>          
        `
    }

    const myThreeHours = []
    for (let i = 1; i <= 3; i++) {
        let { dt_txt, main: { temp }, weather: [{ icon }] } = weather.list[i]
        temp = Math.round(temp)
        dt_txt = dt_txt.slice(11, 16)
        myThreeHours.push({ dt_txt, temp, icon })

    }

    const tempHoursDivs = document.querySelectorAll('.temp-hours')
    for (let i = 0; i < myThreeHours.length; i++) {
        const { dt_txt, temp, icon } = myThreeHours[i]
        tempHoursDivs[i].innerHTML = `
            <div class="temp-hours">${dt_txt} - ${temp}°c
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png">
            </div>`
    }

    function backgroundСhange() {
        let time = weather.list[0].dt_txt.slice(11, 13)
        if (time <= 18) {
            document.querySelector('.weather-wrapper').style.backgroundImage = 'url(/img/minimalizm-gora-gory-mesiats-peizazh-les-iolki-zvezdy-tuman_\(1\)-1024x576-MM-90.jpg)'
        } else {
            document.querySelector('.weather-wrapper').style.backgroundImage = 'url(./img/mountains-minimalism-1172552-wallhere.com.jpg)'
        }
        return backgroundСhange
    }


    return obj

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

let timeNow = document.querySelector('.time')
function getCurrentTimeString() {
    return new Date().toTimeString().replace(/ .*/, '')
}
setInterval(
    () => timeNow.innerHTML = getCurrentTimeString(), 1000
)









