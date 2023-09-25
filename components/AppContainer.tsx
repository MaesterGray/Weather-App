import { View, Text , StyleSheet,ScrollView,ImageBackground, Dimensions,FlatList,Pressable, StatusBar,SafeAreaView,ActivityIndicator} from 'react-native'
import {useEffect} from 'react'
import Weatherdisplay from 'components/Weatherdisplay'
import Animated,{withTiming} from 'react-native-reanimated'
import ChanceofRain from 'components/ChanceofRain'
import ImageView from './ImageView'
import NavigationContainer from './NavigationContainer'
import ParameterMap from './ParameterMap'
import { useQueryClient,useQuery,QueryClientProvider,QueryClient } from '@tanstack/react-query'


type props = {
    city:string
}


const windowHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const AppContainer = ({city}:props) => {
    const queryClient = useQueryClient()
  

  return (
   < QueryClientProvider client={queryClient}>
        <ImageView />
        <NavigationContainer/>

       <ScrollView style={styles.scrollview}>
        <ParameterMap context='' city={city}/>
        <Weatherdisplay city={city}/>
        <ChanceofRain city='Lagos'/>
       </ScrollView>

    </QueryClientProvider>

  )
}

export default AppContainer

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