import { StyleSheet, Text, View ,Dimensions,FlatList,ActivityIndicator} from 'react-native'
import React ,{useRef,useEffect, useState}from 'react'
import Progressbars from './progressbars'
import { useLocalSearchParams } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import ProgressBarsHoc from './ProgressBarsHoc';
import { useQuery,useQueryClient } from '@tanstack/react-query';


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
  
  const ranges = []


  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery({queryKey:['current',city],
  queryFn:async ()=>{
      
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5523c0463b154c3b8ab152458230909&q=${city}&days=1&aqi=yes`)
  console.log(response)
  if (!response.ok) {
  console.log(error)
  }
  return response.json()}
})

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

 

  if(presentRoute.route==='Tomorrow' && data){
    console.log(nextdayQuery.data.forecast?.forecastday[1]?.hour.length)
    const dawndata = nextdayQuery.data.forecast?.forecastday[1]?.hour.slice(0,4)
    const morningdata =   nextdayQuery.data.forecast?.forecastday[1]?.hour.slice(4,8)
    const middaydata = nextdayQuery.data.forecast?.forecastday[1]?.hour.slice(8,12)
    const afternoondata = nextdayQuery.data.forecast?.forecastday[1]?.hour.slice(12,16)
    const eveningdata =nextdayQuery.data.forecast?.forecastday[1]?.hour.slice(16,20)
    const nightdata = nextdayQuery.data.forecast?.forecastday[1]?.hour.slice(20,24)
    
    ranges.push(dawndata,morningdata,middaydata,afternoondata,eveningdata,nightdata)

   
  }else if(data){
    const dawndata = data.forecast?.forecastday[0]?.hour.slice(0,4)
    const morningdata =   data.forecast?.forecastday[0]?.hour.slice(4,8)
    const middaydata = data.forecast?.forecastday[0]?.hour.slice(8,12)
    const afternoondata = data.forecast?.forecastday[0]?.hour.slice(12,16)
    const eveningdata =data.forecast?.forecastday[0]?.hour.slice(16,20)
    const nightdata = data.forecast?.forecastday[0]?.hour.slice(20,24)
    

    ranges.push(dawndata,morningdata,middaydata,afternoondata,eveningdata,nightdata)
    console.log(ranges[0],'ranges')
  }



},[presentRoute.route])




  const scroll = useRef(null)
  return (
    <View style={styles.chanceOfRainContainer}>
                <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                    <View style={styles.iconContainer}><FontAwesome5 name='cloud-rain' color={'black'} size={15}/></View>
                    <Text>Chance of Rain</Text>
                </View>
               { isLoading?<ActivityIndicator size={'large'}/>: <FlatList ref={scroll} horizontal={true} data={ranges} renderItem={({item})=>(<ProgressBarsHoc arr={item}/>)} showsHorizontalScrollIndicator={false} />}
            </View>
  )
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