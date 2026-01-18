import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import Tickets from './pages/Tickets/Tickets';
import { ROUTES } from './routes/routes';
import Layout from './layouts/Layout/Layout';
import CurrentlyShowing from './pages/CurrentlyShowing/CurrentlyShowing';
import UpcomingMovies from './pages/UpcomingMovies/UpcomingMovies';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import BookingLayout from './pages/BookingLayout/BookingLayout';

function App() {
  const { user, isLoading } = useContext(AuthContext)

  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
        <Route path={ROUTES.TICKETS} element={<Tickets />} />
        <Route path={ROUTES.CURRENTLY_SHOWING} element={<CurrentlyShowing />} />
        <Route path={ROUTES.UPCOMING_MOVIES} element={<UpcomingMovies />} />
        <Route path={ROUTES.MOVIE_DETAILS} element={<MovieDetails />} />
        <Route
          path={ROUTES.MOVIE_TICKET_BOOKING}
          element={
            <ProtectedRoute isAuthenticated={user} isLoading={isLoading}>
              <BookingLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
