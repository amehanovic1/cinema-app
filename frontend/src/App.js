import './App.css';
import Footer from './layouts/Footer/Footer';
import Header from './layouts/Header/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import Tickets from './pages/Tickets/Tickets';
import ScrollToTop from './layouts/ScrollToTop/ScrollToTop';

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
