import React, { useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import { newPlanSelectOptions, newPlanCustomStyles } from 'utils/usefulFunctions'

const LoactionSelector = (state: RootState) => state.location;

const NewPlanlocation = ( { setLocation }: any ) => {
    const options = newPlanSelectOptions.map((x) => ({ value: x, label: x }));

    const { locationName, isClickedLocation } = useSelector(LoactionSelector);

    useEffect(() => {
        if (isClickedLocation) {
            setLocation(locationName);
        }
    }, [])
    
    const defaultValue = {
        label: locationName,
        value: locationName,
    }

    const handleChange = (value: any) => {
        setLocation(value.value);
    }
    
    return (
        <LocationWrapper>
            <LocationLabel
                htmlFor="location"
            >
                여행지역
            </LocationLabel>
            <InputWrapper>
                <Select
                    options={options}
                    styles={newPlanCustomStyles}
                    placeholder="지역을 선택해주세요."
                    onChange={handleChange} 
                    defaultValue={isClickedLocation ? defaultValue : ''}
                    />
            </InputWrapper>
        </LocationWrapper>
    )
}

export default NewPlanlocation;

const LocationWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LocationLabel = styled.label`
  display: inline-block;
  color: #60A5F8;
  font-weight: bold;
  font-size: 17px;
  margin-right: 28px;
`

const InputWrapper = styled.div`
    width: 220px;
`