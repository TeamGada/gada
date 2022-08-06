import React from 'react';
import styled from 'styled-components';
import { ChatIcon, GoogleIcon } from 'components/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import { changeOpenState, changeModalName } from 'store/modules/modal';

const ModalSelector = (state: RootState) => state.modal;

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { modalIsOpen } = useSelector(ModalSelector);

    const handleLocalLoginClick = () => {
        navigate('/login-form');
    };
    const handleRegisterClick = () => {
        dispatch(changeModalName('EmailAuthModal'));
        dispatch(changeOpenState(!modalIsOpen));
    };

    return (
        <LoginContainer>
            <KakaoLogin href="http://kdt-sw2-seoul-team05.elicecoding.com:5000/users/login/kakao">
                <ChatIcon style={LoginIconStyle} />
                <LoginText>카카오 로그인</LoginText>
            </KakaoLogin>
            <GoogleLogin href="http://kdt-sw2-seoul-team05.elicecoding.com:5000/users/login/google">
                <GoogleIcon style={LoginIconStyle} />
                <LoginText>구글 로그인</LoginText>
            </GoogleLogin>
            <LocalLogin onClick={handleLocalLoginClick}>
                <LoginText>다른 계정으로 로그인</LoginText>
            </LocalLogin>
            <Register onClick={handleRegisterClick}>회원가입</Register>
        </LoginContainer>
    );
};

export default Login;

const ToMain = styled.div`
    margin-top: 30px;
    cursor: pointer;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 15vh;

    & > div:not(:first-of-type) {
        margin-top: 10px;
    }

    & > div:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    }
`;

const LoginWrapper = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 350px;
    height: 50px;
    cursor: pointer;
    position: relative;
    border-radius: 5px;
    text-decoration: none;
`;

const KakaoLogin = styled(LoginWrapper)`
    background-color: #fee500;
    color: #4b2f1b;
`;

const GoogleLogin = styled(LoginWrapper)`
    background-color: #ffffff;
    color: #666666;
    margin: 10px 0;
`;

const LocalLogin = styled(LoginWrapper)`
    background-color: #222222;
    color: #ffffff;
`;

const LoginText = styled.span`
    diplay: inline-block;
    font-weight: 500;
    font-size: 17px;
`;

const LoginIconStyle = {
    position: 'absolute',
    top: '50%',
    left: '15px',
    transform: 'translate(0, -50%)',
} as React.CSSProperties;

const Register = styled.span`
    display: inline-block;
    margin-top: 15px;
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
    color: #ffffff;
`;
