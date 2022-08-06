import React from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import getAuthHeader from 'utils/getAuthHeader';
import { useNavigate } from 'react-router-dom';
import useConfirmModal from 'hooks/useConfirmModal';
import { LikeIcon, UnlikeIcon } from 'components/icons';

const confirmPropsPayload = {
    width: 400,
    height: 310,
    message: '계획 공유를 취소하시겠습니까?',
};

const CardList = ( { datas, setCheckLike, pagetype, setClickedId }: any ) => {
    const headers = getAuthHeader();
    const navigate = useNavigate();

    const [confirmState, confirmType, confirmModalHandler] = useConfirmModal(
        confirmPropsPayload,
        'cancelShare',
    );

    const clickLikeHandler = (
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
        planId: string,
        clickedLike: boolean,
    ) => {
        e.stopPropagation();

        (async () => {
            try {
                const body = {
                    planId,
                    toggle: !clickedLike,
                };
                await axios.post('/likes', body, { headers });
                setCheckLike(body);
            } catch (err) {
                console.error(err);
            }
        })();
    };

    const cancelCardHandler = (e: any, planId: string) => {
        e.stopPropagation();
        setClickedId(planId);
        confirmModalHandler();
    };

    const clickCardHandler = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        planId: string,
    ) => {
        navigate(`/share/${planId}`);
    };

    return (
        <CardListContainer>
            {datas?.map((data: any) => (
                <Card
                    key={data.planId}
                    onClick={(e) =>
                        clickCardHandler(e, data.planId)
                    }
                >
                    <CardHeader>
                        <Tag>{data.tag}</Tag>
                        <Location>{data.area}</Location>
                    </CardHeader>
                    <CardTitle>{data.shareTitle}</CardTitle>
                    <CardButtons>
                        {pagetype === 'myShare' ? (
                            <CancelButton
                                onClick={(e) =>
                                    cancelCardHandler(
                                        e,
                                        data.planId,
                                    )
                                }
                            >
                                공유취소
                            </CancelButton>
                        ) : (
                            <Helper />
                        )}
                        {data.clickedLike ? (
                            <LikeButton
                                onClick={(e) =>
                                    clickLikeHandler(
                                        e,
                                        data.planId,
                                        data.clickedLike,
                                    )
                                }
                                pagetype={pagetype}
                            />
                        ) : (
                            <UnlikeButton
                                onClick={(e) =>
                                    clickLikeHandler(
                                        e,
                                        data.planId,
                                        data.clickedLike,
                                    )
                                }
                                pagetype={pagetype}
                            />
                        )}
                    </CardButtons>
                    <CardInfo>
                        <UserName>{data.username}</UserName>
                        <LikeCount>
                            좋아요 {data.likeCount}개
                        </LikeCount>
                    </CardInfo>
                </Card>
            ))}
        </CardListContainer>
    )
}

export default CardList;

const CardListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 233px);
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    place-content: center;
`;

const Card = styled.div`
    width: 233px;
    height: 300px;
    border: solid #ccc 1px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    box-sizing: border-box;
    padding: 20px;

    &:hover {
        transform: translate(0, -5px);
        box-shadow: 0 8px 18px -5px rgb(0, 0, 0, 10%);
    }

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CardHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;
const Tag = styled.button`
    display: inline-block;
    padding: 7px 13px;
    border-radius: 30px;
    font-size: 12px;
    border: none;
    background-color: #60a5f8;
    color: white;
    font-weight: bold;
    cursor: pointer;
`;
const Location = styled.div`
    font-size: 14px;
    font-weight: bold;
    color: #666;
    margin-right: 7px;
`;

const CardTitle = styled.div`
    width: 100%;
    height: 90px;
    overflow: hidden;
    color: #444;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 45px;
    line-height: 140%;
`;

const CardButtons = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: solid #ccc 1px;
    margin-bottom: 15px;
`;

const Helper = styled.div`
    width: 1px;
    height: 28px;
`;

const CancelButton = styled.button`
    cursor: pointer;
    border: none;
    background-color: #f86960;
    font-weight: bold;
    color: white;
    padding: 6px 8px;
    border-radius: 5px;
    font-size: 12px;
    transition: all ease 0.2s;

    &:hover {
        transform: translate(0, -3px);
    }
`;

const LikeButton = styled(LikeIcon)<{ pagetype: string }>`
    cursor: cursor;
    display: inline-block;
    margin-right: 7px;
    transition: all ease 0.2s;

    &:hover {
        transform: translate(0, -3px);
    }

    ${({ pagetype }) =>
        pagetype === 'all' &&
        css`
            margin-left: auto;
        `}
`;

const UnlikeButton = styled(UnlikeIcon)<{ pagetype: string }>`
    cursor: cursor;
    display: inline-block;
    margin-right: 7px;
    transition: all ease 0.2s;

    &:hover {
        transform: translate(0, -3px);
    }

    ${({ pagetype }) =>
        pagetype === 'all' &&
        css`
            margin-left: auto;
        `}
`;

const CardInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666;
    font-weight: bold;
    font-size: 14px;
`;
const UserName = styled.div`
    margin-left: 7px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100px;
    height: 20px;
`;
const LikeCount = styled.div`
    margin-right: 7px;
`;
