import { StyleSheet, Text, View ,Dimensions,FlatList,ActivityIndicator} from 'react-native'
import Forecasticons from './Forecasticons'
import React,{useEffect, useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useQueryClient,useQuery, } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router';
import useCurrentWeatherData from 'hooks/getCurrentData';
import useForecastWeatherData from 'hooks/getForecastData';



const screenheight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width




type props = {
  city:string
}


const Weatherdisplay = ({city}:props) => {
const queryClient = useQueryClient()
const [presentRoute,setpresentroute]=useState(useLocalSearchParams())



const currentData = useForecastWeatherData(1,city)
const forecastData = useForecastWeatherData(2,city)

const [currentHourlyForecast ,setcurrentHourlyForecast] = useState([])
const [TomorrowHourlyForecast ,setTomorrowHourlyForecast] = useState([])

 
useEffect(()=>{
if (currentData.isLoading===false&& presentRoute.route !== 'Tomorrow') {
  setcurrentHourlyForecast(currentData.data?.forecast?.forecastday[0].hour)
} else if (forecastData.isLoading===false && presentRoute.route === 'Tomorrow'){
  setTomorrowHourlyForecast(forecastData.data.forecast.forecastday[1].hour)
}
},[presentRoute.route,currentData.isLoading,forecastData.isLoading])
 

  
  if (presentRoute.route==='Tomorrow' && forecastData.isLoading===false) {
    return (
      <View style={styles.container}>
    
    <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
    <View style={styles.iconContainer}><AntDesign name='clockcircleo' size={15} color={'black'}/></View>
    <Text style={{fontSize:13}}>Hourly Forecast</Text>
    </View>
    <FlatList data={TomorrowHourlyForecast} horizontal={true} renderItem={({item,index})=>(<Forecasticons time={index} temperature={item.temp_c} isLoading={forecastData.isLoading}/>)} showsHorizontalScrollIndicator={false} >
      
    </FlatList>
    </View>
    )
  }
 else if (presentRoute.route !== 'Tomorrow'&& currentData.isLoading===false) {
  return (
    <View style={styles.container}>
  
  <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
  <View style={styles.iconContainer}><AntDesign name='clockcircleo' size={15} color={'black'}/></View>
  <Text style={{fontSize:13}}>Hourly Forecasts</Text>
  </View>
  <FlatList data={currentHourlyForecast} horizontal={true} renderItem={({item,index})=>(<Forecasticons time={index} temperature={item.temp_c} isLoading={currentData.isLoading}/>)} showsHorizontalScrollIndicator={false} >
    
  </FlatList>
  </View>
    )
} else if (currentData.isLoading===true) {
  <View style={styles.container}>
  
  <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
  <View style={styles.iconContainer}><AntDesign name='clockcircleo' size={15} color={'black'}/></View>
  <Text style={{fontSize:13}}>Hourly Forecasts</Text>
  </View>
      <ActivityIndicator size={'large'}/>
  </View>
}


}

export default Weatherdisplay

const styles = StyleSheet.create({
container:{
  height:0.168 * screenheight,
  flexDirection:'column',
  borderRadius:10,
  width:0.922 * screenWidth,
  marginLeft:0.038*screenWidth,
  marginTop: 0.0144 * screenheight,
  backgroundColor:'rgba(206,188,255,0.3)',
  padding:'5%'
  
}, iconContainer:{
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'white',
  height: 0.034 * screenheight,
  width: 0.034 * screenheight,
  borderRadius:50
}
})