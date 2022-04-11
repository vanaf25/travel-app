import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {boundsType, coordinatesType} from "../types/storeTypes/storeTypes";
export type typeOfPlaces="hotels" | "restaurants" | "attractions";
type initialStateType={
    childClickedCords:coordinatesType,
    bounds:boundsType | null ,
    coordinates:coordinatesType,
    typeOfPlaces:typeOfPlaces,
    currentRating:number,
    isLoading:boolean
    filteredPlaces:Array<any>
}
const initialState:initialStateType={
    filteredPlaces:[],
    isLoading:false,
    childClickedCords:{
        lat:0,
        lng:0
    },
    currentRating:0,
    typeOfPlaces:"hotels",
    bounds:null,
  coordinates:{
        lat:0,
      lng:0
  },
}

export const cordSlice=createSlice({
    name:"cord",
initialState,
    reducers:{
        setBounds:(state,action:PayloadAction<boundsType>)=>{
            state.bounds=action.payload
        },
        setCoordinates:(state,action:PayloadAction<coordinatesType>)=>{
            state.coordinates=action.payload
        },
        setChildClickedCords:(state,action:PayloadAction<coordinatesType>)=>{
            state.childClickedCords=action.payload
        },
        setTypeOfPlaces:(state,action:PayloadAction<typeOfPlaces>)=>{
            state.typeOfPlaces=action.payload
        },
        setRating:(state,action:PayloadAction<number>)=>{
            state.currentRating=action.payload
        },
        setFilteredPlaces:(state,action:PayloadAction<Array<any>>)=>{
            state.filteredPlaces=action.payload.filter(place=>place.rating>state.currentRating);
        }
    }
})
export const {setBounds,setCoordinates,setChildClickedCords,setTypeOfPlaces,setRating,setFilteredPlaces}=cordSlice.actions
export default cordSlice.reducer