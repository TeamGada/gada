import React, { FC, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FindPasswordForm: FC = () => {
    const [sendEmail, setSendEmail] = useState<boolean>(false);
    const emailRef = useRef<any>();

    const handleClick = () => {
        const data = { email: emailRef.current.value };
        
        axios
            .post('/users/reset', data).then((response) => {
                setSendEmail(!sendEmail);
                console.log(response.data);
            })
            .catch((err) => {
                alert(err.response.data.message);
                console.log(err);
            })
    }

    return (
        <Wrapper>
            <Title>비밀번호 찾기</Title>
            <Subtitle1>회원 이메일로 임시비밀번호가 발급됩니다.</Subtitle1>
            <Subtitle2>로그인 후 프로필에서 비밀번호를 수정하세요.</Subtitle2>
            <BottomContainer>
                {
                    sendEmail ?
                    <Information>
                    임시 비밀번호가 이메일로 전송되었습니다.
                    </Information> :
                    <>
                        <InputContainer>
                            <Email
                            ref={emailRef}
                            type="email"
                            placeholder="이메일을 입력해주세요."
                            />
                            <FocusBorder />
                        </InputContainer>
                        <Button
                            onClick={handleClick}
                        >임시 비밀번호 발급</Button>
                    </>
                }
            </BottomContainer>
        </Wrapper>
    )
}

export default FindPasswordForm;

const Wrapper = styled.div`
    padding: 20px;
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Title = styled.div`
    text-align: center;
    font-size: 30px;
    position: relative;
    color: #444444;
    margin-top: 10px;
`

const Subtitle1 = styled.div`
    font-size: 14px;
    color: #444444;
    margin-top: 50px;
`

const Subtitle2 = styled.div`
    font-size: 14px;
    color: #444444;
    margin-top: 5px;
    margin-bottom: 80px;
`

const BottomContainer = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

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
    &:focus { outline: none; }
    &:focus ~ span { width: 100%; }
    &:focus::placeholder { color: transparent; }
`

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
`

const Button = styled.button`
    margin-top: 25px;
    padding: 8px 25px;
    border-radius: 50px;
    cursor: pointer;
    border: 0;
    outline: none;
    color: white;
    background-color: #60A5F8;
`

const Information = styled.div`
    font-size: 14px;
    background-color: #E4F0FF;
    padding: 30px 20px;
    border-radius: 10px;
    color: #60A5F8;
    box-sizing: border-box;
    width: 320px;
    text-align: center;
    &:before {
        content: '✓';
        margin-right: 10px;
        font-weight: bold;
        font-size: 18px;
        color: #60A5F8;
    }
`