import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {coordinatesType} from "../types/storeTypes/storeTypes";
const BASE_URL="https://community-open-weather-map.p.rapidapi.com/"
export const createHeaders=(params?:any,host?:string,apiKey?:string)=>{
    const API_KEY="b304f5c1eamsh6f224494603f8aap1b230cjsn50c651519d0b"
    return {
        'x-rapidapi-host': host ? host: 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': apiKey ? apiKey:API_KEY,
        ...params
    }
}
export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getWeather: builder.query<any, coordinatesType | null>({
            query: (coords) =>({
                url:`weather`,
                headers:createHeaders(),
                params:{
                   lat:coords?.lat,
                    lon:coords?.lng
                }
            })

        }),
    }),
});
export const { useGetWeatherQuery } = weatherApi
