import { StyleSheet, Text, View ,Dimensions,FlatList,ActivityIndicator} from 'react-native'
import React ,{useRef,useEffect, useState}from 'react'
import Progressbars from './progressbars'
import { useLocalSearchParams } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import ProgressBarsHoc from './ProgressBarsHoc';
import { useQuery,useQueryClient } from '@tanstack/react-query';
import useForecastWeatherData from 'hooks/getForecastData';

const windowHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width




const getRangeFromArray=(arr:[], start:number, end:number)=> {
    // Ensure that the start and end indices are within the bounds of the array
    if (arr){
    if (start < 0) {
      start = 0;
    }
    if (end >= arr.length) {
      end = arr.length - 1;
    }
  
    // Create a new array containing the elements within the specified range
    const newArray: never[] = [];
    for (let i = start; i <= end; i++) {
      newArray.push(arr[i]);
    }
    return newArray;
    }
   
  }
  

    type Prop = {
      city:string
    }

const ChanceofRain = ({city}:Prop) => {
  const [presentRoute,setPresentRoute] = useState(useLocalSearchParams())
    const [currentHourlyChanceofRainRanges,setcurrentHourlyChanceofRainRanges] = useState<any>([])
    const [tomorrowHourlyChanceOfRainRanges,settomorrowHourlychanceofRainChanges] = useState<any>([])
    const currentData = useForecastWeatherData(1,city)
    const tomorrowData = useForecastWeatherData(2,city)
useEffect(()=>{

 

  if(presentRoute.route==='Tomorrow'&& tomorrowData.isLoading===false ){
   settomorrowHourlychanceofRainChanges([
    getRangeFromArray( tomorrowData.data.forecast.forecastday[1].hour,0,3),
    getRangeFromArray( tomorrowData.data.forecast.forecastday[1].hour,4,7),
    getRangeFromArray( tomorrowData.data.forecast.forecastday[1].hour,8,11),
    getRangeFromArray( tomorrowData.data.forecast.forecastday[1].hour,12,15),
    getRangeFromArray( tomorrowData.data.forecast.forecastday[1].hour,16,19),
    getRangeFromArray( tomorrowData.data.forecast.forecastday[1].hour,20,23),

   ])
   console.log(tomorrowHourlyChanceOfRainRanges.length,)
   
  }else if(presentRoute.route !== 'Tomorrow'&& currentData.isLoading===false){
   setcurrentHourlyChanceofRainRanges([
    getRangeFromArray( currentData.data.forecast.forecastday[1].hour,0,3),
    getRangeFromArray( currentData.data.forecast.forecastday[1].hour,4,7),
    getRangeFromArray( currentData.data.forecast.forecastday[1].hour,8,11),
    getRangeFromArray( currentData.data.forecast.forecastday[1].hour,12,15),
    getRangeFromArray( currentData.data.forecast.forecastday[1].hour,16,19),
    getRangeFromArray( currentData.data.forecast.forecastday[1].hour,20,23),


   ])
  }



},[presentRoute.route,currentData.isLoading,tomorrowData.isLoading])




  const scroll = useRef(null)
  if (presentRoute.route !== 'Tomorrow' && currentData.isLoading===false) {
    return (
      <View style={styles.chanceOfRainContainer}>
                  <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                      <View style={styles.iconContainer}><FontAwesome5 name='cloud-rain' color={'black'} size={15}/></View>
                      <Text>Chance of Rain</Text>
                  </View>
                 <FlatList ref={scroll} horizontal={true} data={currentHourlyChanceofRainRanges} renderItem={({item})=>(<ProgressBarsHoc arr={item}/>)} showsHorizontalScrollIndicator={false} />
              </View>
    )
  }else if(presentRoute.route === 'Tomorrow ' && tomorrowData.isLoading===false){
    return (
      <View style={styles.chanceOfRainContainer}>
                  <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                      <View style={styles.iconContainer}><FontAwesome5 name='cloud-rain' color={'black'} size={15}/></View>
                      <Text>Chance of Rain</Text>
                  </View>
                 <FlatList ref={scroll} horizontal={true} data={tomorrowHourlyChanceOfRainRanges} renderItem={({item})=>(<ProgressBarsHoc arr={item}/>)} showsHorizontalScrollIndicator={false} />
              </View>
              )
  }
  
  }

export default ChanceofRain

const styles = StyleSheet.create({
    chanceOfRainContainer:{
        height:0.278* windowHeight,
        width:0.922 * screenWidth,
        flexDirection:'column',
        backgroundColor:'rgba(208,188,255,0.3)',
        borderRadius:10,
        paddingBottom:'5%',
        paddingTop:'5%',
        marginTop: 0.0144 * windowHeight,
        marginLeft:0.038*screenWidth,


    }, iconContainer:{
        justifyContent:'center',
        backgroundColor:'white',
        height: 0.034 * windowHeight,
        width: 0.034 * windowHeight,
        borderRadius:50,
        alignItems:'center'
      },
})