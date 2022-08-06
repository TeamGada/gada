import { ClockIcon, PencilIcon, WonIcon } from 'components/icons';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import useModal from 'hooks/useModal';
import { setClickPlaceDetailId } from 'store/modules/plan/plan';
import styled from 'styled-components';

interface IProps {
    key: string;
    focusRef?: React.RefObject<HTMLDivElement> | null;
    onDragStartPlace: (e: React.DragEvent<HTMLElement>) => void;
    placename: string;
    location: string;
    dataId: string;
}

const PlaceBox: FC<IProps> = ({
    key,
    focusRef,
    onDragStartPlace,
    placename,
    location,
    dataId,
}) => {
    const openModal = useModal("PlanDetailModal");
    const dispatch = useDispatch();
    return (
        <Container
            key={key}
            onDragStart={onDragStartPlace}
            ref={focusRef}
            data-id={dataId}
        >
            <ItemsTexts>
                <Name>{placename}</Name>
                <Location>{location}</Location>
            </ItemsTexts>
            <ItemsToolBtn
                onClick={() => {
                    openModal();
                    dispatch(setClickPlaceDetailId(dataId));
                }}
            >
                <div>
                    <PencilIcon width={10} height={10} />
                    <p>메모</p>
                </div>
                <div>
                    <ClockIcon width={10} height={10} />
                    <p>시간</p>
                </div>
                <div>
                    <WonIcon width={10} height={10} />
                    <p>비용</p>
                </div>
            </ItemsToolBtn>
        </Container>
    );
};

PlaceBox.defaultProps = {
    focusRef: null,
};

const Container = styled.div`
    cursor: grab;
    width: 400px;
    height: 80px;
    margin-bottom: 35px;
    border-radius: 13px;
    box-shadow: 1px 1px 10px 1px #d9d9d9;
    background-color: white;
    display: flex;
    flex-direction: row;
    contents-items: center;

    &.focus {
        background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
    }
`;

const ItemsTexts = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    contents-items: center;
`;
const ItemsToolBtn = styled.button`
    text-decoration: none;
    border: 0px;

    display: flex;
    background: none;
    width: 60px;
    padding-left: 10px;
    flex-direction: column;
    justify-content: center;
    margin-left: auto;
    border-radius: 2px 13px 13px 2px;
    cursor: pointer;

    transition: background 0.1s linear;

    &:hover {
        background: #dedede;
        & > div > p {
            color: #6d6d6d;
        }
    }

    & > div > p {
        display: inline;
        font-size: 10px;
        color: #9c9c9c;
    }
`;

const Name = styled.div`
    font-size: 20px;
    margin: 0 0 7px 15px;
`;

const Location = styled.div`
    margin-left: 15px;
    color: ${({ theme }) => theme.LIGHT_GRAY};
`;

export default PlaceBox;
