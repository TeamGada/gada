import React, { FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SpeechIcon, ErrorIcon, PlaneIcon } from 'components/icons';
import { useCookies } from 'react-cookie';

const NotFound: FC = () => {
    const navigate = useNavigate();
    const [ cookies ] = useCookies(['accessToken']);
    const { accessToken } = cookies;

    const homeClickHandler = () => (
        accessToken ? 
        navigate("/main") : 
        navigate("/login")
    )

    return (
        <Container>
            <MessageContainer>
                <BalloonContainer>
                    <SpeechIcon width="250px" height="230px" />
                    <div className="plane-icon">
                        <PlaneIcon width="58px" height="53px" />
                    </div>
                    <div className="gada-title">여행가다</div>
                </BalloonContainer>
                <div className="status-code">
                    <ErrorIcon width="90px" height="90px" />
                    <span>404</span>
                </div>
                <div className="code-message">Not Found</div>
                <div className="code-info">
                    요청하신 페이지를 찾을 수 없습니다.
                </div>
            </MessageContainer>
            <HomeButton
            onClick={homeClickHandler}>
                Home
            </HomeButton>
        </Container>
    );
};

const Container = styled.div`
    background-color: ${({ theme }) => theme.PRIMARY};
    width: 100%;
    min-width: 1287px;
    height: 100vh;
    min-height: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const BalloonContainer = styled.div`
    position: absolute;
    top: -150px;
    right: -200px;

    & > .plane-icon {
        position: absolute;
        font-size: 50px;
        color: white;
        left: 24px;
        top: 73px;
    }

    & > .gada-title {
        position: absolute;
        font-family: 'Jalnan';
        font-size: 36px;
        color: white;
        left: 75px;
        top: 87px;
        font-weight: normal;
    }
`;

const MessageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;

    & > .status-code {
        font-size: 130px;
    }
    & > .status-code > span {
        margin-left: 10px;
    }
    & > .code-message {
        font-size: 40px;
        margin-bottom: 20px;
        margin-top: 10px;
    }
    & > .code-info {
        font-size: 25px;
    }
`;

const HomeButton = styled.button`
    margin-top: 40px;
    padding: 10px 20px;
    border: none;
    background-color: #222;
    color: white;
    font-weight: 600;
    font-size: 18px;
    border-radius: 50px;
    cursor: pointer;
    transition: all .2s;

    :hover {
        background-color: black;
    }
`

export default NotFound;
