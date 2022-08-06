import Modal from 'components/Modal';
import React from 'react';
import styled from 'styled-components';
import { RootState } from 'store/modules';
import { useDispatch, useSelector } from 'react-redux';
import { changeState, dropAllSelectedPlaces } from 'store/modules/plan/search';

import SubmitButton from 'components/StyledSmitButton';
import { insertPlaceOptionList } from 'store/modules/plan/plan';
import { changeOpenState } from 'store/modules/modal';
import PlanModalTitle from './Title';
import PlanPlaceForm from './PlaceForm';
import PlanModalContents from './Contents';
import PlanPlaceSelected from './PlaceSelected';

const state = (state: RootState) => state.search.state;
const selectedListSelector = (state: RootState) => state.search.selectedPlaces;

const PlanModal = () => {
    const contentsType = useSelector(state);
    const selectedList = useSelector(selectedListSelector);
    const dispatch = useDispatch();

    const onClickPlanModalTitle = () => dispatch(changeState());
    const onClickSubmitButton = () => {
        dispatch(dropAllSelectedPlaces());
        dispatch(insertPlaceOptionList(selectedList));
        dispatch(changeOpenState(false));
    };

    return (
        <Modal width={1100} height={860}>
            <Container>
                <PlanModalTitle
                    state={contentsType}
                    onClick={onClickPlanModalTitle}
                />
                <PlanPlaceSelected />
                <PlanPlaceForm />
                <PlanModalContents />
                <SubmitButton
                    width={430}
                    height={56}
                    fontSize={20}
                    onClick={onClickSubmitButton}
                >
                    등록완료
                </SubmitButton>
            </Container>
        </Modal>
    );
};

const Container = styled.div`
    box-sizing: border-box;
    width: 920px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
`;

// width: 430px;
// height: 56px;

export default PlanModal;
