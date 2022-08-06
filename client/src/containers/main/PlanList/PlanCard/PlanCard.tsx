import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import { changeDeletePlan } from 'store/modules/modal';
import { useNavigate } from 'react-router-dom';
import { CancelDetailIcon } from 'components/icons';
import useConfirmModal from 'hooks/useConfirmModal';
import getAuthHeader from 'utils/getAuthHeader';

interface CardProps {
    id: string;
    dday: string;
    src: string;
    imageName: string;
    title: string;
    term: string;
}
// 속성 id가 2개여서 하나 삭제함

const confirmNicknamePayload = {
    width: 400,
    height: 300,
    message: '계획을 삭제하시겠습니까?',
};

const deletePlanSelector = (state: RootState) => state.modal.deletePlan;

const PlanCard = ({ dday, src, imageName, title, term, id }: CardProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [removeState, removeType, removeModalHandler] = useConfirmModal(
        confirmNicknamePayload,
        id,
    );
    const headers = getAuthHeader();
    const deletePlan = useSelector(deletePlanSelector);

    const navigateHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        navigate(`/plan/${id}`);
    };

    const removeClickHandler = (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        removeModalHandler();
    };

    useEffect(() => {
        if (removeState && removeType === id) {
            (async () => {
                try {
                    await axios.delete(`/plans/${id}`, { headers });
                    dispatch(changeDeletePlan(!deletePlan));
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, [removeState]);

    return (
        <Wrapper onClick={navigateHandler}>
            <RemoveButton
                onClick={removeClickHandler}
                className="remove-button"
            />
            <Dday>{dday}</Dday>
            <PlanImage src={src}>
                <PlanImageName>{imageName}</PlanImageName>
                <PlanImageOpacity />
            </PlanImage>
            <PlanTitle>{title}</PlanTitle>
            <PlanDate>{term}</PlanDate>
        </Wrapper>
    );
};

export default PlanCard;

const Wrapper = styled.div`
    height: 230px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .remove-button {
        display: none;
    }

    :hover {
        .remove-button {
            display: block;
        }
    }
`;

const RemoveButton = styled(CancelDetailIcon)`
    position: absolute;
    top: 12px;
    right: 12px;
    opacity: 0.7;

    :hover {
        opacity: 1;
    }
`;

const Dday = styled.div`
    color: #6aa9f9;
    background-color: #eef6fe;
    text-align: center;
    padding: 8px 18px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
`;

const PlanImage = styled.div<{ src: string }>`
    width: 115px;
    height: 115px;
    background-image: url('${({ src }) => src}');
    background-repeat: no-repeat;
    background-size: cover;
    margin-bottom: 20px;
    position: relative;
    border-radius: 50%;
`;

const PlanImageOpacity = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.2;
    position: absolute;
    top: 0;
    border-radius: 50%;
`;

const PlanImageName = styled.div`
    color: white;
    font-size: 16px;
    display: inline-block;
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    letter-spacing: 3px;
`;

const PlanTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
`;

const PlanDate = styled.div`
    font-size: 15px;
    color: #aaaaaa;
`;
