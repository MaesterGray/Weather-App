import { View,  FlatList,StyleSheet,ActivityIndicator,Text} from 'react-native'
import React,{useEffect} from 'react'
import { useQuery,useQueryClient } from '@tanstack/react-query'
import Forecastholders from './forecastholders'
import { dailyForecast } from 'models'


type Prop ={
    city:string
  }


const Tendayscontainer = ({city}:Prop) => {
  
    const query = useQueryClient()
  
    const { isLoading, isError, data, error } = useQuery({queryKey:['current',city],
    queryFn:async ()=>{
        
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5523c0463b154c3b8ab152458230909&q=${city}&days=10&aqi=yes`)
  if (!response.ok) {
    console.log(error)
  }
  return response.json()
  
    }})
  

  
    function filter (arr: any[]){
  
      const newArray = []
  
      for (let index = 0; index < arr.length; index++) {
          if (index%9===0){
            console.log(arr[index],index)
            newArray.push(arr[index])
          }
      }
      
      return newArray
      
    }

    let filteredArrray =[]

    useEffect(()=>{
        if (isLoading===false) {
     filteredArrray = filter(data.forecast?.forecastday)
            console.log(filteredArrray.length)
            console.log(data.forecast?.forecastday.length)
        }
    },[isLoading])
  
    if (isLoading===false ) {
      
      return (
        <View style={{flex:1}}>
            <FlatList data={data.forecast?.forecastday} renderItem={({item})=>{
              return(<Forecastholders date={item.day.date} WeatherCondition={item.day.condition.text} minTemp={item.day.mintemp_c} maxTemp={item.day.maxtemp_c} imgsrc={item.day.condition.icon}/>)
            }}/>
    </View>
    )
    } else {
      return(
        <View><Text>Hey there</Text></View>
      )
    }
   
  }
  
  
 


export default Tendayscontainer