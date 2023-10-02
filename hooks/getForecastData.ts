import { useQuery } from "@tanstack/react-query";



export default function useForecastWeatherData(days:number,city:string){
const forecastdata = useQuery(
    {queryKey:['nextday'],
        queryFn:async ()=>{
                
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5523c0463b154c3b8ab152458230909&q=${city}&days=${days}&aqi=yes`)
            //console.log(response)
            if (!response.ok) {
                console.log(forecastdata.error)
              }
              return response.json()
              
                }})

                return forecastdata
}


