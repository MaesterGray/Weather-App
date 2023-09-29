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


  

  // let forecastweatherparameters =[
  //   {parameter:'Wind-Speed',value1:forecastData.data.forecast.forecastday[1].day.maxwind_mph,value2:forecastData.data.forecast.forecastday[1].day.maxwind_kph},
  //   {paraeter:'Humidity',value1:forecastData.data.forecast.forecastday[1].day.avghumidity,value2:null},
  //   {parameter:'Precip',value1:forecastData.data.forecast.forecastday[1].day.totalprecip_mm,value2:forecastData.data.forecast.forecastday[1].day.total.precip_in},
  //   {parameter:'UV-Index',value1:forecastData.data.forecast.forecastday[1].day.uv,value2:null}
  // ]


  useEffect(()=>{
    console.log(currentData.isLoading)
    if (currentData.isLoading===false) {
    
      setCurrentWeatherData([{parameter:'Wind-Speed',value1:currentData.data.current.wind_mph,value2:currentData.data.current.wind_kph},
      {parameter:'Humidity',value1:currentData.data.current.humidity,value2:null},
      {parameter:'Pressure',value1:currentData.data.current.pressure_mb,value2:currentData.data.current.pressure_mm},
      {parameter:'Precip',value1:currentData.data.current.precip_mm,value2:currentData.data.current.precip_in},
      {parameter:'UV-Index',value1:currentData.data.current.uv,value2:null}]) 
  
      
    }
    
    // if (forecastData.isLoading===false) {
    //   console.log(forecastData.data.forecast.forecastday[1].day.maxwind_mph)
    //   forecastweatherparameters =[
    //     {parameter:'Wind-Speed',value1:forecastData.data.forecast.forecastday[1].day.maxwind_mph,value2:forecastData.data.forecast.forecastday[1].day.maxwind_kph},
    //     {paraeter:'Humidity',value1:forecastData.data.forecast.forecastday[1].day.avghumidity,value2:null},
    //     {parameter:'Precip',value1:forecastData.data.forecast.forecastday[1].day.totalprecip_mm,value2:forecastData.data.forecast.forecastday[1].day.total.precip_in},
    //     {parameter:'UV-Index',value1:forecastData.data.forecast.forecastday[1].day.uv,value2:null}
    //   ]
    // }
     
  
  },[forecastData.isLoading,currentData.isLoading])

 
   if (presentRoute.route!== 'Tomorrow') {
    return(
    
      <View style={ styles.container}>
        {currentWeatherdata.map((parameter,index)=>{return(
          <Weatherparameter time='' key={index} isLoading={currentData.isLoading} value={parameter.value1} parameter={parameter.parameter} />
        )})}
      </View>
    )
  
   }else if (presentRoute.route==='Tomorrow') {
    <View style={ styles.container}>
    {forecastweatherparameters.map((parameter,index)=>{return(
      <Weatherparameter time='' key={index} isLoading={currentData.isLoading} value={parameter.value1} parameter={parameter.parameter} />
    )})}
  </View>
   }
  
      }

export default ParameterMap

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    flexWrap:'wrap',

  }

})