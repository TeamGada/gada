import React, { useRef, useState, useEffect } from 'react';
import getAuthHeader from 'utils/getAuthHeader';
import axios from 'axios';
import styled from 'styled-components';
import useConfirmModal from 'hooks/useConfirmModal';

const nicknameInfoMessages = {
    sameNickname: '이전 닉네임과 동일합니다.',
    emptyNickname: '닉네임을 입력해주세요.',
};

const confirmNicknamePayload = {
    width: 400,
    height: 300,
    message: '닉네임을 변경하시겠습니까?',
};

const NicknameForm = ({ profileData, setProfileData }: any) => {
    const { username } = profileData;

    const [nicknameState, nicknameType, nicknameModalHandler] = useConfirmModal(
        confirmNicknamePayload,
        'nickname',
    );

    const nicknameRef = useRef<any>(null);

    const [nicknameMessage, setMessage] = useState('');

    const headers = getAuthHeader();

    useEffect(() => {
        if (nicknameState && nicknameType === 'nickname') {
            const data = {
                username: nicknameRef.current.value,
            };

            (async () => {
                try {
                    await axios.patch('/users/username', data, { headers });
                    setProfileData({
                        ...profileData,
                        username: nicknameRef.current.value,
                    });
                    setMessage('');
                } catch (err) {
                    console.error(err);
                }
            })();
        }
    }, [nicknameState]);

    const usernameSubmitHandler = (e: any) => {
        e.preventDefault();
        const nickname = nicknameRef.current.value;

        if (nickname === username) {
            setMessage(nicknameInfoMessages.sameNickname);
            return;
        }

        if (!nickname) {
            setMessage(nicknameInfoMessages.emptyNickname);
            return;
        }

        nicknameModalHandler();
    };

    return (
        <ProfileForm onSubmit={usernameSubmitHandler}>
            <CardName>닉네임</CardName>
            <UserName
                ref={nicknameRef}
                type="text"
                defaultValue={username}
                placeholder="넥네임을 입력해주세요."
                name="username"
            />
            <SubmitButton type="submit" value="저장하기" />
            <InfoMessage>{nicknameMessage}</InfoMessage>
        </ProfileForm>
    );
};

export default NicknameForm;

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

const CardName = styled.div`
    width: 100%;
    margin-bottom: 8px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
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

const UserName = styled(InputWrapper)``;

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
