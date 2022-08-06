import React, { FC, useEffect } from 'react';
import Modal from 'components/Modal';
import NewPlanForm from 'containers/main/NewPlanModal/NewPlanForm';
import { useDispatch } from 'react-redux';
import { changeLocationState } from 'store/modules/main/location';

const NewPlanModal: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(changeLocationState({
                isClickedLocation: false,
                imageUrl: '',
                locationName: '',}))
        }
    }, [])

    return (
        <Modal
        width={524}
        height={733}
        >
            {/* 모달 내부 - 여기서 커스텀 하면 됩니다 */}
            <NewPlanForm />
        </Modal>
    )
}

export default NewPlanModal;