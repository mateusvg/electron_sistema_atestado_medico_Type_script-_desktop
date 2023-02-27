import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from 'react-router-dom';
import Home from './pages/Home'
import SideNavBar from './components/SideNavBar'

export default function App() {
  return (
    <BrowserRouter>
      <SideNavBar />
    </BrowserRouter>
  );
}

