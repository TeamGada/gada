import SharedPlan from 'containers/share/SharedPlan';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getSharedPlanInfoById } from 'store/modules/plan/share';
import styled from 'styled-components';
import getAuthHeader from 'utils/getAuthHeader';
import useConfirmModal from 'hooks/useConfirmModal';
import PageInfo from 'components/PageInfo';

const confirmSharePayload = {
    width: 400,
    height: 300,
    message: `계획을 내 계획으로 가져오시겠습니까? 가져온 계획은 '마이페이지 > 내 계획'에서 확인 가능합니다.`,
};

const titles = {
    mainTitle: '계획 가져오기',
    subTitle1: '다른 사람의 계획이 마음에 드시나요?',
    subTitle2: '계획 가져오기 버튼을 누르면 내 계획에 추가됩니다!'
}

const Share = () => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const { id } = useParams<'id'>();
    const headers = getAuthHeader();
    const [shareState, shareType, shareModalHandler] = useConfirmModal(
        confirmSharePayload,
        'share',
    );

    useEffect(() => {
        if (id) dispatch(getSharedPlanInfoById({ headers, planId: id }));
    }, []);

    useEffect(() => {
        if (shareState && shareType === 'share') {
            (async () => {
                try {
                    await axios.post(`/shares/${id}/bring`, {}, { headers });
                    navigate('/main');
                } catch (err) {
                    console.error(err);
                }
            })();
        }
    }, [shareState]);

    return (
        <>
            <PageInfo 
            titles={titles}/>
            <ShareBody>
                <ShareContents>
                    <SharedPlan />
                </ShareContents>
                <SubmitButton
                    onClick={shareModalHandler}
                    type="submit"
                    value="계획 가져오기"
                />
            </ShareBody>
        </>
    );
};

export default Share;

const ShareBody = styled.main`
    min-width: 1287px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 40px;
    margin-top: 10px;
`;

const ShareContents = styled.article`
    margin-top: 25px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const SubmitButton = styled.input`
    background-color: #60a5f8;
    border: none;
    padding: 12px 130px;
    font-size: 22px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    margin: 0px auto;
`;
