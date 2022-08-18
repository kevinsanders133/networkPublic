import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios, { AxiosResponse } from 'axios';
import { useAppDispatch } from './redux/hooks';
import { setUserInfo } from './redux/slices/userInfoSlice';
import IUserInfo from './models/IUserInfo';
import Header from './components/App/Header/Header';
import LoggedIn from './components/App/LoggedIn';
import Login from './pages/LoginRegistration/Login';
import Registration from './pages/LoginRegistration/Registration';
import RequireAuth from './components/App/RequireAuth';
import RequireLogOut from './components/App/RequireLogOut';
import './App.sass';
import './pages/LoginRegistration/LoginRegistration.sass';
import { setSignedIn } from './redux/slices/signedInSlice';

axios.defaults.withCredentials = true;

const App: React.FC = () => {

  const dispatch = useAppDispatch();

  const authorize = async () => {
    const axiosRes: AxiosResponse = await axios.post('http://localhost:5005/isAuth');
    const res: IUserInfo = axiosRes.data;
    if (res) {
      dispatch(setUserInfo(res));
      dispatch(setSignedIn(true));
    }
  };

  useEffect(() => {
    authorize();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/*"
            element={
              <RequireAuth>
                <LoggedIn />
              </RequireAuth>
            }
          />
          <Route
            path="/login"
            element={
              <RequireLogOut>
                <Login authorize={authorize}/>
              </RequireLogOut>
            }
          />
          <Route
            path="/registration"
            element={
              <RequireLogOut>
                <Registration />
              </RequireLogOut>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
