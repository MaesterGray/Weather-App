import { StyleSheet, Text, View ,Dimensions} from 'react-native'
import React from 'react'


const screenheight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width
const progressWidth = 0.55 * screenWidth

type props ={
  time:string,
  probability:number
}

const Progressbars = ({time,probability}:props) => {
  return (
    <View style={styles.container}>

      <Text>{time}</Text>

      <View style={styles.progressContainer}>
        <View style={{width:(probability/100)*progressWidth,
                      backgroundColor:'purple',
                      height:0.027*screenheight,
    borderRadius:10
  }}></View>
      </View>

      <Text>{probability}%</Text>
    </View>
  )
}

export default Progressbars

const styles = StyleSheet.create({
  container:{
    width:0.92*screenWidth,
    height:0.03*screenheight,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:0.012*screenheight
    
  },
  progressContainer:{
    width:0.55 * screenWidth,
    height:0.027 * screenheight,
    backgroundColor:'rgb(250,237,255)',
    borderRadius:10
  }
})