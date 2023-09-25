import { useQuery } from "@tanstack/react-query";
import {useEffect,useState} from 'react'


const getData = async(city:string)=>{
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=5523c0463b154c3b8ab152458230909&q=${city}&aqi=yes`)
        const data = await response.json()
           return data
        };


export default function useCurrentData(city:string){
    type key = string
 return   useQuery({queryKey:['currentData',city],queryFn:getData(city)})
}