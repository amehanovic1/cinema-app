import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import Tickets from './pages/Tickets/Tickets';
import { ROUTES } from './routes/routes';
import Layout from './layouts/Layout/Layout';
import CurrentlyShowing from './pages/CurrentlyShowing/CurrentlyShowing';
import UpcomingMovies from './pages/UpcomingMovies/UpcomingMovies';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
          <Route path={ROUTES.TICKETS} element={<Tickets />} />
          <Route path={ROUTES.CURRENTLY_SHOWING} element={<CurrentlyShowing />} />
          <Route path={ROUTES.UPCOMING_MOVIES} element={<UpcomingMovies />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
