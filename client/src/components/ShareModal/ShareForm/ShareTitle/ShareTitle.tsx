import React, { useState } from 'react';
import styled from 'styled-components';

const ShareTitle = () => {
    const [ title, setTitle ] = useState<string>("");
    const handleChange = (e: any) => setTitle(e.target.value);

    return (
        <TitleWrapper>
            <TitleLabel
            htmlFor="title"
            >
                제목
            </TitleLabel>
            <ShareTitleInput 
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={handleChange}
            />
        </TitleWrapper>
    )
}

export default ShareTitle;

const TitleWrapper = styled.div`
    margin-top: 40px;
    display: flex;
    align-items: center;
    width: 100%;
`

const TitleLabel = styled.label`
    display: inline-block;
    color: #60A5F8;
    font-weight: bold;
    font-size: 20px;
    width: 60px;
    margin-left: 90px;
`

const ShareTitleInput = styled.input`
    width: 230px;
    padding: 10px 20px;
    font-size: 15px;
    font-weight: 500;
    border: none;
    border-radius: 5px;
    background-color: #ECF3FD;
    color: #444;

    &:focus {outline:none;}
`