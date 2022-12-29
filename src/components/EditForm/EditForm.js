import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import {
  useEditContactMutation,
  useGetContactQuery,
} from '../../redux/contacts/contactsApi.js';

import Loader from 'components/Loader/Loader.js';
import style from './EditForm.module.css';

const EditForm = ({ id }) => {
  const [show, setShow] = useState(true);
  const { data: contacts } = useGetContactQuery();
  const { name, number } = contacts.find(item => item.id === id);

  const [editName, setEditName] = useState(name);
  const [editNumber, setEditNumber] = useState(number);

  const [editContact, { isLoading }] = useEditContactMutation();
  const contactID = id;
  const handleInputChange = event => {
    const { name, value } = event.currentTarget;
    if (name === 'name') {
      setEditName(value);
    }
    if (name === 'number') {
      setEditNumber(value);
    }
  };
  const handleEditContact = async event => {
    event.preventDefault();
    try {
      await editContact({ id: contactID, name: editName, number: editNumber });
      setShow(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClose = () => setShow(false);

  return (
    { name, number } && (
      <Modal show={show} onHide={handleClose} className={style.modal}>
        <Modal.Header closeButton className={style.modalHeader}>
          <Modal.Title>Edit contact</Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.modalBody}>
          <Form onSubmit={handleEditContact}>
            <Form.Group className={style.modalInput}>
              <Form.Control
                name="name"
                value={editName}
                onChange={handleInputChange}
              />
              <Form.Control
                name="number"
                value={editNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className={style.modalFooter}>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="light" onClick={handleEditContact}>
            Save Changes
          </Button>
        </Modal.Footer>
        {isLoading && <Loader />}
      </Modal>
    )
  );
};

EditForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default EditForm;