import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import styled, { keyframes } from 'styled-components';

interface IProps {
    setIsAllPlan: Dispatch<SetStateAction<boolean>>;
}

const testData = Array.from({ length: 5 });

const AllPlan: FC<IProps> = ({ setIsAllPlan }) => {
    const [isMount, setIsMount] = useState<string>('open');

    const onCloseAllPlan = () => {
        setIsMount('close');
        setTimeout(() => {
            setIsAllPlan(() => false);
        }, 1000);
    };

    return (
        <Container className={isMount}>
            <button type="button" onClick={onCloseAllPlan}>
                close
            </button>
            {testData.map((data) => {
                return (
                    <PlanCard>
                        <DayContainer>
                            <div className="day-num">Day 1</div>
                            <div className="day-detail">7.12 Tue</div>
                        </DayContainer>
                    </PlanCard>
                );
            })}
        </Container>
    );
};

// reverse가 왜 안먹는지 모르겠음.
const mount = keyframes`
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0%);
    }
`;
const unmount = keyframes`
    from {
        transform: translateX(0%);
    }
    to {
        transform: translateX(100%);
    }
`;

const Container = styled.div`
    background-color: #eac4c4;

    width: 100%;
    min-height: 620px;
    margin: 0 30px 30px 30px;
    display: flex;
    overflow-x: scroll;

    &.open {
        animation: ${mount} 1s ease-in-out 0s 1 normal;
    }

    &.close {
        animation: ${unmount} 1s ease-in-out 0s 1 normal;
    }
`;

const PlanCard = styled.div`
    background-color: #5b5b5b;

    width: 450px;
    margin: 0 30px 0px 30px;
    flex: 0 0 auto;
`;

const DayContainer = styled.div`
    background-color: #ffffff;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: flex-end;

    & > .day-num {
        font-size: 20px;
        margin: 10px;
    }

    & > .day-detail {
        margin-bottom: 10px;
        color: ${({ theme }) => theme.LIGHT_GRAY};
    }
`;

export default AllPlan;
