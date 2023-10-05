import { createSlice } from '@reduxjs/toolkit'

export interface CityState {
  value: string
}

const initialState: CityState = {
  city: 'Lagos',
}

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setstring: (state,action) => {
        state.city = action.payload
    },
    
    }
  })

// Action creators are generated for each case reducer function
export const { setstring} = citySlice.actions

export default citySlice.reducer