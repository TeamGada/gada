import React, { FC, useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReactSortable } from 'react-sortablejs';
import { RootState } from 'store/modules';
import {
    sortplaceOptionList,
    grabPlan,
    grabPlaceOption,
    movePlanToPlaceOption,
    deletePlaceOptionList,
} from 'store/modules/plan/plan';
import jejuImg from 'images/jeju.jpg';
import { Place } from 'store/modules/plan';
import { CancelDetailIcon } from 'components/icons';
import getAuthHeader from 'utils/getAuthHeader';

const placeOptionListSelector = (state: RootState) =>
    state.plan.placeOptionList;
const grabPlanIdSelector = (state: RootState) => state.plan.grabPlanId;
const setDaySelector = (state: RootState) => state.plan.setDay;
const planListSelector = (state: RootState) => state.plan.planList;
const shareModeSelector = (state: RootState) => state.plan.shareMode;
// eslint-disable-next-line no-underscore-dangle
const planIdSelector = (state: RootState) => state.plan._id;

const SelectedOption: FC = () => {
    const dispatch = useDispatch<any>();
    const placeOptionList = useSelector(placeOptionListSelector);
    const setDay = useSelector(setDaySelector);
    const grabPlanId = useSelector(grabPlanIdSelector);
    const shareMode = useSelector(shareModeSelector);
    const planList = useSelector(planListSelector);
    const planId = useSelector(planIdSelector);
    const enterCnt = useRef(0);
    const headers = getAuthHeader();

    const droppedRef = useRef<HTMLElement | null>(null);
    const [isDrop, setIsDrop] = useState(false);

    useEffect(() => {
        if (isDrop) {
            setIsDrop(false);
            const node = droppedRef.current;
            node?.classList.add('focus');
            node?.scrollIntoView();
            setTimeout(() => {
                node?.classList.remove('focus');
            }, 500);
        }
    }, [placeOptionList]);

    const onDragStartPlace = useCallback((e: React.DragEvent<HTMLElement>) => {
        enterCnt.current = 0;
        dispatch(grabPlan({ id: null }));
        dispatch(grabPlaceOption({ id: e.currentTarget.dataset.id }));
    }, []);

    const onDragEnterConainer = useCallback(
        (e: React.DragEvent<HTMLElement>) => {
            if (!grabPlanId) return;
            enterCnt.current += 1;
            e.currentTarget.classList.add('drag-over');
        },
        [grabPlanId],
    );

    const onDragLeaveConainer = useCallback(
        (e: React.DragEvent<HTMLElement>) => {
            if (!grabPlanId) return;

            enterCnt.current -= 1;
            if (enterCnt.current === 0) {
                e.currentTarget.classList.remove('drag-over');
            }
        },
        [grabPlanId],
    );

    const onDropContainer = useCallback(
        (e: React.DragEvent<HTMLElement>) => {
            if (!grabPlanId) return;

            const col = planList[setDay].map((p) => p.id).indexOf(grabPlanId);

            e.currentTarget.classList.remove('drag-over');
            dispatch(
                movePlanToPlaceOption({
                    headers,
                    planId,
                    row: setDay,
                    col,
                    id: grabPlanId,
                }),
            );
            setIsDrop(true);
        },
        [grabPlanId],
    );

    // util로 분리
    const getSortableList = (list: Place[]): Place[] => {
        return list.map((x) => ({
            ...x,
            chosen: true,
        }));
    };
    const onSort = (list: Place[]): void => {
        dispatch(sortplaceOptionList({ list }));
    };

    return (
        <Container
            onDragEnter={onDragEnterConainer}
            onDragLeave={onDragLeaveConainer}
            onDrop={onDropContainer}
            onDragOver={(e) => e.preventDefault()}
        >
            <DragInfo shareMode={shareMode}>
                <Message shareMode={shareMode}>
                    {shareMode
                        ? '공유한 계획은 수정할 수 없습니다!'
                        : '장소를 드레그해서 일정에 추가해보세요!'}
                </Message>
            </DragInfo>
            <ReactSortable
                className="sortable-container"
                animation={150}
                list={getSortableList(placeOptionList)}
                setList={onSort}
            >
                {placeOptionList.map((option: Place, index: number) => {
                    if (index === placeOptionList.length - 1) {
                        return (
                            <PlaceItem
                                ref={
                                    droppedRef as React.RefObject<HTMLDivElement>
                                }
                                key={option.id}
                                data-id={option.id}
                                draggable="true"
                                onDragStart={onDragStartPlace}
                            >
                                <div className="img-container">
                                    <img
                                        src={option.imgUrl ?? jejuImg}
                                        alt="img"
                                        draggable="false"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        dispatch(
                                            deletePlaceOptionList(option.id),
                                        );
                                    }}
                                >
                                    <span>
                                        <CancelDetailIcon />
                                    </span>
                                </button>
                                <div className="place-name">{option.name}</div>
                            </PlaceItem>
                        );
                    }
                    return (
                        <PlaceItem
                            key={option.id}
                            data-id={option.id}
                            draggable="true"
                            onDragStart={onDragStartPlace}
                        >
                            <div className="img-container">
                                <img
                                    src={option.imgUrl ?? jejuImg}
                                    alt="img"
                                    draggable="false"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    dispatch(deletePlaceOptionList(option.id));
                                }}
                            >
                                <span>
                                    <CancelDetailIcon />
                                </span>
                            </button>
                            <div className="place-name">{option.name}</div>
                        </PlaceItem>
                    );
                })}
            </ReactSortable>
        </Container>
    );
};

const DragInfo = styled.div<{ shareMode: boolean }>`
    position: absolute;
    top: -54px;
    right: 300px;
    width: 310px;
    height: 40px;
    background-color: ${({ shareMode }) => (shareMode ? '#FFE4E4' : '#E4F0FF')};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -10;

    &:after {
        content: '';
        height: 0;
        width: 0;
        position: absolute;
        top: 100%;
        right: 140px;
        border: 12px solid transparent;
        border-top-width: 0;
        border-bottom-color: ${({ shareMode }) =>
            shareMode ? '#FFE4E4' : '#E4F0FF'};
        transform: rotate(180deg);
    }
`;

const Message = styled.p<{ shareMode: boolean }>`
    color: ${({ shareMode }) => (shareMode ? '#FA6565' : '#60A5F8')};
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 1px;
`;

const Container = styled.div`
    position: relative;
    background-color: white;

    & > .sortable-container {
        width: 100%;
        height: 100px;
        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        padding: 8px 5px;
        display: flex;
        align-items: center;
        overflow-y: hidden;

        &::-webkit-scrollbar {
            height: 10px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #ccc;
            border-radius: 10px;
            background-clip: padding-box;
            border: 2px solid transparent;
        }
        &::-webkit-scrollbar-track {
            background-color: #fff;
            border-radius: 10px;
            box-shadow: inset 0px 0px 5px white;
        }
    }

    &.drag-over {
        border: solid 2px gray;
        border-radius: 20px;
        background-color: ${({ theme }) => theme.LIGHT_GRAY};
    }
`;

const PlaceItem = styled.div`
    margin: 0 10px;

    &:first-of-type {
        margin-left: 20px;
    }
    &:last-of-type {
        margin-right: 20px;
    }

    cursor: grab;
    position: relative;

    &:hover > button {
        display: block;
    }

    & > .img-container {
        width: 70px;
        height: 70px;
        border-radius: 100%;
        overflow: hidden;
        margin-left: 10px;
    }

    & > .img-container img {
        width: 70px;
        height: 70px;
    }

    & > .place-name {
        text-align: center;
        margin-top: 3px;
        width: 90px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
    }

    &.grab-item {
        width: 400px;
        height: 80px;
        margin-bottom: 35px;
        border-radius: 13px;
        box-shadow: 1px 1px 10px 1px #d9d9d9;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    & > button {
        cursor: pointer;
        position: absolute;
        top: -7px;
        right: -10%;
        border: 0px;
        background: none;
        display: none;

        opacity: 0.8;

        :hover {
            opacity: 1;
        }
    }

    &.focus {
        background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
    }
`;

export default SelectedOption;
