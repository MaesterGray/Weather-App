import { View, Text } from 'react-native'
import React from 'react'
import AppContainer from 'components/AppContainer'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import configurestore from 'redux/configurestore'


const queryClient = new QueryClient

const Tomorrow = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={configurestore}>
   <AppContainer />
   </Provider>
   </QueryClientProvider>
  )
}

export default Tomorrow