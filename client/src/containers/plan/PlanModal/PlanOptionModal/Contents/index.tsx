import React from 'react';
import styled from 'styled-components';
import { RootState } from 'store/modules';
import { useSelector } from 'react-redux';
import PlaceList from './PlaceList';
import CustomPlace from './CustomPlace';

const state = (state: RootState) => state.search.state;

const PlanModalContents = () => {
    const contentsType = useSelector(state);
    return (
        <PlaceContents>
            {contentsType ? <PlaceList /> : <CustomPlace />}
        </PlaceContents>
    );
};

const PlaceContents = styled.div`
    width: 920px;
    margin: 20px 0px;
    header {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 29px;
    }
    .contents {
        padding-right: 20px;

        margin-top: 20px;
        height: 421px;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 6px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #60a5f8bb;
            border-radius: 10px;
        }
        &::-webkit-scrollbar-track {
            background-color: #dedede;
            border-radius: 10px;
            box-shadow: inset 0px 0px 5px white;
        }
    }
    .info_view {
    }
`;
export default PlanModalContents;
