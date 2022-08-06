import React, { FC, useState } from 'react';
import Modal from 'components/Modal';
import EmailAuthForm from 'components/EmailAuthModal/EmailAuthForm';

const EmailAuthModal: FC = () => {

    return (
        <Modal
        width={400}
        height={400}
        >
            {/* 모달 내부 - 여기서 커스텀 하면 됩니다 */}
            <EmailAuthForm />
        </Modal>
    )
}

export default EmailAuthModal;