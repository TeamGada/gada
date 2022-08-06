import React, { FC, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NewPlanImage from 'containers/main/NewPlanModal/NewPlanImage';
import NewPlanTitle from 'containers/main/NewPlanModal/NewPlanTitle';
import NewPlanLocation from 'containers/main/NewPlanModal/NewPlanLocation';
import NewPlanDate from 'containers/main/NewPlanModal/NewPlanDate';
import getAuthHeader from 'utils/getAuthHeader';
import useModal from 'hooks/useModal';

const NewPlanForm: FC = () => {
    const [imageData, setImageData] = useState<any>(null);
    const [location, setLocation] = useState<string>('');
    const headers = getAuthHeader();
    const closeModal = useModal('NewPlanModal');
    const handleSubmit = (e: any) => {
        e.preventDefault();

        (async () => {
            try {
                let { image } = e.target;
                const formData = new FormData();

                if (image.files.length > 0) {
                    setImageData(image.files[0]);
                    [image] = image.files;
                } else {
                    image = imageData;
                }

                if (image) {
                    formData.append('image', image);
                    image = formData;
                }

                const { title, date } = e.target;
                const [startDate, lastDate] = date.value.split(' ~ ');

                formData.append('title', title.value);
                formData.append('area', location);
                formData.append('startDate', startDate);
                formData.append('lastDate', lastDate);

                if (!title.value) {
                    alert('제목을 입력해 주세요!');
                } else if (!location) {
                    alert('지역을 선택해주세요!');
                } else {
                    // 이거 그대로 서버에 post
                    await axios.post('plans', formData, { headers });
                    closeModal();
                }
            } catch (err) {
                console.error(err);
            }
        })();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <NewPlanImage />
            <NewPlanTitle />
            <NewPlanLocation setLocation={setLocation} />
            <NewPlanDate />
            <SubmitButton type="submit" value="등록 완료" />
        </Form>
    );
};

export default NewPlanForm;

const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
`;
const SubmitButton = styled.input`
    background-color: #60a5f8;
    border: none;
    padding: 10px 120px;
    font-size: 18px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 30px;
`;
