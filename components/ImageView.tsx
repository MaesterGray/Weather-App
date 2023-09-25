import { StyleSheet, Text, View,Image,Dimensions,Pressable,StatusBar,ActivityIndicator } from 'react-native'
import React from 'react'
import { FontAwesome5,Feather,Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useGlobalSearchParams, useLocalSearchParams,  } from 'expo-router';
import { useQuery,useQueryClient } from '@tanstack/react-query';
import Animated,{useSharedValue,withTiming} from 'react-native-reanimated';

const windowHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

type  props = {
    city:string
   
}

const ImageView = () => {
const queryClient = useQueryClient()


    const [presentRoute,setPresentRoute] = useState(useLocalSearchParams())
    const route = useGlobalSearchParams()

    const[forecastdata,setforecastData] = useState(
        {
            temperature_c:'ffff',
            temperature_f:'fff',
            date:null,
            feelsLike:null,
            weatherCondition:'fff',
            isLoading:true
        }
    )
        const [defaultState,setDefaultState]=useState(true)
        
    const { isLoading, isError, data, error } = useQuery({queryKey:['current'],
            queryFn:async ()=>{
                
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=5523c0463b154c3b8ab152458230909&q=Lagos&aqi=yes`)
        //console.log(response)
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
                    if (presentRoute.route==='Tomorrow') {
                        setDefaultState(false)
                        setforecastData({
                            temperature_c:nextdayQuery?.data?.forecast?.forecastday[0] .day?.avgtemp_c,
                            temperature_f:nextdayQuery?.data?.forecast?.forecastday[0] .day?.avgtemp_f,
                            feelsLike:null,
                            weatherCondition:nextdayQuery?.data?.forecast?.forecastday[0] .day?.condition?.text,
                            date:'Tommorrow',
                            isLoading:nextdayQuery.isLoading
                        })
                       
                    }else{
                        setforecastData({
                            temperature_c:data?.current?.temp_c,
                            temperature_f:data?.current?.temp_f,
                            feelsLike:data?.current?.feelslike_c,
                            weatherCondition:data?.current?.condition.text,
                            date:data?.location?.localtime,
                            isLoading:isLoading
                        })
                       

                    }
                },[presentRoute.route,isLoading,defaultState])
        
    
  return (
    <View style={styles.scrollview}>

        <View style={styles.imageContainer}>
      <Animated.Image  style={{flex:1,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        }}
         source={{uri:'https://images.unsplash.com/photo-1692678420673-ba7a27ad70cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=1000&q=60'}}>
            
         </Animated.Image>
      </View>
      <View style={styles.cityContainer}>

                <Text style={[styles.whiteTextVColor,styles.CityText]}>
                    Lagos
                <Pressable><Entypo name='triangle-down' size={15} color={'white'}/></Pressable>

                </Text>

                </View>

                <Pressable style={styles.searchButton}><Feather name='search' size={24} color={'white'}/></Pressable>

                <Text style={[styles.whiteTextVColor,styles.temperatureText]}>{forecastdata.isLoading?<ActivityIndicator size={'large'}/>:forecastdata.temperature_c}</Text>
                <Text style={[styles.whiteTextVColor,styles.dateText]}>{forecastdata.isLoading?<ActivityIndicator size={'small'} color={'white'}/>:forecastdata.date}</Text>

                <View style={styles.weatherIconContainer}>
                    <Text style={[styles.whiteTextVColor,styles.weatherDescriptiontext]}>{forecastdata.isLoading?<ActivityIndicator size={'small'} color={'white'}/>:forecastdata.weatherCondition}</Text>
                </View>

                <View style={styles.nightAndDayContainer}>
                    <Text style={[styles.whiteTextVColor,styles.nightAndDayText]}>{forecastdata.isLoading?<ActivityIndicator size={'large'}/>:forecastdata.temperature_c}</Text>
                    <Text style={[styles.whiteTextVColor,styles.nightAndDayText]}>Night -1</Text>
                </View>
    <StatusBar hidden={true}/>
    </View>
  )
}

export default ImageView

const styles = StyleSheet.create({
    scrollview:{
        height:windowHeight-(0.4*windowHeight),

        backgroundColor:'rgb(246,237,255)',
        
    },
    image:{
        flex:1,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
    }, 
     imageContainer:{
        flex:1,
        
      
    },whiteTextVColor:{
        color:'white'
    },  CityText:{
        fontWeight:'200',
        fontSize:14
       
    }, temperatureText:{
        fontWeight:'500',
        fontSize:64,
        position:'absolute',
        bottom:'50%',
        left:'6%'
    },dateText:{
        fontWeight:'100',
        position:'absolute',
        left:'6%',
        bottom:'6%'
    },weatherIconContainer:{
        position:'absolute',
        flexDirection:'column',
        top:'30%',
        right:'8%'
    },weatherIcon:{
        width:0.26 * screenWidth,
        height:0.26 * screenWidth
    },weatherDescriptiontext:{
        fontWeight:'100',

    },nightAndDayContainer:{
        flexDirection:'column',
        gap:2,
        bottom:'6%',
        position:'absolute',
        right:'6%'

    },nightAndDayText:{
        fontWeight:'100'
    },cityContainer:{
        position:'absolute',
        left:'10%',
        top:'10%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
        
    },searchButton:{
        position:'absolute',
        right:'10%',
        top:'10%'
    }
})