import React from 'react';
import styled from 'styled-components';

const PlanPeriod = ({ start, end }: { start: string; end: string }) => {
    return (
        <Container>
            {start} - {end}
        </Container>
    );
};

const Container = styled.button`
    margin-left: 15px;
    width: 140px;
    height: 25px;
`;

export default PlanPeriod;
