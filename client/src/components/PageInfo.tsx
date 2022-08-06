import React from 'react';
import styled from 'styled-components';

interface PageInfoTitles {
    mainTitle: string;
    subTitle1: string;
    subTitle2: string;
}

type PageInfoProps = {
    titles: PageInfoTitles;
}

const PageInfo = ( { titles }: PageInfoProps ) => {
    const { mainTitle, subTitle1, subTitle2 } = titles;
    return (
        <Wrapper>
            <TitleContainer>
                <MainTitle>{mainTitle}</MainTitle>
                <SubTitle1>{subTitle1}</SubTitle1>
                <SubTitle2>{subTitle2}</SubTitle2>
            </TitleContainer>
        </Wrapper>
    )
}

export default PageInfo;

const Wrapper = styled.section`
    min-width: 1287px;
    width: 100%;
    background-color: #e4f0ff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 60px 0;
`;

const TitleContainer = styled.div`
    width: 1287px;
    margin: 0 auto;
    color: #333;
`;
const MainTitle = styled.h1`
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 1px;
`;

const Subtitle = styled.h2`
    font-size: 22px;
    font-weight: 400;
    letter-spacing: 1.5px;
`;
const SubTitle1 = styled(Subtitle)`
    margin-top: 35px;
    margin-bottom: 15px;
`;
const SubTitle2 = styled(Subtitle)``;