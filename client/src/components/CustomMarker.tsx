import React from 'react';
import styled from 'styled-components';

type Props = {
    size: number;
    border: number;
    color: string;
    text: string | number;
};

const CustomMarker = ({ size, border, color, text }: Props) => {
    return (
        <MarkerIcon size={size} border={border} color={color}>
            <div>{text}</div>
        </MarkerIcon>
    );
};
const MarkerIcon = styled.div<{ size: number; border: number; color: string }>`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    background: ${({ color }) => color};
    border-radius: 50%;
    margin: 0 auto;
    z-index: 4;
    box-sizing: border-box;
    position: relative;

    :before {
        content: '';
        position: absolute;
        border-top: ${({ size }) => (size / 4) * 3}px solid
            ${({ color }) => color};
        border-right: ${({ size }) => size / 2 - 1}px solid transparent;
        border-left: ${({ size }) => size / 2 - 1}px solid transparent;
        left: calc(50% - ${({ size }) => size / 2 - 1}px);
        box-sizing: border-box;

        bottom: -${({ size }) => (size / 4) * 2 - 2}px;
        z-index: 2;
    }
    & > div {
        display: inline-block;
        width: ${({ border }) => border}px;
        height: ${({ border }) => border}px;
        border-radius: 50%;
        position: absolute;
        left: calc(50% - ${({ border }) => border / 2}px);
        top: calc(50% - ${({ border }) => border / 2}px);
        z-index: 5;
        background: white;
        text-align: center;
        vertical-align: middle;
    }
`;

export default CustomMarker;
