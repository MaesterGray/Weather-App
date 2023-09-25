import { View, Text } from 'react-native'
import React from 'react'
import AppContainer from 'components/AppContainer'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'


const queryClient = new QueryClient

const Tomorrow = () => {
  return (
    <QueryClientProvider client={queryClient}>
   <AppContainer city='Lagos'/>
   </QueryClientProvider>
  )
}

export default Tomorrow