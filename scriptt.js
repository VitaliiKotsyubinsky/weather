// api.openweathermap.org / data / 2.5 / weather ? lat = { lat } & lon={ lon }& appid={API key }
// id=2172797

// fbd1c187f058db0d48e533deb9ed41aa
let tempBlock = document.querySelector('.main-temp')
let cityBlock = document.querySelector('.city')
let imgBlock = document.querySelector('.weather-icon')
let update_date = document.querySelector('#update-date')
let local_date = document.querySelector('.main-date')
let searchInp = document.querySelector('.weather-search-box')






fetch('http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f112804d60d2d72210568440f273d0ed')

    .then(resp => { return resp.json() })
    .then(data => {



    })
    .catch(() => {
    })




    // .then(function (resp) { return resp.json() })
    // .then(function (data) {
    //     console.log(data)
    //     document.querySelector('.city').innerHTML = data.name
    // })
    // .catch(function () {

    // })






