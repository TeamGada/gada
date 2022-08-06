import React from 'react';
import styled from 'styled-components';
import useModal from 'hooks/useModal';
import { useDispatch } from 'react-redux';
import { changeLocationState } from 'store/modules/main/location';

interface CardProps {
    imgUrl: string;
    location: string;
}

const LocationCard = ({ imgUrl, location } : CardProps) => {
    const dispatch = useDispatch();
    const openModal = useModal("NewPlanModal");

    const payload = {
        isClickedLocation: true,
        imageUrl: imgUrl,
        locationName: location
    }

    const clickHandler = () => {
        dispatch(changeLocationState(payload))
        openModal();
    }

    return (
        <Wrapper 
        onClick={clickHandler}
        imgUrl={imgUrl}>
            <LocationCardOpacity>{location}</LocationCardOpacity>
        </Wrapper>
    )
}

export default LocationCard;

const Wrapper = styled.div<{ imgUrl : string }>`
    position: relative;
    width: 235px;
    height: 235px;
    background-image: url('${({imgUrl}) => imgUrl}');
    background-repeat : no-repeat;
    background-size : cover;
    border-radius: 10px;

    transition: all .2s ease-in-out;

    &:hover {
        transform: translate(0, -5px);
        box-shadow: 0 8px 18px -5px rgb(0,0,0,10%);
    }
`

const LocationCardOpacity = styled.div`
    color: white;
    text-align: center;
    letter-spacing: 3px;
    line-height: 232.5px;
    font-size: 24px;

    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 0;
    border-radius: 10px;
`