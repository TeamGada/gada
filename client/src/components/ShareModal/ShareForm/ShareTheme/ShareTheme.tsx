import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const themeOptions = [
    "맛집",
    "힐링",
    "포토",
    "명소",
    "자연"
]

const customStyles = {
    control: (styles: any) => ({
        ...styles,
        color: "#444",
        backgroundColor: "#ECF3FD",
        borderRadius: "5px",
        "&:hover": { borderColor: "gray" },
        border: "none",
        boxShadow: "none",
        width: "200px",
        height: "30px",
        fontSize: "15px",
        cursor: "pointer",
        paddingLeft: "10px"
    }),
    option: (base: any, { isFocused }: any) => ({
        ...base,
        cursor: "pointer",
        backgroundColor: isFocused ? "#ECF3FD" : "",
        color: isFocused ? "#444" : "",
        ":hover": {
            backgroundColor: "#ECF3FD"
        }
    }),
    menuList: (base: any) => ({
        ...base,
        "::-webkit-scrollbar": {
            width: "6px",
            height: "0px"
        },
        "::-webkit-scrollbar-thumb": {
            background: "#aaa",
            borderRadius: "10px"
        },
        "::-webkit-scrollbar-thumb:hover": {
            background: "#ccc"
        }
    }),
    singleValue: (base: any) => ({
        ...base
    })
};

const ShareTheme = ( { setTheme }: any ) => {
    const options = themeOptions.map((x) => ({ value: x, label: x }));

    const handleChange = (value: any) => {
        setTheme(value.value);
    }

    return (
        <ThemeWrapper>
            <ThemeLabel
                htmlFor="theme"
            >
                주제
            </ThemeLabel>
            <InputWrapper>
                <Select
                    options={options}
                    styles={customStyles}
                    placeholder="주제를 선택해주세요."
                    onChange={handleChange} />
            </InputWrapper>
        </ThemeWrapper>
    )
}

export default ShareTheme;

const ThemeWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 20px;
`

const ThemeLabel = styled.label`
  display: inline-block;
  color: #60A5F8;
  font-weight: bold;
  font-size: 20px;
  width: 60px;
  margin-left: 90px;
`

const InputWrapper = styled.div`
    width: 220px;
`