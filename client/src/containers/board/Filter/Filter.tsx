import React from 'react';
import styled, { css } from 'styled-components';
import Select from 'react-select';
import { boardCustomStyles, selectOptions, tags } from 'utils/usefulFunctions';

const selectDefaultValue = {
    label: '전체',
    value: '전체',
};

const Filter = ( { setClickedTag, clickedTag, setLocation }: any ) => {
    const options = selectOptions.map((option) => ({
        value: option,
        label: option,
    }));

    const clickTagHandler = (e: any) => {
        setClickedTag(e.target.value);
    };

    const changeLocationHandler = (value: any) => {
        setLocation(value.value);
    };

    return (
        <FilterContainer>
            {tags.map((tag) => (
                <TagButton
                    key={tag}
                    onClick={clickTagHandler}
                    value={tag}
                    isClicked={clickedTag === tag}
                >
                    {tag}
                </TagButton>
            ))}
            <SelectWrapper>
                <Select
                    options={options}
                    styles={boardCustomStyles}
                    placeholder="지역"
                    onChange={changeLocationHandler}
                    defaultValue={selectDefaultValue}
                />
            </SelectWrapper>
        </FilterContainer>
    )
}

export default Filter;

const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    & > button:not(:first-of-type) {
        margin-left: 10px;
    }

    padding-bottom: 10px;
    margin-bottom: 30px;
    border-bottom: solid #ccc 1px;
`;

const TagButton = styled.button<{ isClicked: boolean }>`
    cursor: pointer;
    border: none;
    font-weight: bold;
    padding: 6px 23px;
    border-radius: 50px;
    font-size: 16px;
    transition: all 0.2s;

    :hover {
        background-color: #60a5f8;
        color: white;
    }

    ${({ isClicked }) =>
        isClicked
            ? css`
                  background-color: #60a5f8;
                  color: white;
              `
            : css`
                  background-color: #e4f0ff;
                  color: #60a5f8;
              `}
`;

const SelectWrapper = styled.div`
    margin-left: auto;
    box-sizing: border-box;
`;