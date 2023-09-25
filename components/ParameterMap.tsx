import { StyleSheet, Text, View,FlatList,Dimensions } from 'react-native'
import React,{useEffect,useState} from 'react'
import { useQueryClient,useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import Weatherparameter from './Weatherparameter'


type MyArrayItem = {
  parameter: string;
  renderState: 1|2;
};
type ParameterArray = [MyArrayItem, MyArrayItem, MyArrayItem, MyArrayItem, MyArrayItem?, MyArrayItem?];

type Props = {
  city:string
  context:string
}



const screenheight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width


const ParameterMap = ({city,}:Props) => {


  
  const { isLoading, isError, data, error } = useQuery({queryKey:['current',city],
            queryFn:async ()=>{
                
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=5523c0463b154c3b8ab152458230909&q=${city}&aqi=yes`)
        if (!response.ok) {
            console.log(error)
          }
          return response.json()
          
            }})

           

           const nextdayQuery = useQuery({queryKey:['nextday'],
        queryFn:async ()=>{
                
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5523c0463b154c3b8ab152458230909&q=Lagos&days=2&aqi=no`)
            //console.log(response)
            if (!response.ok) {
                console.log(error)
              }
              return response.json()
              
                }})
                

const queryClient = useQueryClient()
  const [presentRoute,setpresentroute] = useState(useLocalSearchParams())
  const [defaultState,setdefaultstate]= useState(true)
  const [base,setbase] = useState( data?.current)



  function splitArray(arr: string | any[]) {
    if (arr.length === 4) {
      const middleIndex = Math.floor(arr.length / 2);
      const firstHalf = arr.slice(0, middleIndex);
      const secondHalf = arr.slice(middleIndex);
      return [firstHalf, secondHalf];
    } else {
      const splitIndex = Math.ceil(arr.length / 3);
      const firstPart = arr.slice(0, splitIndex);
      const secondPart = arr.slice(splitIndex, 2 * splitIndex);
      const thirdPart = arr.slice(2 * splitIndex);
      return [firstPart, secondPart, thirdPart];
    }
  }

          

    const [parameters,setparameters] = useState([

      {parameter:'Wind-Speed',key:1,apiFields:2,apiField1:data?.current?.wind_mph,apiField2:data?.current?.wind_kph,renderState:1},
        { parameter:'Pressure',key:2,apiFields:2,apiField1:data?.current?.pressure_mb,apiField2:data?.current?.pressure_in,renderState:2},
        { parameter:'Precipitation',key:3,apiFields:2,apiField1:data?.current?.pressure_mb,apiField2:data?.current?.pressure_in,renderState:2},
        {parameter:'Humidity',key:4,apiFields:1,apiField1:data?.current?.humidity,apiField2:null,renderState:2},
        {parameter:'UV index',key:5,apiFields:1,apiField1:data?.current?.uv,apiField2:null,renderState:2}
        ])

    

        useEffect(()=>{
            if (presentRoute.route==='Tomorrow') {
              console.log(nextdayQuery?.data?.forecast?.forecastday[0]?.day?.maxwind_mph,'test',nextdayQuery?.data?.forecast?.forecastday[1].day.maxwind_mph,nextdayQuery?.data?.forecast[1])
              if (nextdayQuery.isLoading===false) {
                setdefaultstate(false)
              setparameters([
                {parameter:'Wind-Speed',key:1,apiFields:2,apiField1:nextdayQuery.data.forecast?.forecastday[1]?.day?.maxwind_mph,apiField2:nextdayQuery.data.forecast?.forecastday[1].day?.wind_kph,renderState:1},
                { parameter:'Pressure',key:2,apiFields:2,apiField1:nextdayQuery.data.forecast?.forecastday[1]?.day?.pressure_mb,apiField2:nextdayQuery.data.forecast?.forecastday[1].day?.pressure_in,renderState:2},
                { parameter:'Precipitation',key:3,apiFields:2,apiField1:nextdayQuery.data.forecast?.forecastday[1]?.day?.totalprecip_mm,apiField2:nextdayQuery.data.forecast?.forecastday[1].day?.totalprecip_in,renderState:2},
                {parameter:'Humidity',key:4,apiFields:1,apiField1:nextdayQuery.data.forecast?.forecastday[1]?.day?.humidity,apiField2:null,renderState:2},
                {parameter:'UV index',key:5,apiFields:1,apiField1:nextdayQuery.data.forecast?.forecastday[1]?.day?.uv,apiField2:null,renderState:2}
              ])
              console.log(parameters[0],parameters[1],'TOmoofow')
              } 
              
            }
            if (isLoading===false) {
              setparameters([{parameter:'Wind-Speed',key:1,apiFields:2,apiField1:data?.current?.wind_mph,apiField2:data?.current?.wind_kph,renderState:1},
            { parameter:'Pressure',key:2,apiFields:2,apiField1:data?.current?.pressure_mb,apiField2:data?.current?.pressure_in,renderState:2},
            { parameter:'Precipitation',key:3,apiFields:2,apiField1:data?.current?.precip_mm,apiField2:data?.current?.precip_in,renderState:2},
            {parameter:'Humidity',key:4,apiFields:1,apiField1:data?.current?.humidity,apiField2:null,renderState:2},
            {parameter:'UV-Index',key:5,apiFields:1,apiField1:data?.current?.uv,apiField2:null,renderState:2}])
            console.log(parameters[0])
            }
        },[presentRoute.route,isLoading,defaultState])
        


  return(
    <View style={ styles.container}>
      {parameters.map((parameters,index)=>{return(
        <Weatherparameter time='' key={index} isLoading={defaultState?isLoading:nextdayQuery.isLoading} value={parameters.apiField1} parameter={parameters.parameter} />
      )})}
    </View>
  )

      }

export default ParameterMap

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    flexWrap:'wrap',

  }

})