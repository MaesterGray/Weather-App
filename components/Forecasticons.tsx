import { StyleSheet, Text, View,Dimensions,ActivityIndicator } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';


const screenheight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

type prop ={
    time:string,
    temperature:string,
    isLoading:boolean
}

const Forecasticons = ({time,temperature,isLoading}:prop) => {


  if (isLoading===true) {

    <View style={styles.container}>
      <ActivityIndicator size={'small'} color={'black'} />
    </View>
    
  }

  return (
    <View style={styles.container}>
    <Text style={{fontSize:9,fontWeight:'700',}}>{time}</Text>
    <FontAwesome5 name='cloud-rain' size={20} color='purple'/>
      <Text style={{fontSize:11}}>{temperature}</Text>
  </View>
  )
}

export default Forecasticons

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        height:0.09 * screenheight,
        width:0.08* screenWidth,
        marginRight:0.063 * screenWidth,
        justifyContent:'center',
        alignItems:'center'
    }
})