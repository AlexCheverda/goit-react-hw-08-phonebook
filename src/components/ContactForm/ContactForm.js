import Notiflix from "notiflix";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import {
  useGetContactQuery,
  useAddContactMutation,
} from '../../redux/contacts/contactsApi';
import style from './ContactForm.module.css';
// import { nanoid } from "nanoid";
// import { Form, Input, Label, FormBtn } from './ContactForm.Styled';

const ContactForm = () => {
  const { data } = useGetContactQuery();
  const [addContact] = useAddContactMutation();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  // const nameInputId = nanoid();
  // const numberInputId = nanoid();

  const handleInputChange = evt => {
    const { name, value } = evt.currentTarget;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'number') {
      setNumber(value);
    }
  };

  const handleAddContact = async evt => {
    evt.preventDefault();
    try {
      data.find(contact => contact.name === name)
        ? Notiflix.Notify.info(`${name} is already in contacts.`)
        : (await addContact({ name, number })) &&
        Notiflix.Notify.success(`${name} added to your phonebook`);
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <div>
      <Form onSubmit={handleAddContact} className={style.addContactForm}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <FloatingLabel controlId="formBasicName" label="Type Name">
            <Form.Control
              type="text"
              name="name"
              value={name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicNumber">
          <FloatingLabel controlId="formBasicNumber" label="Type Number">
            <Form.Control
              type="tel"
              name="number"
              value={number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="outline-light" type="submit">
            Add Contact
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ContactForm;