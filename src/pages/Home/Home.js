import { getIsLoggedIn, getUserName } from '../../redux/auth/authSelector';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Container, Badge } from 'react-bootstrap';
import style from './Home.module.css';

const Home = () => {
  const isUserLoggedIn = useSelector(getIsLoggedIn);
  const userName = useSelector(getUserName);

  return isUserLoggedIn ? (
    <Container className={style.homeContainer}>
      <h1 className={style.homeTitle}>Welcome to PhoneBook, {userName}!</h1>
      <h2 className={style.homeText}>
        To create your contact, click{' '}
        <Badge bg="secondary">
          {' '}
          <Link to="contacts" className={style.homeLink}>
            here
          </Link>
        </Badge>
      </h2>
    </Container>
  ) : (
    <Container className={style.homeContainer}>
      <h1 className={style.homeTitle}>Welcome to PhoneBook!</h1>
      <h2 className={style.homeText}>
        It's your first time?{' '}
        <Badge bg="secondary">
          <Link to="register" className={style.homeLink}>
            Sign Up
          </Link>
        </Badge>
      </h2>

      <h2 className={style.homeText}>
        Already have account?{' '}
        <Badge bg="secondary">
          <Link to="login" className={style.homeLink}>
            Sign in
          </Link>
        </Badge>
      </h2>
    </Container>
  );
};

export default Home;