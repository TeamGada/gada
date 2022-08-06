import React, { FC } from 'react';
import PlanList from 'containers/main/PlanList';
import LocationList from 'containers/main/LocationList';

const Main: FC = () => {
    return (
        <>
            <PlanList />
            <LocationList />
        </>
    );
};

export default Main;
