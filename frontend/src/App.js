import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Tickets from './pages/Tickets';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/tickets' element={<Tickets />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
