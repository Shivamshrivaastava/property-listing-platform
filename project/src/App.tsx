import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage.jsx';
import PropertyDetailsPage from './pages/PropertyDetailsPage.jsx';
import FavoritesPage from './pages/FavoritesPage';
import ContactPage from './pages/ContactPage';
import { FavoritesProvider } from './context/FavoritesContext';
import './styles/tailwind.css';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/property/:id" element={<PropertyDetailsPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;