import { StyleSheet, Text, View,Dimensions,ActivityIndicator } from 'react-native'
import { Feather , Entypo} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react'

const screenheight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

type parameter = {
  parameter:string,
  time:string,
  value:any,
  isLoading:boolean
}

const Weatherparameter = ({parameter,value,isLoading}:parameter) => {
if (parameter==='Wind-Speed'){
  return (
    <View style={styles.parameterContainer}>
      <View style={styles.iconContainer}>
          <Feather name='wind' size={12} color={'black'}/>
      </View>

      <View style={{flexDirection:'column',gap:3}}>
        <Text>{parameter}</Text>
        <Text>{isLoading?<ActivityIndicator size={'small'}/>:value}</Text>
      </View>

    </View>
  )
}else if (parameter==='Pressure'){
  return (
    <View style={styles.parameterContainer}>
      <View style={styles.iconContainer}>
          <MaterialIcons name='waves' size={12} color={'black'}/>
      </View>

      <View style={{flexDirection:'column',gap:3}}>
        <Text>{parameter}</Text>
        <Text>{isLoading?<ActivityIndicator size={'small'}/>:value}</Text>
      </View>

    </View>
  )
}else if(parameter==='Rain chance'){
  return (
    <View style={styles.parameterContainer}>
      <View style={styles.iconContainer}>
          <Ionicons name='rainy-outline' size={12} color={'black'}/>
      </View>

      <View style={{flexDirection:'column',gap:3}}>
        <Text>{parameter}</Text>
        <Text>{isLoading?<ActivityIndicator size={'small'}/>:value}</Text>
      </View>

    </View>
  )
}else if(parameter==='UV-Index'){
  return (
    <View style={styles.parameterContainer}>
      <View style={styles.iconContainer}>
          <Feather name='sun' size={12} color={'black'}/>
      </View>

      <View style={{flexDirection:'column',gap:3}}>
        <Text>{parameter}</Text>
        <Text>{isLoading?<ActivityIndicator size={'small'}/>:value}</Text>
      </View>

    </View>
  )
}
else if(parameter==='Humidity'){
  return (
    <View style={styles.parameterContainer}>
      <View style={styles.iconContainer}>
          <Feather name='droplet' size={12} color={'black'}/>
      </View>

      <View style={{flexDirection:'column',gap:3}}>
        <Text>{parameter}</Text>
        <Text>{isLoading?<ActivityIndicator size={'small'}/>:value}</Text>
      </View>

    </View>
  )
}
else if(parameter==='Precipitation'){
  return (
    <View style={styles.parameterContainer}>
      <View style={styles.iconContainer}>
          <Entypo name='drop' size={12} color={'black'}/>
      </View>

      <View style={{flexDirection:'column',gap:3}}>
        <Text>{parameter}</Text>
        <Text>{isLoading?<ActivityIndicator size={'small'}/>:value}</Text>
      </View>

    </View>
  )
}else if(parameter==='Sunrise'){
  return (
    <View style={styles.parameterContainer}>
      <View style={styles.iconContainer}>
          <Feather name='moon' size={12} color={'black'}/>
      </View>

      <View style={{flexDirection:'column',gap:3}}>
        <Text>{parameter}</Text>
      </View>

    </View>)
}else if(parameter==='Sunset'){
  return (
    <View style={styles.parameterContainer}>
      <View style={styles.iconContainer}>
          <Feather name='sun' size={12} color={'black'}/>
      </View>

      <View style={{flexDirection:'column',gap:3}}>
        <Text>{parameter}</Text>
      </View>

    </View>)
}

  
}

export default Weatherparameter

const styles = StyleSheet.create({
  parameterContainer:{
    backgroundColor:'rgba(206,188,255,0.3)',
    width:0.44 * screenWidth,
    height:0.072 * screenheight,
    flexDirection:'row',
    marginLeft: 0.038 * screenWidth,
    marginTop: 0.0144 * screenheight,
    alignItems:'center',
    borderRadius:10,
    gap:5,
    padding:8
  },
  iconContainer:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    height: 0.034 * screenheight,
    width: 0.034 * screenheight,
    borderRadius:50
  }
})