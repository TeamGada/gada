import React, { FC, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import welcomeImg from 'images/welcome.png';

const EmailAuthForm: FC = () => {
    const [sendEmail, setSendEmail] = useState<boolean>(false);
    const emailRef = useRef<any>();

    const handleClick = () => {
        const data = { email: emailRef.current.value };

        axios
            .post('/users/auth-email', data)
            .then((response) => {
                setSendEmail(!sendEmail);
                console.log(response.data);
            })
            .catch((err) => {
                alert(err.response.data.message);
                console.log(err);
            });
    };

    return (
        <Wrapper>
            <Welcome>환영합니다!!</Welcome>
            <Subtitle1>이메일 인증을 완료하면</Subtitle1>
            <Subtitle2>회원가입 페이지로 이동합니다.</Subtitle2>
            <BottomContainer>
                {sendEmail ? (
                    <Information>
                        회원가입 링크가 이메일로 전송되었습니다.
                    </Information>
                ) : (
                    <>
                        <InputContainer>
                            <Email
                                ref={emailRef}
                                type="email"
                                placeholder="이메일을 입력해주세요."
                            />
                            <FocusBorder />
                        </InputContainer>
                        <Button onClick={handleClick}>인증 메일 보내기</Button>
                    </>
                )}
            </BottomContainer>
        </Wrapper>
    );
};

export default EmailAuthForm;

const Wrapper = styled.div`
    padding: 20px;
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Welcome = styled.div`
    text-align: center;
    font-size: 30px;
    position: relative;
    color: #444444;
    margin-top: 10px;

    &:before {
        content: url(${welcomeImg});
        margin-right: 10px;
        position: absolute;
        top: -2px;
        right: 160px;
    }
    &:after {
        content: url(${welcomeImg});
        margin-left: 10px;
        position: absolute;
        top: -2px;
        left: 160px;
    }
`;

const Subtitle1 = styled.div`
    font-size: 14px;
    color: #444444;
    margin-top: 50px;
`;

const Subtitle2 = styled.div`
    font-size: 14px;
    color: #444444;
    margin-top: 5px;
    margin-bottom: 80px;
`;

const BottomContainer = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const InputContainer = styled.div`
    position: relative;
    width: 300px;
`;

const Email = styled.input`
    font-size: 15px;
    color: #222222;
    width: 300px;
    border: none;
    border-bottom: solid #aaaaaa 1px;
    box-sizing: border-box;
    padding-bottom: 10px;
    text-align: center;

    &::placeholder {
        text-align: center;
        color: #aaaaaa;
    }
    &:focus {
        outline: none;
    }
    &:focus ~ span {
        width: 100%;
    }
    &:focus::placeholder {
        color: transparent;
    }
`;

const FocusBorder = styled.span`
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    background-color: #999999;
    width: 0;
    height: 2px;
    border-radius: 2px;
    transform: translateX(-50%);
    transition: 0.5s;
`;

const Button = styled.button`
    margin-top: 25px;
    padding: 8px 25px;
    border-radius: 50px;
    cursor: pointer;
    border: 0;
    outline: none;
    color: white;
    background-color: #60a5f8;
`;

const Information = styled.div`
    font-size: 14px;
    background-color: #e4f0ff;
    padding: 30px 20px;
    border-radius: 10px;
    color: #60a5f8;
    box-sizing: border-box;
    width: 320px;
    text-align: center;
    &:before {
        content: '✓';
        margin-right: 10px;
        font-weight: bold;
        font-size: 18px;
        color: #60a5f8;
    }
`;
