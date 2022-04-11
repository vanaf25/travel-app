import { Rate } from 'antd';
import React from 'react';
import classes from './PlaceCard.module.css'
const PlaceCard:React.FC<{place:any}> = ({place}) => {
    return (
        <div className={classes.placeCard} >
           <h3>{place.name}</h3>
            {place.photo &&   <img src={place.photo.images.thumbnail.url} alt={place.name}/>}
            <Rate disabled defaultValue={place.rating} style={{fontSize:10}} />
        </div>
    );
};

export default PlaceCard;