import { BsPersonCircle } from 'react-icons/bs';
import { getUserEmail } from '../../redux/auth/authSelector';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/authOperations';
import { Button } from 'react-bootstrap';
import style from './UserMenu.module.css';

const UserMenu = () => {
  const userEmail = useSelector(getUserEmail);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <div className={style.userMenu}>
      <BsPersonCircle />
      {userEmail}
      <Button variant="outline-secondary" type="button" onClick={handleLogOut}>
        LogOut
      </Button>
    </div>
  );
};

export default UserMenu;