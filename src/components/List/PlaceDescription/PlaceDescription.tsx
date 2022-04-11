import {EnvironmentOutlined, PhoneOutlined, QuestionOutlined } from '@ant-design/icons';
import Rate from 'antd/lib/rate';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import classes from "./../List.module.css";
import {log} from "util";
type AwardType={
    award_type:string,
    categories:Array<any>,
    year:string,
    images:{
        small:string,
        large:string
    },
    display_name:string
}
type PlaceDescriptionPropsType={
    placeDescription:any,
    elRef:React.RefObject<HTMLDivElement>,
    selected:boolean
}
const PlaceDescription:React.FC<PlaceDescriptionPropsType> = ({
    selected,
                                                                  placeDescription,

                                                                  elRef}) => {
    if (selected) elRef?.current?.scrollIntoView({behavior:"smooth",block:"center"});
    return (
        <div  ref={elRef} className={classes.list__item}>
        <div className={classes.item__image}>
            <img
                alt="example"
                src={placeDescription.photo ? placeDescription.photo.images.large.url:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
            />
        </div>
        <div className={classes.item__description}>
            <Title level={3}>{placeDescription.name}</Title>
            <div className={classes.description__flexBox}>
                <Rate disabled defaultValue={placeDescription.rating} />
                <span>{placeDescription.num_reviews}</span>
            </div>
            <div className={classes.description__flexBox}>
                <span>price</span>
                <span>{placeDescription.price || <QuestionOutlined />}</span>
            </div>
            <div className={classes.description__flexBox}>
                <span>Ranking</span>
                <span>{placeDescription.ranking}</span>
            </div>
            {placeDescription && placeDescription.awards && placeDescription.awards.map((award:AwardType,i:number)=>(
                <React.Fragment key={i}>
                    { award && <div  className={classes.description__flexBox}>
                        <img src={award.images.small} alt=""/>
                        <span>{award.display_name}</span>
                    </div> }
                </React.Fragment>

            ))}
            <div className={classes.description__tags}>
                { placeDescription && placeDescription.ancestors && placeDescription.ancestors.map((tag:any,index:number)=><div key={index}
                                            className={classes.description__tag}>{tag.name}</div>)}
            </div>
            <div className={classes.description__flexBox}>
                <EnvironmentOutlined />
                <span>{placeDescription.location_string ||  <QuestionOutlined /> } </span>
            </div>
            <div className={classes.description__flexBox}>
                <PhoneOutlined />
                <span>{placeDescription.phone ||  <QuestionOutlined /> }</span>
            </div>
            <div className={classes.description__tags}>
                {placeDescription.website && <div   className={classes.description__tag}>{<a target={"_blank"} href={placeDescription.website}>Website</a>} </div> }
                {placeDescription.web_url && <div className={classes.description__tag}>{<a target={"_blank"} href={placeDescription.web_url}>websiteUrl</a>}</div>}
            </div>
        </div>
    </div>
    );
};

export default PlaceDescription;