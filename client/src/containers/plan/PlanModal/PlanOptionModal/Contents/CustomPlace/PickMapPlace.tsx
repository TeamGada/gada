import { position2DetailAddressByGeocoder } from 'utils/searchScenario';
import React, { useEffect, useRef, useState } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { SearchedPlaceInfo } from 'store/modules/plan';
import styled from 'styled-components';
import { CancelIcon } from 'components/icons';

/**
 * @TODO DefaultImage 선정
 */
const emptyImage =
    'https://user-images.githubusercontent.com/43302778/106805462-7a908400-6645-11eb-958f-cd72b74a17b3.jpg';

interface Props {
    position: {
        lat: number;
        lng: number;
    };
    callback: (data: SearchedPlaceInfo) => void;
}

const PickMapPlace = ({ position, callback }: Props) => {
    useEffect(() => {
        setIsOpen(true);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [position]);
    const [name, setName] = useState<string>();
    const [isOpen, setIsOpen] = useState(true);

    const inputRef = useRef<HTMLInputElement>(null);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name) return;
        const address = await position2DetailAddressByGeocoder(position);
        const place: SearchedPlaceInfo = {
            name,
            imgUrl: emptyImage,
            address,
            latitude: String(position.lat),
            longitude: String(position.lng),
        };
        callback(place);
        setName('');
        setIsOpen(false);
    };
    const onClickCancel = () => setIsOpen(false);
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>
        setName(e.target.value);

    return isOpen ? (
        <CustomOverlayMap position={position} yAnchor={1} zIndex={10} clickable>
            <PickMyPlaceForm onSubmit={onSubmit}>
                <CancelBtn type="button" onClick={onClickCancel}>
                    <span>
                        <CancelIcon width="15px" />
                    </span>
                </CancelBtn>
                <PickMyPlaceInput
                    placeholder="장소 이름을 입력해주세요!"
                    value={name ?? ''}
                    onChange={onChangeInput}
                    ref={inputRef}
                />
                <PickMyPlaceButton type="submit">확인</PickMyPlaceButton>
            </PickMyPlaceForm>
        </CustomOverlayMap>
    ) : (
        <div />
    );
};
const PickMyPlaceForm = styled.form`
    cursor: default;
    z-index: 1000;
    width: 240px;
    height: 122px;
    border: 0px;
    background: white;
    box-shadow: 0px 0px 3px #000;
    border-radius: 10px;
    position: relative;
    margin: 0 auto 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:after {
        content: '';
        position: absolute;
        border-top: 10px solid #fff;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        bottom: -9px;
        left: 50%;
    }
`;
const PickMyPlaceInput = styled.input`
    width: 180px;
    border: 0px;
    border-bottom: 1px solid #dedede;
    outline: 0px;
    padding-bottom: 4px;
    margin-bottom: 15px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

    &:hover {
        z-index: 99999;
    }
`;
const PickMyPlaceButton = styled.button`
    width: 74px;
    height: 18px;
    background: #60a5f8;
    box-shadow: 0px 2px 4px rgba(109, 103, 103, 0.25);
    border-radius: 30px;
    border: 0px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
    color: #ffffff;
`;

const CancelBtn = styled.button`
    cursor: pointer;
    position: absolute;
    top: 3%;
    right: 1%;
    border: 0px;
    background: none;
`;

export default PickMapPlace;
