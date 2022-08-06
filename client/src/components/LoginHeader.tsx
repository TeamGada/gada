import React, { FC } from 'react';
import styled from 'styled-components';
import { PlaneIcon } from 'components/icons';
import { Outlet, useNavigate } from 'react-router-dom';

const LoginHeader = () => {
    const navigate = useNavigate();
    
    const clickHandler = () => { navigate("/") }
    return (
        <Wrapper>
            <TitleContainer>
                <Title onClick={clickHandler}>
                    <PlaneIcon
                        width="50px"
                        height="55px"
                        style={planeIconStyle}
                    />
                    여행가다
                </Title>
                <SubTitle onClick={clickHandler}>
                    지금 당장 여행 계획을 짜보세요!
                </SubTitle>
            </TitleContainer>
            <Outlet />
        </Wrapper>
    )
}

export default LoginHeader;

const Wrapper = styled.div`
    background-color: #60A5F8;
    min-width: 1287px;
    width: 100%;
    height: 100vh;
    cursor: default;
`

const TitleContainer = styled.header`
    padding-top: 20vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Jalnan';
    color: white;
    letter-spacing: 1px;
`

const planeIconStyle = {
    marginBottom: '-5px',
}

const Title = styled.div`
    font-size: 32px;
    margin-bottom: 20px;
    cursor: pointer;
`
const SubTitle = styled.div`
    font-size: 24px;
    cursor: pointer;
`