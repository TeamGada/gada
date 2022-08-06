import React, { FC } from 'react';
import styled from 'styled-components';
import useModal from 'hooks/useModal';
import SelectedPlaceOption from 'containers/plan/PlaceOptionMaker/SelectedPlaceOption';
import { AddLocationIcon } from 'components/icons';

const OptionMaker: FC = () => {
    const openModal = useModal("PlanOptionModal");

    return (
        <Container>
            <AddOptionButton onClick={openModal}>
                <AddLocationIconWrapper />
                장소 추가
            </AddOptionButton>
            <SelectedPlaceOption />
        </Container>
    );
};

const Container = styled.div`
    width: auto;
    height: 130px;
    margin: 30px;
    position: relative;

    & > .drag-explanation {
        width: 280px;
        position: absolute;
        left: 1080px;
        top: -30px;
    }
`;

const AddOptionButton = styled.button`
    cursor: pointer;
    border: none;
    background-color: transparent;
    color: #3D95FF;
    padding: 0;
    margin-left: 15px;
    margin-bottom: 8px;
    font-size: 20px;
    font-weight: bold;
`;

const AddLocationIconWrapper = styled(AddLocationIcon)`
    width: 21px;
    height: 25px;
    margin-right: 5px;
`

export default OptionMaker;
