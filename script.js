const link = 'http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=fbd1c187f058db0d48e533deb9ed41aa'

// const link = 'http://api.weatherstack.com/current?access_key=c913725c279d79f50a2ed3d0a1cdd595'

const first = document.getElementById('first')



let store = {
    name: 'Николаев',
    temperature: 0,
    observationTime: '00:00 AM',
    isDay: 'yes',
    description: '',
    properties: {
        cloudcover: {},
        humidity: {},
        windSpeed: {},
        pressure: {},
        uvIndex: {},
        visibility: {},
    },
}



const fetchData = async () => {
    const result = await fetch(`${link}&query=${store.name}`)
    const data = await result.json()

    const {
        current: {
            cloudcover,
            temperature,
            humidity,
            observation_time: observationTime,
            pressure,
            uv_index: uvIndex,
            visibility,
            is_day: isDay,
            weather_descriptions: description,
            wind_speed: windSpeed,
        },
    } = data



    console.log(data)
    store = {
        ...store,
        temperature,
        localTimeEpoch,
        isDay,
        description: '',
        properties: {
            cloudcover: {},
            humidity: {},
            windSpeed: {},
            pressure: {},
            uvIndex: {},
            visibility: {},
        }

    }
    renderComponent()
}



const markup = () => {
    const { name, description, localTime, temperature, isDay, properties } = store
    return ` 
        
        <section class="location">
        <div class="city">${name}</div>
        <div class="weather-icon"></div>
        <div class="main-temp">${temperature}<spam>°c</spam>
        </div>
        <div class="main-weather">Sunny</div>
        <div class="main-hi-low">18°c / 21°c</div>
        <div class="main-date">${observationTime}</div>
        </section>
        
    `
}

function renderComponent() {
    first.innerHTML = markup()
}

fetchData()