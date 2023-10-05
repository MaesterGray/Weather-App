import { configureStore } from "@reduxjs/toolkit";
import cityReducer from './city'
import imagereducer from './imageviewstate'
export default configureStore({
    reducer:{
        city:cityReducer,
        imageViewState:imagereducer
    }
})