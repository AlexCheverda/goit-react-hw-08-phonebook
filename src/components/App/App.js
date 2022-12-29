// import ContactForm from 'components/ContactForm';
// import Filter from 'components/Filter';
// import ContactList from 'components/ContactList';
// import { Title, SectionName, Container } from './App.Styled';

import { Route, Routes } from "react-router-dom";
import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/auth/authOperations";
import { getIsGettingCurrentUser } from "../../redux/auth/authSelector";
import style from './App.module.css';
import Loader from 'components/Loader';
import PublicRoute from "../PublicRoute";
import PrivateRoute from "../PrivateRoute";
import SharedLayout from 'components/SharedLayout';

const Home = lazy(() => import('pages/Home'));
const RegisterForm = lazy(() => import('pages/Registration/RegisterForm'));
const LogInForm = lazy(() => import('pages/LogIn/LogInForm'));
const Contacts = lazy(() => import('pages/Contacts/Contacts/index'));

const App = () => {
  const refreshing = useSelector(getIsGettingCurrentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <div className={style.container}>
      {!refreshing && (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route
                index
                element={
                  <PublicRoute>
                    <Home />
                </PublicRoute>
              }
              />
              <Route
                path="contacts"
                element={
                  <PrivateRoute>
                    <Contacts />
                </PrivateRoute>
              }
              />
              <Route
                path="register"
                element={
                  <PublicRoute restricted>
                    <RegisterForm />
                </PublicRoute>
              }
              />
              <Route
                path="login"
                element={
                  <PublicRoute restricted>
                    <LogInForm />
                </PublicRoute>
              }
              />
              <Route
                path="*"
                element={<Home />}
              />
            </Route>
          </Routes>
        </Suspense>
      )}
    </div>
  );
};

export default App;