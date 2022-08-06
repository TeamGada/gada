import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { LocationIcon } from 'components/icons';
import LocationCard from 'containers/main/LocationList/LocationCard';
import axios from 'axios';
import getAuthHeader from 'utils/getAuthHeader';
import jejuImg from 'images/jeju.jpg';

const preprocessLocationDatas = (locations: any) => {
    return Object.entries(locations).map((data) => {
        return {
            location: data[0],
            imgUrl: data[1],
        };
    });
};

const LocationList: FC = () => {
    const defaultProps = {
        imgUrl: jejuImg,
        location: '제주',
    };
    const [locations, setLocations] = useState<any>();
    const headers = getAuthHeader();

    useEffect(() => {
        (async () => {
            try {
                const results = await axios.get('/plans/locations', {
                    headers,
                });
                const preprocessedLocationDatas = preprocessLocationDatas(
                    results.data,
                );
                setLocations(preprocessedLocationDatas);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return (
        <LocationWrapper>
            <LocationHeader>
                <LocationIcon
                    width="20px"
                    height="27px"
                    style={locationStyle}
                />
                <LocationTitle>국내 여행지</LocationTitle>
            </LocationHeader>
            <LocationContainer>
                {locations?.map((data: any) => (
                    <LocationCard
                        key={data.location}
                        imgUrl={data.imgUrl}
                        location={data.location}
                    />
                ))}
            </LocationContainer>
        </LocationWrapper>
    );
};

export default LocationList;

const LocationWrapper = styled.section`
    width: 1287px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 80px;
`;

const LocationHeader = styled.div`
    margin-bottom: 25px;
`;

const LocationTitle = styled.h2`
    font-size: 24px;
    display: inline-block;
    color: #3d95ff;
    cursor: default;
`;

const locationStyle = {
    marginRight: '10px',
};

const LocationContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 235px);
    grid-column-gap: 27px;
    grid-row-gap: 27px;
    border-radius: 10px;
    place-content: center;

    > div:hover {
        cursor: pointer;
    }
`;
