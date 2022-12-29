import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import NavyBar from 'components/NavyBar';
import style from './SharedLayout.module.css';
import Loader from 'components/Loader';

const SharedLayout = () => {
  return (
    <div className={style.mainContainer}>
      <header>
        <NavyBar />
      </header>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default SharedLayout;