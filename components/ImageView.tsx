import { StyleSheet, Text, View,Dimensions,Pressable,StatusBar,ActivityIndicator,Modal, FlatList } from 'react-native'
import React from 'react'
import { FontAwesome5,Feather,Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useGlobalSearchParams, useLocalSearchParams,  } from 'expo-router';
import { useQuery,useQueryClient } from '@tanstack/react-query';
import Animated,{useSharedValue,withTiming} from 'react-native-reanimated';
import useCurrentWeatherData from 'hooks/getCurrentData';
import useForecastWeatherData from 'hooks/getForecastData';
import { useDispatch,useSelector } from 'react-redux'
import { setstring } from 'redux/city'
import NavigationContainer from './NavigationContainer';
import {Image} from 'expo-image'
const windowHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

type props = {
    city:string
}

const ImageView:React.FC = () => {
const queryClient = useQueryClient()
const currentDate = new Date();

// Add one day to the current date to get tomorrow's date
currentDate.setDate(currentDate.getDate() + 1);

// Convert the date to a string in your desired format (e.g., "yyyy-mm-dd")
const tomorrowDate = currentDate.toISOString().slice(0, 10);
    ///YOU NEED TO  STOP DESTRUCTURING CITY WHEN U FIRE THE USESELECTOR BECAUSE OF THE PARAMETER 

        const [presentRoute,setPresentRoute] = useState(useLocalSearchParams())
        const [temperature,settemperature]= useState('')
        const [feelsLike,setfeelsLike] = useState('')
        const [date,setdate] = useState('')
        const [weatherCondition,setweathercondition] = useState('')
        const [defaultState,setDefaultState]=useState(true)
        const [modalVisible,setModalVisible] = useState(false)
        const [compressedState,setCompressedstate] = useState(false)
        const [currentImageSrc,setcurrentImagesrc] = useState('')
        const [tomorrowImageSrc,setTomorrowImageSrc]= useState('')
        const { city,imageViewState } = useSelector((state)=> state.city)
 
        const currentData = useCurrentWeatherData(city)
        const forecastData= useForecastWeatherData(2,city)

        const dispatch = useDispatch()

        const hardCodedPlaces =[
            'Lagos',
            'Abuja',
            'Hong-Kong',
            'Abu-Dhabi',
            'New-York',
            'London',
            'Sydney',
            'Seoul',
            'Tokyo',
            'Cape-Town',
            'Dubai'
        ]
                    
                  useEffect(()=>{
                    console.log(city,'citylog',currentData.isLoading)
                    if (presentRoute.route==='Tomorrow'&& forecastData.isLoading===false) {
                        settemperature(forecastData.data.forecast.forecastday[1].day.avgtemp_c)
                        setdate(`${tomorrowDate}, Tomorrow`)
                        setfeelsLike(forecastData.data.forecast.forecastday[1].day.condition.text)
                       setcurrentImagesrc(currentData.data.current.condition.icon)
                    }else if (presentRoute.route!=='Tomorrow'&& currentData.isLoading===false){
                        settemperature(currentData.data.current.temp_c)
                        setdate(currentData.data.location.localtime)
                        setfeelsLike(currentData.data.current.condition.text)
                    }
                },[currentData.isLoading,forecastData.isLoading,presentRoute,city,forecastData])
        
   if ( presentRoute.route!=='Tomorrow') {
    return(
    <View style={styles.scrollview}>

    <View style={styles.imageContainer}>
  <Image  style={{flex:1,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    }}
     source={{uri:'https://images.unsplash.com/photo-1692678420673-ba7a27ad70cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=1000&q=60'}}>
        
     </Image>
  </View>

         <View style={styles.cityContainer}>
            <Text style={[styles.whiteTextVColor,styles.CityText]}>{city}</Text>
            <Pressable onPress={()=>setModalVisible(true)}>
                <Entypo name='triangle-down' size={15} color={'white'}/>
            </Pressable>
            <Modal animationType='slide' transparent={true} visible={modalVisible} >
                    <View style={{borderBottomRightRadius:10,borderBottomLeftRadius:10}}>
                    <FlatList data={hardCodedPlaces} renderItem={({item})=>(<Pressable style={styles.modalStrips} onPress={()=>{dispatch(setstring(item)); setModalVisible(false)}}><Text>{item}</Text></Pressable>)}/>
                    </View>
                </Modal>
            

            </View>

                <Pressable style={styles.searchButton}><Feather name='search' size={24} color={'white'}/></Pressable>
                

            <Text style={[styles.whiteTextVColor,styles.temperatureText]}>{currentData.isLoading?<ActivityIndicator size={'large'}/>:temperature}</Text>
            <Text style={[styles.whiteTextVColor,styles.dateText]}>{currentData.isLoading?<ActivityIndicator size={'small'} color={'white'}/>:date}</Text>

            <View style={styles.weatherIconContainer}>
                <Text style={[styles.whiteTextVColor,styles.weatherDescriptiontext]}>{currentData.isLoading?<ActivityIndicator size={'small'} color={'white'}/>:feelsLike}</Text>
            </View>

            <View style={styles.nightAndDayContainer}>
                <Text style={[styles.whiteTextVColor,styles.nightAndDayText]}>{currentData.isLoading?<ActivityIndicator size={'large'}/>:temperature}</Text>
                <Text style={[styles.whiteTextVColor,styles.nightAndDayText]}>Night -1</Text>
            </View>
<StatusBar hidden={true}/>
</View>
  ) } 
  else if( presentRoute.route==='Tomorrow'&& forecastData.isLoading===false){
  return (
    <View style={styles.scrollview}>

        <View style={styles.imageContainer}>
      <Image  style={{flex:1,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        }}
         source={{uri:'https://images.unsplash.com/photo-1692678420673-ba7a27ad70cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=1000&q=60'}}>
            
         </Image>
      </View>
      <View style={styles.cityContainer}>

                <Text style={[styles.whiteTextVColor,styles.CityText]}>
                    {city}
                <Pressable><Entypo name='triangle-down' size={15} color={'white'}/></Pressable>

                </Text>

                </View>

                <Pressable style={styles.searchButton}><Feather name='search' size={24} color={'white'}/></Pressable>

                <Text style={[styles.whiteTextVColor,styles.temperatureText]}>{forecastData.isLoading?<ActivityIndicator size={'large'}/>:temperature}</Text>
                <Text style={[styles.whiteTextVColor,styles.dateText]}>{forecastData.isLoading?<ActivityIndicator size={'small'} color={'white'}/>:date}</Text>

                <View style={styles.weatherIconContainer}>
                    <Text style={[styles.whiteTextVColor,styles.weatherDescriptiontext]}>{forecastData.isLoading?<ActivityIndicator size={'small'} color={'white'}/>:feelsLike}</Text>
                </View>

                <View style={styles.nightAndDayContainer}>
                    <Text style={[styles.whiteTextVColor,styles.nightAndDayText]}>{forecastData.isLoading?<ActivityIndicator size={'large'}/>:temperature}</Text>
                    <Text style={[styles.whiteTextVColor,styles.nightAndDayText]}>Night -1</Text>
                </View>
    <StatusBar hidden={true}/>
    </View>
  )
}else if(imageViewState===true){
    return(
        <View style={styles.compressedStateContainer}>
            <Text style={styles.compressedTemperatureText}>{city}</Text>

            <View style={{flexDirection:'row', justifyContent:'space-evenly' , alignItems:'center'}}>
                <View>
                <Text>{temperature}</Text>
                <Text>{feelsLike}</Text>
            </View>
                <Image source={currentImageSrc} style={styles.compressedWeatherIcon}/>
            </View>
            <NavigationContainer/>
        </View>
    )
}

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
    },modalStrips:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(208,188,255,0.3)',

    },compressedStateContainer:{
        height: 0.255 * windowHeight,
        width: screenWidth,
        backgroundColor:'rgba(206,188,255,0.3)',
        flexDirection:'column',
        gap:5,
        position:'absolute',
        top:0
    },compressedTemperatureText:{
            fontWeight:'500',
            fontSize:32,

    },compressedWeatherIcon:{
        height:0.119 * screenWidth,
        width:0.119 * screenWidth,

    }
})