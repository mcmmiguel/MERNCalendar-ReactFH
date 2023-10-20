import { useState, useMemo } from 'react';
import Modal from 'react-modal';
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useUIStore } from '../../hooks';

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUIStore();

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [formValues, setFormValues] = useState({
        title: 'Miguel',
        notes: 'Cobian',
        start: new Date(),
        end: addHours(new Date(), 2),

    });

    const titleClass = useMemo(() => {
        if (!isFormSubmitted) return '';
        return (formValues.title.length > 0)
            ? 'is-valid'
            : 'is-invalid';

    }, [formValues.title, isFormSubmitted])

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    };

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event,

        })
    }

    const onCloseModal = () => {
        // console.log('Cerrando modal');
        closeDateModal();
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setIsFormSubmitted(true);

        if (formValues.title.length === 0) {
            Swal.fire('Título inválido', 'Por favor, ingrese un título válido')
        }

        const difference = differenceInSeconds(formValues.end, formValues.start);
        if (isNaN(difference) || difference <= 1) {
            Swal.fire('Fechas inválidas', 'Por favor verifique las fechas seleccionadas');
            return;
        }


    }


    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >

            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label style={{ display: 'block' }}>Fecha y hora inicio</label>
                    <DatePicker
                        className="form-control"
                        selected={formValues.start}
                        onChange={(event) => onDateChanged(event, 'start')}
                        dateFormat="dd/MM/yyyy h:mm aa"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2">
                    <label style={{ display: 'block' }}>Fecha y hora fin</label>
                    <DatePicker
                        className="form-control"
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={(event) => onDateChanged(event, 'end')}
                        dateFormat="dd/MM/yyyy h:mm aa"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChanged}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChanged}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
