import { error } from 'console';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type Props = {}




interface WeatherData {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  rain: Rain;
  clouds: Clouds;
  dt: number;
  sys: SystemInfo;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Coordinates {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Rain {
  "1h": number;
}

interface Clouds {
  all: number;
}

interface SystemInfo {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}



 const Weather = (props: Props) => {
    const {lat,lon}=useParams()
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
    const [background,setBackground]=useState<string >("")
    
  

    const init=()=>{
      let main=document.getElementsByClassName("weather-main-box")[0]
      console.log(weatherData?.weather)
      switch(weatherData?.weather[0].main){
        case "Rain":
           setBackground("https://images.unsplash.com/photo-1493314894560-5c412a56c17c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fHJhaW4lMjB3ZWF0aGVyfGVufDB8fDB8fHww")
          break;
        case "Clouds":
           setBackground("https://plus.unsplash.com/premium_photo-1667143326992-547062b7ca22?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
          break;
          case "Clear":
         setBackground("https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VubnklMjB3ZWF0aGVyfGVufDB8fDB8fHww")
          break;
      }
    }

    const getData=async ()=>{
        let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`)
        const data : WeatherData = await result.json()
         setWeatherData(data)
        console.log(data)
    }

    useEffect(()=>{
      init()
    },[weatherData])
    useEffect(()=>{
        getData()
    },[])
  return (
    <div  style={{height:"100wh",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}} className='weather-main-box'>
      <img className='background' src={background} />
      {
      weatherData !==null && <div className='weather-info-box'>
        <div className='weather-inner-box'> 
        <div>
       {weatherData?.weather[0].main === "Clear" && <svg xmlns="http://www.w3.org/2000/svg" width="10em" height="10em" fill="orange" className="bi bi-sun-fill" viewBox="0 0 16 16">
  <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
</svg>}
{ weatherData?.weather[0].main === "Clouds" && <svg xmlns="http://www.w3.org/2000/svg" width="10em" height="10em" fill="gray" className="bi bi-clouds-fill" viewBox="0 0 16 16">
  <path d="M11.473 9a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 14h8.5a2.5 2.5 0 1 0-.027-5"/>
  <path d="M14.544 9.772a3.5 3.5 0 0 0-2.225-1.676 5.5 5.5 0 0 0-6.337-4.002 4.002 4.002 0 0 1 7.392.91 2.5 2.5 0 0 1 1.17 4.769z"/>
</svg>
}

{ weatherData?.weather[0].main === "Rain" && <svg xmlns="http://www.w3.org/2000/svg" width="10em" height="10em" fill="gray" className="bi bi-cloud-rain-heavy-fill" viewBox="0 0 16 16">
  <path d="M4.176 11.032a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293m3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293m3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293m3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293m.229-7.005a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973"/>
</svg>
}
<h1 className='shadow'>{weatherData?.weather[0].main}</h1>
<h3 className='shadow'>{weatherData?.weather[0].description}</h3>
<h5 className='shadow'>{weatherData.name + " | lat : "+weatherData.coord.lat +" | lon : "+weatherData.coord.lon}</h5>
        </div>
      
        </div>
        <div className='weather-inner-box'>
          <h6 className='shadow'>{"Temp : "+weatherData.main.temp+" | Min_Temp : "+weatherData.main.temp_min+" | Max_Temp : "+weatherData.main.temp_max}</h6>
          <h6 className='shadow'>{"Ground Level : "+weatherData.main.grnd_level+" | Sea Level : "+weatherData.main.sea_level}</h6>
          <h6 className='shadow'>{"Wind Speed : "+weatherData.wind.speed+" | Gust : "+weatherData.wind.gust+" | Deg : "+weatherData.wind.deg}</h6>
           </div>
         </div>

      }</div>
  )
}

export default Weather