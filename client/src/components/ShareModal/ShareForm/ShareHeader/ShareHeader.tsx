import React from 'react';
import styled from 'styled-components';

const ShareHeader = () => {
    return (
        <>
            <Title>계획 공유하기</Title>
            <InfoContainer>
                <TopInfo>공유한 계획은 수정할 수 없습니다.</TopInfo>
                <Info>공유를 취소하면 다시 수정할 수 있습니다.</Info>
                <Info>{"공유한 계획은 '게시판 > 공유내역'에서 확인할 수 있습니다."}</Info>
                <Info>다른 사용자에게 내 계획을 공유해보세요.</Info>
            </InfoContainer>
        </>
    )
}

export default ShareHeader;

const Title = styled.h2`
    font-size: 27px;
    color: #666;
    font-weight: bold;
    margin-top: 20px;
`

const InfoContainer = styled.div`
    width: 300px;
    margin-left: 60px;

    & > h3:not(last-of-type) {
        margin-bottom: 10px;
    }
`

const Info = styled.h3`
    font-size: 14.5px;
    color: #666;
    font-weight: 600;
    position: relative;
    line-height: 130%;
    &:before {
        position: absolute;
        top: 0;
        left: -20px;
        content: '✓';
        font-weight: bold;
        font-size: 16px;
        color: #666;
    }
`

const TopInfo = styled(Info)`
    margin-top: 40px;
`