import React from 'react';
import { SearchedPlaceInfo } from 'store/modules/plan';
import styled from 'styled-components';

const emptyImage =
    'https://user-images.githubusercontent.com/43302778/106805462-7a908400-6645-11eb-958f-cd72b74a17b3.jpg';

interface Props extends Omit<SearchedPlaceInfo, 'latitude' | 'longitude'> {
    onClick: () => void;
}

const PlaceListItem = ({ name, address, imgUrl, onClick }: Props) => {
    return (
        <ItemContainer>
            <ItemImage src={imgUrl ?? emptyImage} />
            <ItemTexts>
                <h3>{name ?? '장소이름'}</h3>
                <h5>{address ?? '장소 주소'}</h5>
            </ItemTexts>
            <ItemButton onClick={onClick}>선택</ItemButton>
        </ItemContainer>
    );
};
const ItemContainer = styled.div`
    padding: 10px;
    display: flex;
    justify-contents: center;

    :hover {
        background: #F8F8F8;
    }
`;
const ItemImage = styled.img`
    border-radius: 15px;
    width: 90px;
    height: 90px;
`;
const ItemTexts = styled.div`
    margin-left: 20px;
    align-self: center;
    display: flex;
    flex-direction: column;
    h3 {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 29px;
        margin-bott
    }
    h5 {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 22px;
        color: #696969;
    }
`;
const ItemButton = styled.button`
    cursor: pointer;
    margin-left: auto;
    align-self: center;
    width: 90px;
    height: 35px;
    border-radius: 30px;
    border: 0px;
    background: #f1f1f1;
    box-shadow: 0px 2px 4px rgba(109, 103, 103, 0.25);

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;

    &:hover {
        transition: background 0.3s linear;
        transition: font-size 0.1s linear;
        background: #60a5f8;
        box-shadow: 0px 2px 4px rgba(109, 103, 103, 0.25);
        border-radius: 30px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 500;
        font-size: 17px;
        color: white;
    }
`;

export default PlaceListItem;
