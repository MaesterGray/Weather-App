import { View, Text , StyleSheet,ScrollView,ImageBackground, Dimensions,FlatList,Pressable, StatusBar,SafeAreaView} from 'react-native'
import React, {useState,useEffect} from 'react'
import Animated,{withTiming} from 'react-native-reanimated'
import { QueryClientProvider, QueryClient, useQueryClient} from '@tanstack/react-query'
import AppContainer from 'components/AppContainer'



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
    <AppContainer city='Lagos'/>
    </QueryClientProvider>
  )
}


   
    
 
    
    


export default index