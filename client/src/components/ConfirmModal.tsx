import React, { FC, useState } from 'react';
import styled from 'styled-components';
import Modal from 'components/Modal';
import { AlertIcon } from 'components/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import { 
    changeConfirmState,
    changeModalName,
    changeOpenState
} from 'store/modules/modal';

const ModalSelector = (state: RootState) => state.modal

const ConfirmModal = () => {
    const dispatch = useDispatch();

    const { 
        modalIsOpen,
        confirmWidth,
        confirmHeight,
        confirmMessage
    } = useSelector(ModalSelector);
    
    const clickYesHandler = () => {
        dispatch(changeConfirmState(true));
        dispatch(changeModalName("ConfirmModal"));
        dispatch(changeOpenState(!modalIsOpen));
    }

    const clickNoHandler = () => {
        dispatch(changeModalName("ConfirmModal"));
        dispatch(changeOpenState(!modalIsOpen));
    }

    return (
        <Modal
        width={confirmWidth}
        height={confirmHeight}
        cancelButton={false}
        >
            {/* 모달 내부 - 여기서 커스텀 하면 됩니다 */}
            <Wrapper>
                <Header width={confirmWidth}>
                    <AlertIcon />
                </Header>
                <Content width={confirmWidth} height={confirmHeight}>   
                    <MessageContainer width={confirmWidth} height={confirmHeight}>
                        <Message>{confirmMessage}</Message>
                    </MessageContainer>
                    <ButtonContainer>
                        <YesButton
                        onClick={clickYesHandler}>
                            확인
                        </YesButton>
                        <NoButton
                        onClick={clickNoHandler}>
                            취소
                        </NoButton>
                    </ButtonContainer>
                </Content>
            </Wrapper>
        </Modal>
    )
}

ConfirmModal.defaultProps = {
    cancelButton: false,
    width: 400,
}

export default ConfirmModal;

const Wrapper = styled.div`
    box-sizing: border-box;
`

const Header = styled.div<{ width: number} >`
    width: ${({width}) => width}px;
    height: 120px;
    background-color: #60A5F8;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px 10px 0 0;
    margin-top: -16px;

`

const Content = styled.div<{ width: number, height: number }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0 0 10px 10px;
    width: ${({width}) => width}px;
    height: calc(${({height}) => height}px - 120px);
`

const MessageContainer = styled.div<{ width: number, height: number }>`
    box-sizing: border-box;
    width: ${({width}) => width}px;
    height: calc(${({height}) => height}px - 120px - 70px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
`

const Message = styled.p`
    font-size: 17px;
    text-align: center;
    line-height: 160%;
`

const ButtonContainer = styled.div`
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Button = styled.button`
    border: none;
    width: 70px;
    height: 30px;
    color: white;
    font-weight: bold;
    font-size: 15px;
    border-radius: 30px;
    cursor: pointer;
    letter-spacing: 1px;
    transition: all .2s;
`

const YesButton = styled(Button)`
    background-color: #60A5F8;
    margin-right: 20px;
    
    :hover { background-color: #2C87F4; }
`

const NoButton = styled(Button)`
    background-color: #A5ABB1;
    margin-left: 20px;

    :hover { background-color: #80858B; }
`