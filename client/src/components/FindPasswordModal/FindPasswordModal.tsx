import React, { FC } from 'react';
import Modal from 'components/Modal';
import FindPasswordForm from 'components/FindPasswordModal/FindPasswordForm';

const FindPasswordModal: FC = () => {

    return (
        <Modal
        width={400}
        height={400}
        >
            {/* 모달 내부 - 여기서 커스텀 하면 됩니다 */}
            <FindPasswordForm />
        </Modal>
    )
}

export default FindPasswordModal;