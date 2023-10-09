import { GestureDetector, PanGestureHandler } from 'react-native-gesture-handler'
import { StyleSheet, Text, View,Dimensions,FlatList } from 'react-native'
import React from 'react'
import Progressbars from './progressbars'
import { useQueryClient,useQuery } from '@tanstack/react-query'

const screenheight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

type parameter ={
    arr:[{time:string,probability:number},
        {time:string,probability:number},
        {time:string,probability:number},
        {time:string,probability:number}]|any,
    multiple:number
}

const ProgressBarsHoc = ({arr,multiple}:parameter) => {

 
  return (
    <View style={styles.container}>
        <FlatList data={arr} renderItem={({item,index})=>(<Progressbars time={`${multiple + (index)}:00`} probability={item.chance_of_rain}/>)} />
      <Text>{}</Text>
    </View>
  )
}

export default ProgressBarsHoc

const styles = StyleSheet.create({
    container:{
    width:0.92*screenWidth,

    }
})