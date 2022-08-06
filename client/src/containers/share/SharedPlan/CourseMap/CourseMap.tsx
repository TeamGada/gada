import React, { FC, useEffect, useMemo, useRef } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import { Place } from 'store/modules/plan';
import jeju from 'images/jeju.jpg';
import { theme } from 'styles/theme';
import PlaceMarker from './PlaceMarker';
import PlacePolyline from './PlacePolyline';

const placeListSelector = (state: RootState) => state.share.planList;
const setDaySelector = (state: RootState) => state.share.setDay;
const placeDistanceSelector = (state: RootState) => state.share.placeDistance;
const placeDistanceCenterSelector = (state: RootState) =>
    state.share.placeDistanceCenter;
const mapCenterBoundSelector = (state: RootState) => state.share.mapCenterBound;

const CourseMap = () => {
    const placeList: Place[][] = useSelector(placeListSelector);
    const setDay = useSelector(setDaySelector);
    const placeDistance = useSelector(placeDistanceSelector);
    const placeDistanceCenter = useSelector(placeDistanceCenterSelector);
    const mapCenterBound = useSelector(mapCenterBoundSelector);

    const mapRef = useRef<kakao.maps.Map>(null);

    const validPlaceList = useMemo(
        () => placeList.length > 0 && placeList[setDay].length > 0,
        [placeList, setDay],
    );

    useEffect(() => {
        const map = mapRef.current;
        if (map && mapCenterBound && validPlaceList)
            map.setBounds(mapCenterBound);
    }, [mapCenterBound, setDay]);

    return (
        <Container>
            <Map
                center={{ lat: 33.450701, lng: 126.570667 }}
                style={{
                    width: '100%',
                    height: '100%',
                }}
                ref={mapRef}
                minLevel={4}
            >
                {validPlaceList &&
                    placeList[setDay].map((placeDetail, index) => {
                        const position = getPositionByIPlace(placeDetail);
                        return (
                            <React.Fragment
                                key={`frag-${placeDetail.id}-${placeDetail.latitude}-${placeDetail.longitude}`}
                            >
                                <PlaceMarker
                                    key={`marker-${placeDetail.name}-${placeDetail.latitude}-${placeDetail.longitude}`}
                                    position={position}
                                    name={placeDetail.name}
                                    img={placeDetail.imgUrl ?? jeju}
                                    index={index}
                                    color={theme.USER_PLAN_COLOR[index]}
                                />
                                <PlacePolyline
                                    key={`line-${placeDetail.id}-${placeDetail.latitude}-${placeDetail.longitude}`}
                                    path={
                                        index > 0
                                            ? [
                                                  getPositionByIPlace(
                                                      placeList[setDay][
                                                          index - 1
                                                      ],
                                                  ),
                                                  position,
                                              ]
                                            : [position]
                                    }
                                    center={placeDistanceCenter[index - 1]}
                                    distance={placeDistance[index - 1]}
                                />
                            </React.Fragment>
                        );
                    })}
            </Map>
        </Container>
    );
};

const getPositionByIPlace = (data: Place) => ({
    lat: Number(data.latitude),
    lng: Number(data.longitude),
});

const Container = styled.div`
    background-color: #faeacd;
    width: 810px;
    height: 540px;
    margin: 0 30px 30px 30px;
    position: relative;
`;

export default CourseMap;
