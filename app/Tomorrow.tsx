import {Text,StyleSheet} from 'react-native'
import AppContainer from 'components/AppContainer'

const stylesheet=StyleSheet.create(
    {
        text:{
            color:'black',
            fontFamily:'Roboto'
        }
    }
)

const Tomorrow = () => {
  return (
    <AppContainer city='Lagos'/>
    )
}

export default Tomorrow