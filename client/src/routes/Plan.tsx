import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

// containers
import PlanInfo from 'containers/plan/PlanHeader';
import OptionMaker from 'containers/plan/PlaceOptionMaker';

// redux (type, reducer)
import { getPlanInfoById, initializePlanState } from 'store/modules/plan/plan';
import EachPlan from 'containers/plan/PlanContents/EachPlan';
import { useParams } from 'react-router-dom';
import getAuthHeader from 'utils/getAuthHeader';

const Plan: FC = () => {
    const dispatch = useDispatch<any>();
    const { id } = useParams<'id'>();
    const headers = getAuthHeader();

    useEffect(() => {
        if (id) dispatch(getPlanInfoById({ headers, planId: id }));
        return () => dispatch(initializePlanState);
    }, []);

    return (
        <Container>
            <PlanInfo />
            <OptionMaker />
            <div className="bottom-section">
                <EachPlan />
            </div>
        </Container>
    );
};

const Container = styled.div`
    width: 1440px;
    margin: auto;

    & .bottom-section {
        display: flex;
        padding-top: 30px;
    }
`;

export default Plan;
