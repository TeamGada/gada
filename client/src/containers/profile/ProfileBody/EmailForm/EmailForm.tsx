import React from 'react';
import styled from 'styled-components';

const EmailForm = ({ profileData }: any) => {
    const { email } = profileData;
    
    return (
        <ProfileForm>
            <CardName>이메일</CardName>
            <Email
                type="email"
                value={email}
                disabled
            />
        </ProfileForm>
    )
}

export default EmailForm;

const ProfileForm = styled.form`
    padding: 30px;
    border: solid #CCC 1px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    gap: 7px;
    position: relative;
`

const CardName = styled.div`
    width: 100%;
    margin-bottom: 8px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
`

const Email = styled.input`
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-radius: 5px;
    color: #222 !important;
    height: 37px;
    font-size: 15px;
    padding: 0 15px;
    background-color: #F5F5F5;

    &::placeholder { color: #aaaaaa; }
    &:focus { outline:none; bakcground-color: white;}
    :-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px white inset;
        box-shadow: 0 0 0 1000px white inset;
    }
    &:disabled { 
        background-color: #F5F5F5;
        cursor: not-allowed;
    }
`