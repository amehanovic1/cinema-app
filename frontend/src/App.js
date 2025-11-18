import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import Tickets from './pages/Tickets/Tickets';
import { ROUTES } from './routes/routes';
import Layout from './layouts/Layout/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
        <Route path={ROUTES.TICKETS} element={<Tickets />} />
      </Routes>
    </Layout>
  );
}

export default App;
