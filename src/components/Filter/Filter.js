import { useDispatch, useSelector } from 'react-redux';
import { filterContact } from 'redux/filter/filterActions';
// import PropTypes from 'prop-types';
// import { FilterBox, Label, Input } from './Filter.Styled';
import { Form, FloatingLabel } from 'react-bootstrap';
import { getFilter } from 'redux/contacts/contactsSelector';
import style from './Filter.module.css';

const Filter = () => {
    const filter = useSelector(getFilter);
    const dispatch = useDispatch();
    const changeFilter = evt => {
        dispatch(filterContact(evt.currentTarget.value));
    };
    return (
        <Form className={style.filter}>
            <Form.Group controlId="ControlInputFilter">
                <FloatingLabel
                    controlId="ControlInputFilter"
                    label="Find contact by name"
                >
                    <Form.Control
                        type="text"
                        name="filter"
                        value={filter}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        onChange={changeFilter}
                        className={style.filterInput}
                    />
                </FloatingLabel>
            </Form.Group>
        </Form>
    );
};

export default Filter;