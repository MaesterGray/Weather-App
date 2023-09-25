import React from 'react'
import {Text,StyleSheet,FlatList} from 'react-native'
import Forecastholders from 'components/forecastholders'
import { useQuery,useQueryClient,QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Tendayscontainer from 'components/Tendayscontainer'

const queryClient = new QueryClient

const tendays = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Tendayscontainer city={'Lagos'}/>
    </QueryClientProvider>
  )
}

export default tendays

