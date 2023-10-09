import { StyleSheet, Text, View, Dimensions,  } from 'react-native'
import {Image} from 'expo-image'
import React,{useEffect} from 'react'
import { FlatList } from 'react-native-gesture-handler'



const windowHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width


type Props ={
  minTemp:number,
  maxTemp:number,
  WeatherCondition:string
  date:string
  imgsrc:string
}

const Forecastholders = ({minTemp,maxTemp,WeatherCondition,date,imgsrc}:Props) => {


  return (
    <View style={styles.forecastContainer}>

      <View style={{flexDirection:'column'}}>
        <Text>{date}</Text>
      <Text>{WeatherCondition}</Text>
      </View>

      <View style={styles.weatherIconContainer}>

        <View style={styles.temperatureTextContainer}>
          <Text>{minTemp}</Text>
          <Text>{maxTemp}</Text>
        </View>
         
         <Image style={{}} source={{uri:imgsrc}} />
      </View>

    </View>
  )
}

export default Forecastholders

const styles = StyleSheet.create({
  forecastContainer:{
    height:0.3 *windowHeight,
    width:0.915 * screenWidth,
    backgroundColor:'rgba(208,188,255,0.3)',
    borderRadius:10,
    marginTop:0.023 * windowHeight,
    marginLeft:0.046 * screenWidth,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingLeft:10,
    paddingRight:10,



  },
  weatherIconContainer:{
    flexDirection:'row',
    alignSelf:'flex-end'
  },
  temperatureTextContainer:{
    flexDirection:'column',
    gap:0.5,
    borderRightWidth:1,
    borderRightColor:'black',


  }
})