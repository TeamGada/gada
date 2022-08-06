import React, { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { RootState } from 'store/modules';
import { useDispatch, useSelector } from 'react-redux';
import { insertSelectedPlaces } from 'store/modules/plan/search';
import { Position, SearchedPlaceInfo } from 'store/modules/plan';
import PickMapPlace from './PickMapPlace';

const movePoint = (state: RootState) => state.search.moving;
const centerPoint = (state: RootState) => state.search.center;

const CustomPlace = () => {
    const dispatch = useDispatch();
    const [position, setPosition] = useState<Position>();

    const moving = useSelector(movePoint);
    const mapCenter = useSelector(centerPoint);

    const executeMapEvent = (
        _t: kakao.maps.Map,
        mouseEvent: kakao.maps.event.MouseEvent,
    ) => {
        setPosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
        });
    };

    const pickMapPlaceEvent = (customPlace: SearchedPlaceInfo) => {
        dispatch(insertSelectedPlaces(customPlace));
    };
    return (
        <Map
            center={moving ?? mapCenter}
            isPanto={moving !== undefined}
            style={{
                width: '100%',
                height: '470px',
            }}
            level={3}
            disableDoubleClickZoom
            onDoubleClick={executeMapEvent}
        >
            {position && (
                <PickMapPlace
                    position={position}
                    callback={pickMapPlaceEvent}
                />
            )}
        </Map>
    );
};

export default CustomPlace;
