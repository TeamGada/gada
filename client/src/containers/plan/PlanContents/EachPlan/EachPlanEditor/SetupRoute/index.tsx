import React, {
    FC,
    useEffect,
    useRef,
    useCallback,
    useState,
    useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReactSortable } from 'react-sortablejs';
import { RootState } from 'store/modules';
import {
    grabPlan,
    grabPlaceOption,
    movePlaceOptionToPlan,
    sortPlanList,
    sortPlanListFailCheck,
} from 'store/modules/plan/plan';
import { Place } from 'store/modules/plan';
import { PlanDetailModel } from 'store/modules/plan/plan.model';
import { useLocation } from 'react-router-dom';
import getAuthHeader from 'utils/getAuthHeader';
import RoutItem from './RoutItem';

const planListSelector = (state: RootState) => state.plan.planList;
const planOptionListSelector = (state: RootState) => state.plan.placeOptionList;

const setDaySelector = (state: RootState) => state.plan.setDay;
const shareModeSelector = (state: RootState) => state.plan.shareMode;
// eslint-disable-next-line no-underscore-dangle
const planIdSelector = (state: RootState) => state.plan._id;
const grabPlaceOptionIdSelector = (state: RootState) =>
    state.plan.grabPlaceOptionId;

const SetupRoute: FC = () => {
    const dispatch = useDispatch<any>();
    const planList = useSelector(planListSelector);
    const setDay = useSelector(setDaySelector);
    const shareMode = useSelector(shareModeSelector);
    const grabPlaceOptionId = useSelector(grabPlaceOptionIdSelector);
    const placeOptionList = useSelector(planOptionListSelector);
    const planId = useSelector(planIdSelector);
    const [isDrop, setIsDrop] = useState(false);
    const [firstRender, setFistRender] = useState(false);
    const location = useLocation();
    const headers = getAuthHeader();

    const droppedRef = useRef<HTMLElement | null>(null);
    const enterCnt = useRef(0);

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
    }, [planList]);

    useEffect(() => {
        setFistRender(true);
    }, []);

    const onDragStartPlace = useCallback(
        (e: React.DragEvent<HTMLElement>): void => {
            if (shareMode) return;
            enterCnt.current = 0;
            dispatch(grabPlaceOption({ id: null }));
            dispatch(grabPlan({ id: e.currentTarget.dataset.id }));
        },
        [shareMode],
    );

    const onDragEnterConainer = useCallback(
        (e: React.DragEvent<HTMLElement>) => {
            if (shareMode) return;
            if (!grabPlaceOptionId) return;
            enterCnt.current += 1;
            e.currentTarget.classList.add('drag-over');
        },
        [grabPlaceOptionId, shareMode],
    );

    const onDragLeaveConainer = useCallback(
        (e: React.DragEvent<HTMLElement>) => {
            if (shareMode) return;
            if (!grabPlaceOptionId) return;
            enterCnt.current -= 1;
            if (enterCnt.current === 0) {
                e.currentTarget.classList.remove('drag-over');
            }
        },
        [grabPlaceOptionId, shareMode],
    );

    const onDropContainer = useCallback(
        (e: React.DragEvent<HTMLElement>) => {
            if (shareMode) return;
            if (!grabPlaceOptionId) return;
            e.currentTarget.classList.remove('drag-over');
            const selected = placeOptionList.find(
                (place) => place.id === grabPlaceOptionId,
            );
            if (selected) {
                dispatch(
                    movePlaceOptionToPlan({
                        headers,
                        planId,
                        place: selected,
                        setDay,
                    }),
                );
                setIsDrop(true);
            }
        },
        [grabPlaceOptionId, shareMode],
    );

    // SortableJs Logic
    type PlanDetailSortableItem = PlanDetailModel & { chosen: boolean };
    const getSortableList = (
        list: PlanDetailModel[][],
    ): PlanDetailSortableItem[] => {
        if (!(list.length > 1)) return [];
        if (shareMode) return [];
        return list[setDay].map((x) => {
            return {
                ...x,
                chosen: true,
            };
        });
    };

    const SortableList = useMemo(() => {
        const temp = getSortableList(planList);
        if (location) {
            return temp;
        }
        return temp;
    }, [planList, location, setDay]);

    const onSort = (list: PlanDetailModel[]): void => {
        if (!(list.length > 0)) return;
        if (shareMode) return;
        if (firstRender) {
            dispatch(sortPlanList(list));
            dispatch(
                sortPlanListFailCheck({
                    headers,
                    planId,
                    index: setDay,
                    preplanDetails: planList[setDay],
                    curDetails: list,
                }),
            );
        }
    };

    return (
        <Container
            onDragEnter={onDragEnterConainer}
            onDragLeave={onDragLeaveConainer}
            onDrop={onDropContainer}
            onDragOver={(e) => e.preventDefault()}
        >
            {SortableList && (
                <ReactSortable
                    animation={150}
                    list={SortableList}
                    setList={onSort}
                >
                    {planList.length > 0 &&
                        planList[setDay].map((plan: Place, index: number) => {
                            return (
                                <RoutItem
                                    focusRef={
                                        index === planList[setDay].length - 1
                                            ? (droppedRef as React.RefObject<HTMLDivElement>)
                                            : null
                                    }
                                    key={plan.id}
                                    dataId={plan.id}
                                    onDragStartPlace={onDragStartPlace}
                                    placename={plan.name}
                                    location={plan.address}
                                />
                            );
                        })}
                </ReactSortable>
            )}
        </Container>
    );
};

const Container = styled.div`
    width: 450px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 15px;
    position: relative;
    box-sizing: border-box;

    &.drag-over {
        width: 450px;
        border: solid 2px ${({ theme }) => theme.PRIMARY};
        border-radius: 20px;
        background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
    }

    &.drag-over {
        border: solid 2px ${({ theme }) => theme.PRIMARY};
        border-radius: 20px;
        background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
    }
`;

export default SetupRoute;
