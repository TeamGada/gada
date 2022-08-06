import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from 'store/modules';

const LoactionSelector = (state: RootState) => state.location;

const NewPlanTitle : FC = () => {
    const [title, setTitle] = useState<string>('');
    const { locationName, isClickedLocation } = useSelector(LoactionSelector);

    useEffect(() => {
      if (isClickedLocation){
        setTitle(`${locationName} 여행`);
      }
    }, [])

    const handleChange = (e: any) => setTitle(e.target.value);

    return (
        <TitleWrapper>
            <TitleLabel
                htmlFor="title"
            >
                여행이름
            </TitleLabel>
            <TitleInput
                type='text'
                value={title}
                id="title"
                name="title"
                onChange={handleChange}
            />
        </TitleWrapper>
    )
}

export default NewPlanTitle;

const TitleWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TitleLabel = styled.label`
  display: inline-block;
  color: #60A5F8;
  font-weight: bold;
  font-size: 17px;
  margin-right: 28px;
`
const TitleInput = styled.input`
  width: 180px;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  background-color: #ECF3FD;
  color: #444;

  &:focus {outline:none;}
`