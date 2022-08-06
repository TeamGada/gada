import React, { useState, useEffect } from 'react';
import getAuthHeader from 'utils/getAuthHeader';
import axios from 'axios';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { RightIcon } from 'components/icons';
import useConfirmModal from 'hooks/useConfirmModal';

const confirmWithdrawlPayload = {
    width: 400,
    height: 300,
    message: '계정을 정말 삭제하시겠습니까?😥',
}

const NicknameForm = () => {
    const [withdrawlState, withdrawlType, withdrawlModalHandler] = useConfirmModal(confirmWithdrawlPayload, "withdrawl");
    const [ clickedToggle, setClickedToggle ] = useState(false);

    const headers = getAuthHeader();
    const navigate = useNavigate();

    useEffect(() => {
        if (withdrawlState && withdrawlType === 'withdrawl') {
            (async () => {
                try {
                    axios.delete('/users/withdraw', { headers });
                    navigate("/");
                } catch(err) {
                    console.log(err);
                }
            })()
        }
    }, [withdrawlState])

    const withdrawlSubmitHandler = (e: any) => {
        e.preventDefault();
        withdrawlModalHandler();
    }

    const toggleClickHandler = () => { 
        setClickedToggle(!clickedToggle);
    }

    return (
        <ProfileForm onSubmit={withdrawlSubmitHandler}>
            <CardNameContainer>
                <CardTitle>탈퇴</CardTitle>
                <Toggle
                onClick={toggleClickHandler}
                toggle={clickedToggle ? 1 : 0}
                />
            </CardNameContainer>
            { clickedToggle && 
            <WithdrawMessage>
                탈퇴 시 계정과 관련된 모든 권한이 사라지며 복구할 수 없습니다. 탈퇴하기 버튼을 누르면 계정이 완전히 삭제됩니다. 
            </WithdrawMessage>}
            { clickedToggle &&
            <WithdrawlButton
            type="submit"
            value="탈퇴하기"
            />}
        </ProfileForm>
    )
}

export default NicknameForm;

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

const CardNameContainer = styled.div`
    width: 100%;
    margin-bottom: 8px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    display: flex;
    align-items: flex-end;
`

const CardTitle = styled.div``

const Toggle = styled(RightIcon)<{toggle : any}>`
    width: 15px;
    height: 15px;
    margin-left: auto;
    transition: all .2s;
    cursor: pointer;
    
    ${({ toggle }) => (
        toggle ?
        css`
          transform: rotate(90deg);
        ` :
        css`
          transform: rotate(0deg);
        `
    )}   
`

const WithdrawMessage = styled.p`
    width: 100%;
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
`

const InputWrapper = styled.input`
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

const WithdrawlButton = styled(InputWrapper)`
    width: 300px;
    height: 50px;
    font-size: 17px;
    font-weight: bold;
    margin-top: 30px !important;
    background-color: #999;
    color: white !important;
    cursor: pointer;
`