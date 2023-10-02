import { StyleSheet, Text, View,FlatList,Dimensions } from 'react-native'
import React,{useEffect,useState} from 'react'
import { useQueryClient,useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import Weatherparameter from './Weatherparameter'
import useCurrentWeatherData from 'hooks/getCurrentData'
import useForecastWeatherData from 'hooks/getForecastData'


type MyArrayItem = {
  parameter: string;
  renderState: 1|2;
};
type ParameterArray = [MyArrayItem, MyArrayItem, MyArrayItem, MyArrayItem, MyArrayItem?, MyArrayItem?];

type Props = {
  city:string
  context:string
}



const screenheight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width


const ParameterMap = ({city,}:Props) => {

  const currentData = useCurrentWeatherData('Lagos')
  const forecastData = useForecastWeatherData(2,'Lagos')

const queryClient = useQueryClient()
  const [presentRoute,setpresentroute] = useState(useLocalSearchParams())
  const [defaultState,setdefaultstate]= useState(true)
  const [currentWeatherdata,setCurrentWeatherData] = useState([
    {parameter:'Wind-Speed',value1:'',value2:''},
    {parameter:'Humidity',value1:'',value2:null},
    {parameter:'Pressure',value1:'',value2:''},
    {parameter:'Precipitation',value1:'',value2:''},
    {parameter:'UV-Index',value1:'',value2:null}
  ])
const [forecastWeatherData,setforecastweatherdata]= useState(
  [
    {parameter:'Wind-Speed',value1:'',value2:''},
    {parameter:'Humidity',value1:'',value2:null},
    {parameter:'Pressure',value1:'',value2:''},
    {parameter:'Precipitation',value1:'',value2:''},
    {parameter:'UV-Index',value1:'',value2:null}
  ]
)

  

  

  useEffect(()=>{
    if (currentData.isLoading===false && presentRoute.route !== 'Tomorrow') {
    
      setCurrentWeatherData([{parameter:'Wind-Speed',value1:currentData.data.current.wind_mph,value2:currentData.data.current.wind_kph},
      {parameter:'Humidity',value1:currentData.data.current.humidity,value2:null},
      {parameter:'Pressure',value1:currentData.data.current.pressure_mb,value2:currentData.data.current.pressure_mm},
      {parameter:'Precipitation',value1:currentData.data.current.precip_mm,value2:currentData.data.current.precip_in},
      {parameter:'UV-Index',value1:currentData.data.current.uv,value2:null}]) 
  
      
    }
    
     if (forecastData.isLoading===false && presentRoute.route === 'Tomorrow') {
    setforecastweatherdata ([
        {parameter:'Wind-Speed',value1:forecastData.data.forecast.forecastday[1].day.maxwind_mph,value2:forecastData.data.forecast.forecastday[1].day.maxwind_kph},
        {parameter:'Humidity',value1:forecastData.data.forecast.forecastday[1].day.avghumidity,value2:null},
        {parameter:'Precipitation',value1:forecastData.data.forecast.forecastday[1].day.totalprecip_mm,value2:forecastData.data.forecast.forecastday[1].day.totalprecip_in},
        {parameter:'UV-Index',value1:forecastData.data.forecast.forecastday[1].day.uv,value2:null}
      ]
    )
    console.log(forecastWeatherData.length,forecastWeatherData[0])
  }
     
  
  },[forecastData.isLoading,currentData.isLoading,presentRoute])

 
   if (presentRoute.route!== 'Tomorrow'&& currentData.isLoading===false) {
    return(
    
      <View style={ styles.container}>
        {currentWeatherdata.map((parameter,index)=>{return(
          <Weatherparameter time='' key={index} isLoading={currentData.isLoading} value={parameter.value1} parameter={parameter.parameter} />
        )})}
      </View>
    )
  
   }else if (presentRoute.route==='Tomorrow'&& forecastData.isLoading === false) {
    return(
    <View style={ styles.container}>
    {forecastWeatherData.map((parameter,index)=>{return(
      <Weatherparameter time='' key={index} isLoading={forecastData.isLoading} value={parameter.value1} parameter={parameter.parameter} />
    )})}
  </View>
    )
   }
  
      }

export default ParameterMap

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    flexWrap:'wrap',

  }

})