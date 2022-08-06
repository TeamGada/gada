import React from 'react';
import styled from 'styled-components';

const CustomModalSubmitButton = ({
    width,
    height,
    children,
    fontSize,
    ...props
}: any) => {
    return (
        <SubmitButton width={width} height={height} fontSize={fontSize} {...props}>
            {children}
        </SubmitButton>
    );
};
const SubmitButton = styled.button<{ width: number; height: number; fontSize: number }>`
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    cursor: pointer;
    background: ${({ theme }) => theme.PRIMARY};
    align-self: center;
    border: none;
    padding: 0;
    
    font-weight: bold;
    font-size: ${({ fontSize }) => fontSize}px;
    color: white;
`;

export default CustomModalSubmitButton;
