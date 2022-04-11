import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {boundsType} from "../types/storeTypes/storeTypes";
const BASE_URL="https://travel-advisor.p.rapidapi.com/"
export const createHeaders=(params?:any,host?:string,apiKey?:string)=>{
    const API_KEY="b304f5c1eamsh6f224494603f8aap1b230cjsn50c651519d0b"
    return {
        'x-rapidapi-host': host ? host: 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': apiKey ? apiKey:API_KEY,
        ...params
    }
}
export const placesApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getPlacesByType: builder.query<any, {
            type:"hotels" | "restaurants" | "attractions",
            bounds:boundsType | null
        }>({
            query: ({type,bounds}) =>({
                url:`${type}/list-in-boundary`,
                headers:createHeaders(),
                params:{
                    tr_longitude: bounds?.ne.lng,
                    tr_latitude: bounds?.ne.lat,
                    bl_longitude: bounds?.sw.lng,
                    bl_latitude: bounds?.sw.lat,
                }
            }) 
          
        }),
    }),
});
export const { useGetPlacesByTypeQuery } = placesApi
