import React, { FC } from 'react';
import Modal from 'components/Modal';
import ShareForm from 'components/ShareModal/ShareForm';

const ShareModal: FC = () => {

    return (
        <Modal
        width={500}
        height={550}
        >
            {/* 모달 내부 - 여기서 커스텀 하면 됩니다 */}
            <ShareForm />
        </Modal>
    )
}

export default ShareModal;