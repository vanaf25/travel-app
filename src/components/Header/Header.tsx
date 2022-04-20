import { Input } from 'antd';
import { setCoordinates } from '../../store/cordReducer';
import {useDispatch} from "react-redux";
import {useState} from "react";
import classes from "./Header.module.css"
import {Autocomplete} from "@react-google-maps/api";
const { Search } = Input;
const HeaderComponent = () => {
    const dispatch=useDispatch();
    const [autoComplete,setAutoComplete]=useState<any>(null);
    const onLoad=(autoC:any)=>setAutoComplete(autoC);
    const onPlaceChanged=()=>{
            const lat=autoComplete.getPlace().geometry.location.lat();
            const lng=autoComplete.getPlace().geometry.location.lng();
            dispatch(setCoordinates({lat,lng}))
        }
    return (
        <div className={classes.header}>
            <div className={`container ${classes.header__container}`}>
                <div className={classes.header__title}>
                   Travel  app
                </div>
                <div className={classes.header__search}>
                    <div className={classes.search__title}>
                        Explore new places
                    </div>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <Search
                            placeholder="input search text"
                            allowClear
                            enterButton="Search"
                            size="large"
                        />
                    </Autocomplete>

                </div>
            </div>
        </div>
    );
};

export default HeaderComponent;
