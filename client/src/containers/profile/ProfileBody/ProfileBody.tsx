import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import getAuthHeader from 'utils/getAuthHeader';
import EmailForm from './EmailForm';
import NicknameForm from './NicknameForm';
import PasswordForm from './PasswordForm';
import WithdrawalForm from './WithdrawalForm';

interface ProfileProps {
    email: string;
    username: string;
}

const initData = {
    email: '',
    username: '',
};

const ProfileBody: FC = () => {
    const [profileData, setProfileData] = useState<ProfileProps>(initData);
    const headers = getAuthHeader();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const results = await axios.get('/users/info/user', {
                    headers,
                });
                setProfileData(results.data.data);
            } catch (err) {
                navigate('/');
                console.error(err);
            }
        })();
    }, []);

    return (
        <Wrapper>
            <Container>
                <EmailForm profileData={profileData} />
                <NicknameForm
                    profileData={profileData}
                    setProfileData={setProfileData}
                />
                <PasswordForm />
                <WithdrawalForm />
            </Container>
        </Wrapper>
    );
};

export default ProfileBody;

const Wrapper = styled.main`
    min-width: 1287px;
    width: 100%;
`;

const Container = styled.div`
    width: 800px;
    margin: 80px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    center;
    gap: 20px;
`;
