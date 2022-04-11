import {RootState} from "./store";
export const getBounds=(state:RootState)=>state.cords.bounds
export const getCoordinates=(state:RootState)=>state.cords.coordinates
export const getChildClicked=(state:RootState)=>state.cords.childClickedCords
export const getTypeOfPlaces=(state:RootState)=>state.cords.typeOfPlaces
export const getCurrentRating=(state:RootState)=>state.cords.currentRating
export const getFilteredPlaces=(state:RootState)=>state.cords.filteredPlaces