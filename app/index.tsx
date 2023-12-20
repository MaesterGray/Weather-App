import { View, Text , StyleSheet,ScrollView,ImageBackground, Dimensions,FlatList,Pressable, StatusBar,SafeAreaView} from 'react-native'
import React, {useState,useEffect} from 'react'
import Animated,{withTiming} from 'react-native-reanimated'
import { QueryClientProvider, QueryClient, useQueryClient} from '@tanstack/react-query'
import AppContainer from 'components/AppContainer'
import configurestore from 'redux/configurestore'
import { Provider } from 'react-redux'
import ChanceofRain from 'components/ChanceofRain'
import ImageView from '../components/ImageView'
import NavigationContainer from '../components/NavigationContainer'
import Weatherdisplay from 'components/Weatherdisplay'
import ParameterMap from '../components/ParameterMap'



const windowHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width



const queryClient = new QueryClient()

function index(){
    const [city,setCity]=useState('Lagos')
    const [windspeedCalc,setwindSpeedCalc]= useState('mp/h')
    
    const [parameters,setParameters]=useState([
      {parameter:'Windspeed',position:1}, 
      {parameter:'uv',position:2}, 
      {parameter:'pressure',position:3}, 
      {parameter:'humidity',Position:4}, 
    ])
    
    const [renderState,setRenderstate]= useState({
        renderstate:'Today',
        todayColor:'rgb(224,182,225)',
        tommorowColor:'white',
        tendayColor:'white'
    })
   
  
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={configurestore}>
      <ImageView  />
        <NavigationContainer/>

       <ScrollView style={styles.scrollview}>
        <ParameterMap />
        <Weatherdisplay />
        <ChanceofRain/>
       </ScrollView>

    </Provider>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  scrollview:{
      height:0.34 * windowHeight,
      backgroundColor:'rgb(246,237,255)',
  },
  bottomScreen:{
      height:0.538 * windowHeight,
      alignItems:'baseline'
  }
})


   
    
 
    
    


export default index