import React from 'react';
import styled from 'styled-components';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import useModal from 'hooks/useModal';

const LoginForm = () => {
    const registerClickHandler = useModal('EmailAuthModal');
    const findPasswordClickHandler = useModal('FindPasswordModal');
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        (async () => {
            try {
                const { email, password } = e.target;

                if (!email.value) alert('이메일을 입력해주세요!');
                else if (!password.value) alert('비밀번호를 입력해주세요!');
                else {
                    // 이거 그대로 post 보내면 된다.
                    const data = {
                        email: email.value,
                        password: password.value,
                    };
                    await axios.post('/users/login', data);
                    navigate('/main');
                }
            } catch (err: any) {
                const { response } = err;
                alert(response.data.message);
            }
        })();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Email
                autoComplete="email"
                type="email"
                placeholder="Email"
                name="email"
            />
            <Password
                autoComplete="current-password"
                placeholder="Password"
                type="password"
                name="password"
            />
            <LinkContainer>
                <Register onClick={registerClickHandler}>회원가입</Register>
                <FindPassword onClick={findPasswordClickHandler}>
                    비밀번호 찾기
                </FindPassword>
            </LinkContainer>
            <LoginButton type="submit" value="로그인" />
        </Form>
    );
};

export default LoginForm;

const Form = styled.form`
    margin-top: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const InputWrapper = styled.input`
    width: 350px;
    border-radius: 5px;
    box-sizing: border-box;
    border: none;
    font-family: 'Noto Sans KR';
    color: #222222;

    &::placeholder {
        color: #aaaaaa;
    }
    &:focus {
        outline: none;
    }
    :-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px white inset;
        box-shadow: 0 0 0 1000px white inset;
    }
`;

const Email = styled(InputWrapper)`
    height: 45px;
    padding: 0 15px;
    font-size: 15px;
`;

const Password = styled(InputWrapper)`
    height: 45px;
    padding: 0 15px;
    margin-top: 15px;
    font-size: 15px;
`;

const LinkContainer = styled.div`
    width: 350px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;

const LinkWrapper = styled.div`
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
    color: #ffffff;
`;

const Register = styled(LinkWrapper)`
    margin-left: 7px;
`;

const FindPassword = styled(LinkWrapper)`
    margin-right: 7px;
`;

const LoginButton = styled(InputWrapper)`
    height: 50px;
    font-size: 17px;
    font-weight: 500;
    margin-top: 50px;

    background-color: #222222;
    color: white;
    cursor: pointer;
`;
