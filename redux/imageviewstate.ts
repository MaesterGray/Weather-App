import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
    state:boolean
}

const initialState:InitialState ={
    state:false
}

export const imageViewSlice = createSlice({
    name:'imageViewState',
    initialState,
    reducers:{
        setImageViewState:(state)=>{
            state.state=!state.state
        }
    }
})

export const {setImageViewState} = imageViewSlice.actions

export default imageViewSlice.reducer