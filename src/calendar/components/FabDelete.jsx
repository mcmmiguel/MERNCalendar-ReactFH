import { useCalendarStore, useUIStore } from "../../hooks"

export const FabDelete = () => {

    const { openDateModal } = useUIStore();
    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    const handleDelete = () => {
        startDeletingEvent();
    }

    return (
        <button
            onClick={handleDelete}
            className="btn btn-danger fab-danger"
            style={{ display: hasEventSelected ? '' : 'none' }}>
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
