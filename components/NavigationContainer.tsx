import { StyleSheet, Text, View, FlatList,Pressable,Dimensions } from 'react-native'
import { router,useLocalSearchParams } from 'expo-router'
import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import React from 'react'
import { setImageViewState } from 'redux/imageviewstate'


const windowHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const NavigationContainer = () => {

    const data=[
      {display:'Today',route:'/',navigationFn:()=>{router.push({pathname:`${data[0].route}`}); if ('') {
        
      }setImageViewState()}}
      ,{display:'Tommorow',route:'/other/Tomorrow'},
     // {display:'10 days',route:'/tendays'}
    ]
    const [renderState,setrenderState]= useState('Today')
    const route = useLocalSearchParams()


  return (
    <FlatList contentContainerStyle={styles.navigationContainer}  horizontal={true} data={data} renderItem={({item})=>(
        <Pressable style={styles.navigationPressable} onPress={()=>{router.push({pathname:`${item.route}`})}}>
            <Text style={{color:'black'}}>{item.display}</Text>
            </Pressable>
    )}>
      <Text>NavigationContainer</Text>
    </FlatList>
  )
}

export default NavigationContainer

const styles = StyleSheet.create({
    navigationPressable:{
        height:0.047* windowHeight,
        borderRadius:10,
        marginLeft:0.049* screenWidth,
        width: (0.28 * screenWidth) *1.5 ,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2,
        borderColor:'black'
      },navigationContainer:{
        height:0.070 * windowHeight,
        alignItems:'center',
        paddingright:0.038 * screenWidth,
      }
})