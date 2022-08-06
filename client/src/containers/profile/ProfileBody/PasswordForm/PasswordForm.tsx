import React, { useRef, useState, useEffect } from 'react';
import getAuthHeader from 'utils/getAuthHeader';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useConfirmModal from 'hooks/useConfirmModal';
import useModal from 'hooks/useModal';

const passwordInfoMessages = {
    samePassword: '이전 패스워드와 동일합니다.',
    emptyPassword: '패스워드를 입력해주세요.',
    notMatch: '새 비밀번호가 일치하지 않습니다.',
};

const confirmPasswordPayload = {
    width: 400,
    height: 300,
    message: '패스워드를 변경하시겠습니까?',
};

const PasswordForm = () => {
    const findPasswordClickHandler = useModal('FindPasswordModal');
    const [passwordState, passwordType, passwordModalHandler] = useConfirmModal(
        confirmPasswordPayload,
        'password',
    );

    const passwordRef = useRef<any>(null);
    const newPasswordRef = useRef<any>(null);
    const newPasswordCheckRef = useRef<any>(null);

    const [passwordMessage, setPasswordMessage] = useState('');

    const headers = getAuthHeader();
    const navigate = useNavigate();

    useEffect(() => {
        if (passwordState && passwordType === 'password') {
            const data = {
                currentPassword: passwordRef.current.value,
                newPassword: newPasswordRef.current.value,
                newPasswordCheck: newPasswordCheckRef.current.value,
            };

            (async () => {
                try {
                    await axios.patch('/users/password', data, { headers });
                    setPasswordMessage('');
                    passwordRef.current.value = '';
                    newPasswordRef.current.value = '';
                    newPasswordCheckRef.current.value = '';
                } catch (err: any) {
                    if (err.response.status === 400) {
                        setPasswordMessage(err.response.data.message);
                    }
                    console.error(err);
                }
            })();
        }
    }, [passwordState]);

    const passwordSubmitHandler = (e: any) => {
        e.preventDefault();

        const currentPassword = passwordRef.current.value;
        const newPassword = newPasswordRef.current.value;
        const newPasswordCheck = newPasswordCheckRef.current.value;

        if (!currentPassword || !newPassword || !newPasswordCheck) {
            setPasswordMessage(passwordInfoMessages.emptyPassword);
            return;
        }

        if (newPassword !== newPasswordCheck) {
            setPasswordMessage(passwordInfoMessages.notMatch);
            return;
        }

        passwordModalHandler();
    };

    return (
        <ProfileForm onSubmit={passwordSubmitHandler}>
            <CardNameContainer>
                <CardTitle>비밀번호</CardTitle>
                <CardHelp onClick={findPasswordClickHandler}>
                    비밀번호를 모르신다면?
                </CardHelp>
            </CardNameContainer>
            <Password
                ref={passwordRef}
                placeholder="현재 비밀번호"
                type="password"
                name="currentPassword"
            />
            <Password
                ref={newPasswordRef}
                placeholder="새 비밀번호"
                type="password"
                name="newPassword"
            />
            <Password
                ref={newPasswordCheckRef}
                placeholder="새 비밀번호 확인"
                type="password"
                name="newPasswordCheck"
            />
            <SubmitButton type="submit" value="저장하기" />
            <InfoMessage>{passwordMessage}</InfoMessage>
        </ProfileForm>
    );
};

export default PasswordForm;

const ProfileForm = styled.form`
    padding: 30px;
    border: solid #ccc 1px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    gap: 7px;
    position: relative;
`;

const CardNameContainer = styled.div`
    width: 100%;
    margin-bottom: 8px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    display: flex;
    align-items: flex-end;
`;

const CardTitle = styled.div``;

const CardHelp = styled.div`
    font-size: 13px;
    margin-left: auto;
    color: #888;
    cursor: pointer;
`;

const InputWrapper = styled.input`
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-radius: 5px;
    color: #222 !important;
    height: 37px;
    font-size: 15px;
    padding: 0 15px;
    background-color: #f5f5f5;

    &::placeholder {
        color: #aaaaaa;
    }
    &:focus {
        outline: none;
        bakcground-color: white;
    }
    :-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px white inset;
        box-shadow: 0 0 0 1000px white inset;
    }
    &:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
    }
`;

const Password = styled(InputWrapper)``;

const SubmitButton = styled(InputWrapper)`
    width: 300px;
    height: 50px;
    font-size: 17px;
    font-weight: bold;
    margin-top: 30px !important;
    background-color: #60a5f8;
    color: white !important;
    cursor: pointer;
`;

const InfoMessage = styled.div`
    position: absolute;
    top: calc(100% - 105px);
    left: 30px;
    font-size: 12px;
    color: #f86960;
`;
