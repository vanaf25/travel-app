import { Col, Row, Select } from 'antd';
import React, {createRef, useEffect, useState} from 'react';
import { Typography } from 'antd';
import classes from "./List.module.css";
import PlaceDescription from './PlaceDescription/PlaceDescription';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {setRating, setTypeOfPlaces, typeOfPlaces } from '../../store/cordReducer';
const { Title } = Typography;
const {Option}=Select
const List:React.FC<{places:Array<any>}>=React.memo( ({places}) => {
    const childClickedCords=useSelector((state:RootState)=>state.cords.childClickedCords);
    const [elRefs,setElRefs]=useState<any>([])
    const types=[
        "restaurants",
        "hotels",
        "attractions"
    ]
    const ratings=[
        {text:"all",value:0},
        {text:"Above 3.0",value:3},
        {text:"Above 4.0",value:4},
        {text:"Above 4.5",value: 4.5}
    ]
    useEffect(()=>{
        if (places.length){
            const refs=Array(places.length).fill('').map((_,i)=>elRefs[i] || createRef())
            setElRefs(refs)
        }
    },[places]);
    const dispatch=useDispatch();
    const [currentType,setCurrentType]=useState<typeOfPlaces>('hotels')
    const [currentRating,setCurrentRating]=useState(0)
    const onChangeTypeOfPlaces=(val:typeOfPlaces)=>{
        setCurrentType(val);
        dispatch(setTypeOfPlaces(val))
    }
    const onChangeRating=(val:number)=>{
        setCurrentRating(val);
        dispatch(setRating(val));
    }
    return (
        <Col className={classes.list} span={8}>
            <Title className={classes.list__title} level={2}>Food & Dining Around you</Title>
            <Row style={{marginBottom:10}}>
                <Select style={{width:120,marginRight:10}} defaultValue={currentType} onChange={onChangeTypeOfPlaces} >
                    {types.map((type,index)=><Option value={type} key={index} >{type[0].toUpperCase()+type.substring(1)}</Option>)}
                </Select>
                <Select style={{width:120}} defaultValue={currentRating} onChange={onChangeRating}>
                    {ratings.map((rating,index)=><Option value={rating.value} key={index}>{rating.text}</Option>)}
                </Select>
            </Row>
           {places.length && places.map((place,i)=><PlaceDescription
               elRef={elRefs[i]}
               key={i}
               selected={place.longitude===childClickedCords.lng &&
               place.latitude===childClickedCords.lat}
               placeDescription={place}/>)}
        </Col>
    );
});

export default List;