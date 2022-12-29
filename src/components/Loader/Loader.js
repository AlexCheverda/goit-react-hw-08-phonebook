import { Spinner } from 'react-bootstrap';
import style from './Loader.module.css';

const Loader = () => {
  return (
    <div className={style.loaderWrap}>
      <div className={style.loader}>
        <Spinner animation="border" variant="secondary" />
      </div>
    </div>
  );
};

export default Loader;