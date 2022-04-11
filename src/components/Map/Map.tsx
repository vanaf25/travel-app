import React from 'react';
import GoogleMapReact from "google-map-react"
import PlaceCard from "./PlaceCard/PlaceCard";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {setBounds, setChildClickedCords, setCoordinates } from '../../store/cordReducer';
import {coordinatesType} from "../../types/storeTypes/storeTypes";
import WeatherCard from "./WeatherCard/WeatherCard";
import {getBounds, getCoordinates} from "../../store/selectors";
type MapPropsType={
    places:Array<any>,
    dataWeather:dataWeatherType
}
type dataWeatherType={
    weather:Array<{
        id:number,
        main:string,
        description:string,
        icon:string
    }>,
    coord:{
        lon:number,
        lat:number
    }
}
const Map:React.FC<MapPropsType> =React.memo( ({places,dataWeather}) => {
    const dispatch=useDispatch();
      const coordinates = useSelector(getCoordinates);
      const bounds=useSelector(getBounds)
    return (
            <GoogleMapReact
            onChange={(e)=>{
                console.log("Event",e);
                const coords=e.center;
                const sw=e.bounds.sw;
                const ne=e.bounds.ne;
                if (coordinates.lat!==coords.lat || coordinates.lng!==coords.lng)  dispatch(setCoordinates({lat:coords.lat,lng:coords.lng}));
                if (bounds?.sw.lat!==sw.lat || bounds?.sw.lng!==sw.lng || bounds?.ne.lat!==ne.lat || bounds?.ne.lng!==ne.lng){
                    console.log('boundsMap',e.bounds);
                    dispatch(setBounds({sw,ne}));
                }

            }}
                defaultZoom={14}
                margin={[50,50,50,50]}
                center={coordinates}
                defaultCenter={coordinates}
                bootstrapURLKeys={{key:"AIzaSyBt1B1q3fNTpBQ-m8xc5vN_PxLK9gTByYM"}}
                onChildClick={(listKey:string,childProps:coordinatesType)=>{
                    console.log(listKey,childProps)
                    dispatch(setChildClickedCords({lng:childProps.lng,lat:childProps.lat}))
            }}
            >
                {
                  places &&  places.map(place=>{
                      if (place.latitude && place.longitude){
                          // @ts-ignore
                          return  <PlaceCard key={place.listing_key} lat={place.latitude}
                                             lng={place.longitude} place={place}/>
                      }
                        }
                    )
                }
                {dataWeather && <WeatherCard src={dataWeather.weather[0].icon} lat={dataWeather.coord.lat} lng={dataWeather.coord.lon}/>}

            </GoogleMapReact>
    );
});
export default Map;