import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { RootState } from 'store/modules';
import { useSelector } from 'react-redux';
import axios from 'axios';
import getAuthHeader from 'utils/getAuthHeader';
import PageInfo from 'components/PageInfo';
import Filter from 'containers/board/Filter';
import CardList from 'containers/board/CardList';
import PageList from 'containers/board/PageList';

const titles = {
    mainTitle: '공유 게시판',
    subTitle1: '여행 계획을 고민중이신가요?',
    subTitle2: '다른 사람의 계획을 내 계획에 추가해보세요!'
}

interface pageProps {
    currentPage: number;
    startPage: number;
    endPage: number;
    totalPage: number;
}

const initPage = {
    startPage: 1,
    currentPage: 1,
    endPage: 1,
    totalPage: 1
}

const ConfirmSelector = (state: RootState) => state.modal;

const Board = () => {
    const [searchParams] = useSearchParams();
    const [clickedTag, setClickedTag] = useState<string>('전체');
    const [location, setLocation] = useState<string>('전체');
    const [datas, setDatas] = useState<any>();
    const [page, setPage] = useState<pageProps>(initPage);
    const [checkLike, setCheckLike] = useState<any>();
    const [clickedId, setClickedId] = useState<any>();
    const [shareState, setShareState] = useState<any>();
    const [pagetype, setpagetype] = useState<any>(searchParams.get('type'));
    const headers = getAuthHeader();

    const { confirmState, confirmType} = useSelector(ConfirmSelector);

    useEffect(() => {
        setDatas([]);
        setpagetype(searchParams.get('type'));
    }, [searchParams.get('type')]);

    // 공유 취소 관련
    useEffect(() => {
        (async () => {
            try {
                if (confirmState && confirmType === 'cancelShare') {
                    const data = {
                        toggle: false,
                    };
                    // 공유취소
                    await axios.post(`shares/${clickedId}`, data, {
                        headers,
                    });
                    setShareState(!shareState);
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, [confirmState]);

    // 초기 데이터 받아오기
    useEffect(() => {
        (async () => {
            try {
                let results;
                if (pagetype === 'all') {
                    results = await axios.get(
                        `/shares/${clickedTag}/${location}?page=${page.currentPage}`,
                        { headers },
                    );
                } else {
                    results = await axios.get(
                        `/shares/my-share/${clickedTag}/${location}?page=${page.currentPage}`,
                        { headers },
                    );
                }
                
                const { myLikes, pagingInfo } = results.data.data;
                let { sharedPlans } = results.data.data;
                
                // likeCount, clickedLike 추가
                sharedPlans = sharedPlans.map((data: any) => {
                    const clickedLike = myLikes.some(
                        (planId: string) => planId === data.planId,
                    );
                    return {
                        ...data,
                        likeCount: data.likes.length,
                        title: data.shareTitle,
                        location: data.area,
                        clickedLike,
                    };
                });
                setDatas(sharedPlans);
                setPage(pagingInfo);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [clickedTag, location, pagetype, shareState]);

    // 좋아요 관련 side effect
    useEffect(() => {
        if (checkLike) {
            const { planId, toggle } = checkLike;
            const newData = datas.map((data: any) => {
                const prevLikeCount = data.likeCount;
                if (data.planId === planId) {
                    // 같으면 좋아요 및 하트 변경
                    const newLikeCount = toggle
                        ? prevLikeCount + 1
                        : prevLikeCount - 1;
                    return {
                        ...data,
                        likeCount: newLikeCount,
                        clickedLike: toggle,
                    };
                }
                return data;
            });

            setDatas(newData);
        }
    }, [checkLike]);

    return (
        <>
            <PageInfo 
            titles={titles}/>
            <Main>
                <MainContainer>
                    <Filter 
                    setClickedTag={setClickedTag}
                    clickedTag={clickedTag}
                    setLocation={setLocation}/>

                    <CardList 
                    datas={datas}
                    setCheckLike={setCheckLike}
                    pagetype={pagetype}
                    setClickedId={setClickedId}
                    />

                    <PageList 
                    page={page}
                    setPage={setPage}
                    setDatas={setDatas}
                    pagetype={pagetype}
                    clickedTag={clickedTag}
                    location={location}
                    headers={headers}
                    />
                </MainContainer>
            </Main>
        </>
    );
};

export default Board;

const Main = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const MainContainer = styled.div`
    width: 1287px;
    margin: 80px auto;
`;