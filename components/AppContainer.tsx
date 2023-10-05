import { View, Text , StyleSheet,ScrollView,ImageBackground, Dimensions,FlatList,Pressable, StatusBar,SafeAreaView,ActivityIndicator} from 'react-native'
import {useEffect} from 'react'
import Weatherdisplay from 'components/Weatherdisplay'
import Animated,{withTiming} from 'react-native-reanimated'
import ChanceofRain from 'components/ChanceofRain'
import ImageView from './ImageView'
import NavigationContainer from './NavigationContainer'
import ParameterMap from './ParameterMap'
import { useQueryClient,useQuery,QueryClientProvider,QueryClient } from '@tanstack/react-query'
import { useDispatch,useSelector } from 'react-redux'
import { setstring } from 'redux/city'
import configurestore from 'redux/configurestore'
import { Provider } from 'react-redux'

type props = {
    city:string
}


const windowHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const AppContainer = () => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()


  return (
   < QueryClientProvider client={queryClient}>
    <Provider store={configurestore}>
        <ImageView  />
        <NavigationContainer/>

       <ScrollView style={styles.scrollview}>
        <ParameterMap />
        <Weatherdisplay />
       </ScrollView>
       </Provider>
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