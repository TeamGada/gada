import React, { FC } from 'react';
import styled from 'styled-components';
import { PlusIcon } from 'components/icons';
import useModal from 'hooks/useModal';

const AddCard : FC = () => {
    const newPlanClickHandler = useModal("NewPlanModal");
    
    return (
        <AddPlanCard onClick={newPlanClickHandler}>
            <AddButtonHelper />
            <AddButton>
                <PlusIcon style={plusIconStyle}/>
            </AddButton>
            <Title>다른 여행 준비하기</Title>
            <Instruction>새로운 일정을 추가하세요.</Instruction>
        </AddPlanCard>
    )
}

export default AddCard;

const AddPlanCard = styled.div`
    height: 230px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
`

const AddButton = styled.div`
    width: 115px;
    height: 115px;
    background-color: #ECF3FD;
    margin-bottom: 20px;
    position: relative;
    border-radius: 50%;
`

const AddButtonHelper = styled.div`
    height: 41px;
`

const plusIconStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
} as React.CSSProperties;

const Title = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
`;

const Instruction = styled.div`
    font-size: 15px;
    color: #aaaaaa;
`;