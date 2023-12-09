var inputValue=document.getElementById('cityName')
var btnEl=document.getElementById('submitBtn')
const mainContainer=document.getElementById('mainContainer')
const weatherContainer=document.getElementById('weatherContainer')
const apiKey="b2244df1373bf2d3aaaa503b71a59eae"


function convertToDegrees(val){
    return val-273.15
}


function isDaytime(sunriseTime,sunsetTime){
    const currentTime=Math.floor(Date.now()/1000)
    isDay=(currentTime>sunriseTime && currentTime<sunsetTime)
    return isDay
}

function isDayNtIcon(sunriseTime,sunsetTime,type1){
    const isDay1=isDaytime(sunriseTime,sunsetTime)
    if(isDay1===true){
        if(type1=='Clear'){
            const url='./dayClearSky.png'
            return url
        }
        else if(type1=='Drizzle'){
            const url='./dayDrizzle.png'
            return url
        }
        else if(type1=='Haze'){
            const url='./dayHaze.png'
            return url
        }
        else if(type1=='Dust'){
            const url='./dayDust.png'
            return url
    }
    else if(type1=='Smoke'){
        const url='./daySmoke.png'
        return url
    }
    else if(type1=='Rain'){
        const url='./dayRain.png'
        return url
    }
    else if(type1=='Thunderstorm'){
        const url='./dayThunderStorm.png'
        return url
    }
    else if(type1=='Snow'){
        const url='./daySnow.png'
        return url
    }
    else if(type1=='Mist'){
        const url='./dayMist.png'
        return url
    }
    else if(type1=='Fog'){
        const url='./dayFog.png'
        return url
    }
    else if(type1=='Sand'){
        const url='./daySand.png'
        return url
    }
    else if(type1=='Ash'){
        const url='./ASH.jpg'
        return url
    }
    else if(type1=='Squall'){
        const url='./squell.png'
        return url
    }
    else if(type1=='Tornado'){
        const url='./dayTornado.jpg'
        return url
    }
    else if(type1=='Clouds'){
        const url='./dayCloud.png'
        return url
    }
}
else{
    if(type1=='Clear'){
        const url='./ntClearSky.jpg'
        return url
    }
    else if(type1=='Drizzle'){
        const url='./nightDrizzle.jpg'
        return url
    }
    else if(type1=='Haze'){
        const url='./nightHaze.png'
        return url
    }
    else if(type1=='Dust'){
        const url='./dayDust.png'
        return url
    }
    else if(type1=='Smoke'){
        const url='./nightSmoke.jpg'
        return url
    }
    else if(type1=='Rain'){
        const url='./nightRain.png'
        return url
    }
    else if(type1=='Thunderstorm'){
        const url='./nightThunderStorm.jpg'
        return url
    }
    else if(type1=='Snow'){
        const url='./nightSnow.jpg'
        return url
    }
    else if(type1=='Mist'){
        const url='./nightMist.png'
        return url
    }
    else if(type1=='Fog'){
        const url='./nightFog.png'
        return url
    }
    else if(type1=='Sand'){
        const url='./nightSand.jpg'
        return url
    }
    else if(type1=='Ash'){
        const url='./ASH.jpg'
        return url
    }
    else if(type1=='Squall'){
        const url='./squell.png'
        return url
    }
    else if(type1=='Tornado'){
        const url='./nightTornado.jpg'
        return url
    }
    else if(type1=='Clouds'){
        const url='./nightCloud.png'
        return url
    }
}



}


btnEl.addEventListener("click",async function(){
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    mainContainer.appendChild(spinner);
try{
    const url='https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid='+apiKey
    const response=await fetch(url)
    const Data=await response.json()
    spinner.remove()
    const tempFh=Data.main.temp
    const humid=Data.main.humidity
    const cityname=Data.name
    const type=Data.weather[0].description
    const type1=Data.weather[0].main
    const windspeed=Data.wind.speed
    const tempDg=Math.floor(convertToDegrees(tempFh))
    console.log(Data)
   
    const sunriseTime=Data.sys.sunrise;
    const sunsetTime=Data.sys.sunset;
    const isDay=isDaytime(sunriseTime,sunsetTime);
    console.log(isDay)

    if(isDay===false){
        weatherContainer.classList.add('weatherBgContainer1')
        inputValue.classList.add('inputEl1')

    }
    else{
        weatherContainer.classList.remove('weatherBgContainer1')
        weatherContainer.classList.add('weatherBgContainer')
        inputValue.classList.remove('inputEl1')
    }

    const resultContainer=document.createElement('div')
    resultContainer.classList.add('resultStyle')
    
    mainContainer.appendChild(resultContainer)
    
    const cityHeadEl=document.createElement('h1')
    cityHeadEl.textContent=cityname
    cityHeadEl.classList.add('citynameStyle')
    
    resultContainer.appendChild(cityHeadEl)

    const icon=document.createElement('img')
    icon.classList.add('conditionIcon')
    const getIcon=isDayNtIcon(sunriseTime,sunsetTime,type1)
    icon.src=getIcon
    
    resultContainer.appendChild(icon)

    const tempEl=document.createElement('p')
    tempEl.textContent=tempDg+'\u00B0C'
    tempEl.classList.add('paraStyle1')

    resultContainer.appendChild(tempEl)

    const skyConditionEl=document.createElement('p')
    skyConditionEl.textContent='Sky Conditions: '+type
    skyConditionEl.classList.add('paraStyle')

    resultContainer.appendChild(skyConditionEl)

    const humidEl=document.createElement('p')
    humidEl.textContent='Humidity: '+humid+'%'
    humidEl.classList.add('paraStyle')

    resultContainer.appendChild(humidEl)

    const speedEl=document.createElement('p')
    speedEl.textContent='Wind Speed: '+windspeed+' Km/h'
    speedEl.classList.add('paraStyle')

    resultContainer.appendChild(speedEl)
} catch(error){
    const errorEl=document.createElement('p')
    errorEl.textContent='Enter Valid City Name'
    errorEl.classList.add('errorStyle')

    mainContainer.appendChild(errorEl)
}
})