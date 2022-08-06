import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import { 
  changeOpenState, 
  changeModalName,
  changeConfirmState,
  changeConfirmProps
} from 'store/modules/modal';

const ModalSelector = (state: RootState) => state.modal

const useConfirmModal = (confirmPropsPayload: any, type: string) => {
    const dispatch = useDispatch();
    // 입력: confirmPropsPayload
    // 받는 값: confirmModalHandler, confirmState
    const { modalIsOpen, confirmState, confirmType } = useSelector(ModalSelector);
    
    const confirmModalHandler: any = () => {
        // 모달창 열기
        dispatch(changeModalName("ConfirmModal"));
        dispatch(changeOpenState(!modalIsOpen));
        dispatch(changeConfirmState(false));
        dispatch(changeConfirmProps({ ...confirmPropsPayload, type }))
    }

    return [confirmState, confirmType, confirmModalHandler];
}

export default useConfirmModal;