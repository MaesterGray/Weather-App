import { StyleSheet, Text, View ,Dimensions,FlatList,ActivityIndicator} from 'react-native'
import Forecasticons from './Forecasticons'
import React,{useEffect, useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useQueryClient,useQuery, } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router';




const screenheight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width




type props = {
  city:string
}


const Weatherdisplay = ({city}:props) => {
const queryClient = useQueryClient()
const [presentRoute,setpresentroute]=useState(useLocalSearchParams())
const [hourlyforecast,sethourlyforecas]= useState<[]|any[]>([])
const [loading,setloading]= useState(true)  

  const { isLoading, isError, data, error } = useQuery({queryKey:['current',city],
  queryFn:async ()=>{
      
const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5523c0463b154c3b8ab152458230909&q=${city}&days=1&aqi=yes`)
if (!response.ok) {
  console.log(error)
}
return response.json()

  }})

  const nextdayQuery = useQuery({queryKey:['nextday'],
        queryFn:async ()=>{
                
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5523c0463b154c3b8ab152458230909&q=Lagos&days=2aqi=yes`)
            //console.log(response)
            if (!response.ok) {
                console.log(error)
              }
              return response.json()
              
                }})
 
                useEffect(()=>{
                  
                    console.log(presentRoute)
                  if (presentRoute.route==='Tomorrow'&& nextdayQuery.data) {
                    setloading(nextdayQuery.isLoading)
                    sethourlyforecas(nextdayQuery.data.forecast?.forecastday[1]?.hour)
                    

                  }else if(data)  {
                    setloading(isLoading) 
                    sethourlyforecas(data.forecast?.forecastday[0]?.hour)
                  }
                },[loading,presentRoute])

  
  if (presentRoute.route==='Tomorrow') {
    return (
      <View style={styles.container}>
    
    <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
    <View style={styles.iconContainer}><AntDesign name='clockcircleo' size={15} color={'black'}/></View>
    <Text style={{fontSize:13}}>Hourly Forecast</Text>
    </View>
    <FlatList data={hourlyforecast} horizontal={true} renderItem={({item})=>(<Forecasticons time={'11'} temperature={item.temp_c} isLoading={isLoading}/>)} showsHorizontalScrollIndicator={false} >
      
    </FlatList>
    </View>
    )
  }
if (data) {
  return (
    <View style={styles.container}>
  
  <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
  <View style={styles.iconContainer}><AntDesign name='clockcircleo' size={15} color={'black'}/></View>
  <Text style={{fontSize:13}}>Hourly Forecast</Text>
  </View>
  <FlatList data={hourlyforecast} horizontal={true} renderItem={({item})=>(<Forecasticons time={'11'} temperature={item.temp_c} isLoading={isLoading}/>)} showsHorizontalScrollIndicator={false} >
    
  </FlatList>
  </View>
    )
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