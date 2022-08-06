import React, { useRef } from 'react';
import { CustomOverlayMap, Polyline } from 'react-kakao-maps-sdk';
import { Position } from 'store/modules/plan';
import styled from 'styled-components';
import { setDistanceText } from 'utils/mapPointHelper';

type Props = {
    path: any;
    center: Position | undefined;
    distance: number;
};

const PlacePolyline = ({ path, center, distance }: Props) => {
    const textRef = useRef(document.createElement('div'));

    let textTimeoutId: NodeJS.Timeout | undefined;

    const onMouseoverPolyline = (e: kakao.maps.Polyline) => {
        if (textRef.current) {
            textRef.current.classList.add('visible');
        }
        e.setOptions({
            strokeColor: '#ff0000',
            strokeStyle: 'solid',
        });
        if (textTimeoutId) clearTimeout(textTimeoutId);
    };
    const onMouseoutPolyline = (e: kakao.maps.Polyline) => {
        textTimeoutId = setTimeout(() => {
            if (textRef.current) textRef.current.classList.remove('visible');
            e.setOptions({
                strokeColor: '#3e3e3e',
                strokeStyle: 'shortdashdot',
            });
        }, 1000);
    };

    return (
        <>
            {center && (
                <CustomOverlayMap position={center}>
                    <DistanceContentsBox ref={textRef}>
                        <div className="text">{setDistanceText(distance)}</div>
                    </DistanceContentsBox>
                </CustomOverlayMap>
            )}
            <Polyline
                path={path}
                strokeWeight={7} // 선의 두께입니다
                strokeColor="#3e3e3e" // 선의 색깔입니다
                strokeOpacity={0.5} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                strokeStyle="shortdashdot" // 선의 스타일입니다
                zIndex={4}
                onMouseover={onMouseoverPolyline}
                onMouseout={onMouseoutPolyline}
            />
        </>
    );
};

const DistanceContentsBox = styled.div`
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -user-select: none;

    width: 60px;
    height: 20px;
    border-radius: 2px;
    background: white;
    box-shadow: 0.05rem 0.05rem 0.2rem #3d3d3d;
    visibility: hidden;
    opacity: 0;

    font-size: 14px;
    text-align: center;

    margin: 0 10px 10px 0;

    transition: visibility 0s linear 300ms, opacity 300ms;
    &.visible {
        visibility: visible;
        opacity: 1;
        transition: visibility 0s linear 0s, opacity 200ms;
    }
`;

export default PlacePolyline;
