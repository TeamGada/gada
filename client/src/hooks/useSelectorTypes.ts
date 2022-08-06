import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from 'store/modules';

export default function useSelectorTyped<T>(fn: (state: RootState) => T): T {
    return useSelector(fn, shallowEqual);
}
