import { useSelector, useDispatch } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store';

export const useUIStore = () => {

    const dispatch = useDispatch();

    const {
        isDateModalOpen
    } = useSelector(state => state.ui);

    const openDateModal = () => {
        dispatch(onOpenDateModal());
    };

    const closeDateModal = () => {
        dispatch(onCloseDateModal());
    };

    return {
        //Propiedades
        isDateModalOpen,


        // Métodos
        openDateModal,
        closeDateModal
    }

}
