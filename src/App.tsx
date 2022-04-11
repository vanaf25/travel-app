import React, {useEffect, useState} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Col, Layout, Row  } from 'antd';
import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { useGetPlacesByTypeQuery } from './store/placesApi';
import {useDispatch, useSelector} from 'react-redux';
import { setCoordinates, setFilteredPlaces } from './store/cordReducer';
import {getBounds, getCoordinates, getCurrentRating, getFilteredPlaces, getTypeOfPlaces} from "./store/selectors";
import { useGetWeatherQuery } from './store/weatherApi';
function App() {
  const bounds = useSelector(getBounds);
  const [dataPlaces,setDataPLaces]=useState<Array<any>>([]);
  const dispatch=useDispatch();
    const typeOfPlaces=useSelector(getTypeOfPlaces);
    const currentRating=useSelector(getCurrentRating);
    const coordinates=useSelector(getCoordinates);
    const {data,isLoading}=useGetPlacesByTypeQuery({type:typeOfPlaces,bounds},{skip:!bounds});
    const  {data:dataWeather,isLoading:isLoadingDataWeather}
    =useGetWeatherQuery(coordinates,{skip:coordinates.lat===0 && coordinates.lng===0});
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
      dispatch(setCoordinates({lat:latitude,lng:longitude}));
    })
  },[]);
  useEffect(()=>console.log("IsLoading",isLoading),[isLoading]);
  useEffect(()=>{
      if (data?.data){
          dispatch(setFilteredPlaces(data.data));
      }
  },[currentRating]);
  const filteredPlaces=useSelector(getFilteredPlaces);
  useEffect(()=>console.log("Filtered Places",filteredPlaces),[filteredPlaces]);
  useEffect(()=>console.log("bounds",bounds),[]);
  return (
      <Layout className={"wrapper"}>
        <Header/>
            <Row className={"main"}>
              {!isLoading  && <List places={filteredPlaces.length ? filteredPlaces: data?.data ? data.data:[] }/>}
            <Col span={16}>
             <Map  dataWeather={dataWeather}  places={filteredPlaces.length ? filteredPlaces:  data?.data ? data.data:[]}/>
            </Col>
        </Row>
        <Footer/>
      </Layout>
// GLORU TO UKRAINE
  );
}

export default App;
