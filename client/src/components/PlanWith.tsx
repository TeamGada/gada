import React, { FC } from 'react';
import styled from 'styled-components';

const PlanWith: FC = () => {
    return <Container>1명과 함께</Container>;
};

const Container = styled.button`
    margin-left: 15px;
    width: 80px;
    height: 25px;
`;

export default PlanWith;
