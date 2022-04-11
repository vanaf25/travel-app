import React from 'react';
const WeatherCard:React.FC<{src:string,lat:number,lng:number}> = ({src}) => {
    return (
        <img src={`http://openweathermap.org/img/w/${src}.png`} alt={src}/>
    );
};

export default WeatherCard;