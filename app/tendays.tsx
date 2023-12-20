import React from 'react'
import {Text,StyleSheet,FlatList} from 'react-native'
import Forecastholders from 'components/forecastholders'
import { useQuery,useQueryClient,QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Tendayscontainer from 'components/Tendayscontainer'
import { Provider } from 'react-redux'
import configurestore from 'redux/configurestore'

const queryClient = new QueryClient

const tendays = () => {
  return (
      <Provider store={configurestore}>
      <Tendayscontainer />
      </Provider>
  )
}

export default tendays

