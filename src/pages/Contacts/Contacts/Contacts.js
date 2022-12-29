import ContactList from '../ContactList/index';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import style from './Contacts.module.css';

const Contacts = () => {
  return (
    <Container className={style.contactPage}>
      <div className={style.contacts}>
        <ContactForm />
        <Filter />
      </div>

      <div className={style.contacts}>
        <ContactList />
      </div>
      <Outlet />
    </Container>
  );
};

export default Contacts;