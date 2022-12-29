import { Suspense } from 'react';

import { useSelector } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';
import {
  useGetContactQuery,
  useDeleteContactMutation,
} from 'redux/contacts/contactsApi.js';
import EditForm from 'components/EditForm/EditForm.js';
import { useState } from 'react';
import { AiFillEdit, AiFillDelete, AiOutlineUser } from 'react-icons/ai';
import { getFilter } from 'redux/contacts/contactsSelector';
import style from './ContactList.module.css';
import Loader from 'components/Loader';

const ContactList = () => {
  const [modalId, setModalId] = useState('');
  const [show, setShow] = useState(false);
  const searchFilter = useSelector(getFilter);
  const { data } = useGetContactQuery();
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  const getVisibleContacts = () => {
    if (searchFilter !== '') {
      return data.filter(({ name }) =>
        name.toLowerCase().includes(searchFilter)
      );
    }
    return data;
  };

  const visibleContacts = getVisibleContacts();

  const handleDeleteClick = id => {
    deleteContact(id);
  };

  const handleEditClick = id => {
    setModalId(id);
    setShow(true);
  };

  return (
    <Suspense fallback={<Loader />}>
      <ListGroup className={style.contactList}>
        {visibleContacts &&
          visibleContacts.map(({ id, name, number }) => {
            return (
              <ListGroup.Item key={id} className={style.contactItem}>
                <AiOutlineUser />
                <p>{name}</p>
                <p>{number}</p>
                <div className={style.btnWrapper}>
                  <Button
                    type="button"
                    onClick={() => handleEditClick(id)}
                    variant="outline-light"
                  >
                    <AiFillEdit />
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleDeleteClick(id)}
                    variant="outline-light"
                  >
                    <AiFillDelete />
                    {isLoading && <Loader />}
                  </Button>
                </div>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
      {show && <EditForm id={modalId} />}
    </Suspense>
  );
};

export default ContactList;