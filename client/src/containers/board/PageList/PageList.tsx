import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { LeftIcon, RightIcon } from 'components/icons';

const PageList = ( { page, setPage, setDatas, pagetype, clickedTag, location, headers }: any ) => {
    const { currentPage, startPage, endPage, totalPage } = page;
    const pageNums = [...Array(endPage - startPage + 1)].map((_, i) => i + startPage);

    const pageClickHandler = (e: React.MouseEvent, pageNum: number) => {
        (async () => {
            try {
                let results;
                if (pagetype === 'all') {
                    results = await axios.get(
                        `/shares/${clickedTag}/${location}?page=${pageNum}`,
                        { headers },
                    );
                } else {
                    results = await axios.get(
                        `/shares/my-share/${clickedTag}/${location}?page=${pageNum}`,
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
    }
    return (
        <Wrapper>
            {startPage !== 1 &&
            <PrevButton
            color="#666"
            onClick={(e) => pageClickHandler(e, currentPage - 1)} />}

            {pageNums.map((pageNum: number) => {
                return pageNum === currentPage ?

                       (<Clicked key={pageNum}>
                        {pageNum}
                       </Clicked>) :

                       (<PageButton
                       key={pageNum}
                       onClick={(e) => pageClickHandler(e, pageNum)}>
                        {pageNum}
                       </PageButton>)
            })}

            {endPage !== totalPage &&
            <NextButton 
            color="#666"
            onClick={(e) => pageClickHandler(e, currentPage + 1)} />}
        </Wrapper>
    )
}

export default PageList;

const Wrapper = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const PrevButton = styled(LeftIcon)`
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-right: 20px;
`

const NextButton = styled(RightIcon)`
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-left: 20px;
`

const Button = styled.button`
    display: inline-block;
    box-sizing: border-box;
    min-width: 27px;
    font-size: 15px;
    cursor: pointer;
    margin: 0 5px;
    border-radius: 5px;
`

const PageButton = styled(Button)`
    color: #444;
    background: none;
    border: solid #ccc 1px;
    padding: 4px;

    :hover {
        border-color: #888;
    }
`

const Clicked = styled(Button)`
    color: #fff;
    background: #60A5F8;
    border: none;
    padding: 5px;
`