import {
  BrowserRouter,
} from 'react-router-dom';

import SideNavBar from './components/SideNavBar'
import LoginPage from '../src/pages/Login'

import { useState } from 'react';
import { Login } from "./contexts/Login";

export default function App() {
  const [login, setLogin] = useState(false);
  return (
    <BrowserRouter>
      <Login.Provider value={{ login, setLogin }}>

        {login ? <SideNavBar /> : <LoginPage />}
      </Login.Provider>

    </BrowserRouter>
  );
}

