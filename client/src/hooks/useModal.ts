import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import { changeOpenState, changeModalName } from 'store/modules/modal';

const ModalSelector = (state: RootState) => state.modal

const useModal = (modalName: string) => {
    const dispatch = useDispatch();
    const { modalIsOpen } = useSelector(ModalSelector);

    const clickHandler = () => {
        dispatch(changeModalName(modalName));
        dispatch(changeOpenState(!modalIsOpen));
    }

    return clickHandler;
}

export default useModal;