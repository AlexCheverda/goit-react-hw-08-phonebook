import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { getIsLoggedIn } from '../../redux/auth/authSelector';
import { useSelector } from 'react-redux';
import UserMenu from 'components/UserMenu';
import style from './NavyBar.module.css';

const NavyBar = () => {
  const isUserLoggedIn = useSelector(getIsLoggedIn);

  return (
    <Navbar collapseOnSelect className={style.navBar}>
      <Container>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Navbar.Brand>
            <Nav.Link as="div">
              <NavLink to="/" className={style.navLink}>
                PhoneBook
              </NavLink>
            </Nav.Link>
          </Navbar.Brand>

          <Nav as="ul" className={style.nav}>
            {isUserLoggedIn && (
              <div className={style.wrapper}>
                <Nav.Link as="li">
                  <NavLink to="contacts" className={style.navLink}>
                    Contacts
                  </NavLink>
                </Nav.Link>
                <Nav.Link as="li">
                  <UserMenu />
                </Nav.Link>
              </div>
            )}
            {!isUserLoggedIn && (
              <div className={style.wrapper}>
                <Nav.Link as="li">
                  <NavLink to="register" className={style.navLink}>
                    Registration
                  </NavLink>
                </Nav.Link>
                <Nav.Link as="li">
                  <NavLink to="login" className={style.navLink}>
                    Log in
                  </NavLink>
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavyBar;