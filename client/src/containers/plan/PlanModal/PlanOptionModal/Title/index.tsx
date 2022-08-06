import React from 'react';
import styled from 'styled-components';
import { AddLocationIcon, SearchIcon } from 'components/icons';

interface Props {
    state: boolean;
    onClick(e?: React.MouseEvent<HTMLButtonElement>): void;
}

const TitleTrigger = ({ state, onClick }: Props) => {
    return (
        <Title>
            <ContentsTrigger onClick={onClick}>
                {state ? 
                <AddLocationIconWrapper /> : 
                <SearchIcon 
                color="#3D95FF"
                width="20px"
                height="20px"
                style={SearchIconStyle}/>}
                {state ? '나만의 장소 추가하기' : '검색으로 찾기'}
            </ContentsTrigger>
        </Title>
    );
};

const Title = styled.p`
    height: 38px;
    margin-right: auto;
`;
const ContentsTrigger = styled.button`
    cursor: pointer;
    display: inline;
    border: 0px;
    background: none;
    text-decoration: none;
    font-size: 22px;
    font-weight: 700;
    line-height: 32px;
    color: #3d95ff;
`;

const AddLocationIconWrapper = styled(AddLocationIcon)`
    display: inline-block;
    margin-right: 5px;
`

const SearchIconStyle = {
    marginRight: "5px"
}

export default TitleTrigger;
